const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const crypto = require("crypto");
var xss = require("xss");
var AWS = require("aws-sdk");
const { sendMail } = require("../mailer");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-central-1",
});
const s3 = new AWS.S3();

var usernameRegex = /^[a-zA-Z0-9]+$/;

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

router.post("/api/user/login", (req, res) => {
  db.knex("config")
    .select("data")
    .where({ type: "paused" })
    .then((data) => {
      if (data[0].data == "1") {
        res.status(403).send({ message: "Paused" });
        return;
      }

      if (req.session.user) {
        res.status(200).json({ message: "Already logged in" });
        return;
      }
      var { mail, password } = req.body;
      mail = xss(mail);
      password = xss(password);
      if (!mail || !password) {
        res.status(200).json({ message: "Required fields" });
        return;
      }
      password = crypto.createHash("sha512").update(password).digest("hex");
      db.knex
        .select("*")
        .from("users")
        .where({ mail: mail })
        .orWhere({ username: mail })
        .andWhere({ password: password })
        .then((data) => {
          if (data.length > 0) {
            req.session.user = data[0];
            res.status(200).json({ message: "ok" });
            return;
          } else {
            res.status(200).json({ message: "Invalid credentials" });
            return;
          }
        });
    });
});

router.post("/api/user/register", (req, res) => {
  console.log("1");
  if (req.session.user) {
    res.status(200).json({ message: "Already logged in" });
    return;
  }
  var { username, mail, password, name, level, okul } = req.body;
  username = xss(username);
  mail = xss(mail);
  password = xss(password);
  name = xss(name);
  okul = xss(okul);
  if (level == "ortaokul" || level == "lise") {
    level = xss(level);
  } else {
    res.status(200).json({ message: "Invalid level" });
    return;
  }
  if (!username || !mail || !password || !name || !okul) {
    res.status(200).json({ message: "Required fields" });
    return;
  }
  if (okul.length > 200) {
    res.status(200).json({ message: "Invalid school name" });
    return;
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(200).json({ message: "Required fields" });
    return;
  } else if (password.length < 8) {
    res.status(200).json({ message: "Invalid password" });
    return;
  } else if (!emailRegexp.test(mail)) {
    res.status(200).json({ message: "Invalid email" });
    return;
  } else if (!usernameRegex.test(username)) {
    res.status(200).json({ message: "Invalid username" });
    return;
  }
  if (req.files.ogrbelgesi.size > 5 * 1024 * 1024) {
    res.status(200).json({ message: "Invalid file" });
    return;
  }
  const ext = req.files.ogrbelgesi.name
    .split(".")
    .filter(Boolean)
    .slice(1)
    .join(".");
  const fileId = crypto.createHash("sha512").update(uuidv4()).digest("hex");
  if (
    req.files.ogrbelgesi.mimetype == "application/pdf" ||
    req.files.ogrbelgesi.mimetype == "image/png" ||
    req.files.ogrbelgesi.mimetype == "image/jpeg" ||
    req.files.ogrbelgesi.mimetype == "image/jpg" ||
    ext == "pdf" ||
    ext == "png" ||
    ext == "jpg" ||
    ext == "jpeg" ||
    ext == "PNG" ||
    ext == "JPG" ||
    ext == "JPEG" ||
    ext == "PDF"
  ) {
    const file = Buffer.from(req.files.ogrbelgesi.data, "binary");
    const path = "ogrbelgeleri/" + fileId + "." + ext;
    const params = {
      Bucket: "ctf-bucket-timtal",
      Key: path,
      Body: file,
    };

    s3.upload(params, function (err, data) {
      if (err) {
        res.status(200).json({ message: "error" });
        return;
      }
    });
  } else {
    res.status(200).json({ message: "Invalid file" });
    return;
  }
  console.log("2");
  password = crypto.createHash("sha512").update(password).digest("hex");
  db.knex
    .select("*")
    .from("users")
    .where({ mail: mail })
    .orWhere({ username: username })
    .then((data) => {
      console.log("3");
      if (data.length > 0) {
        res.status(200).json({ message: "User already exists" });
        return;
      } else {
        db.knex("users")
          .insert({
            username: username,
            mail: mail,
            password: password,
            name: name,
            teamId: null,
            teamName: null,
            teamCaptain: false,
            seviye: level,
            ogrbelgesi: fileId + "." + ext,
            isMailVerified: false,
            okul: okul,
          })
          .then(() => {
            var code = crypto.randomBytes(20).toString("hex");
            var link = "https://timtalctf.com/verify/" + code + "/" + username;
            sendMail(mail, "Kayıt Onayı", link);
            db.knex("mail_verifications")
              .insert({
                user: username,
                mail: mail,
                code: code,
              })
              .then(() => {
                db.knex("users")
                  .where({ mail: mail })
                  .then((data) => {
                    db.knex("config")
                      .select("data")
                      .where({ type: "paused" })
                      .then((data) => {
                        if (data[0].data == "1") {
                          res.status(200).json({ message: "ok" });
                          return;
                        }
                        req.session.user = data[0];
                        res.status(200).json({ message: "ok" });
                        return;
                      });
                  });
              });
          });
      }
    });
});

router.get("/verify/:code/:username", (req, res) => {
  var code = req.params.code;
  var username = req.params.username;
  db.knex
    .select("*")
    .from("mail_verifications")
    .where({ code: code, user: username })
    .then((data) => {
      if (data.length > 0) {
        db.knex("users")
          .where({ username: username })
          .update({ isMailVerified: true })
          .then(() => {
            db.knex("mail_verifications")
              .where({ code: code, user: username })
              .del()
              .then(() => {
                res.render("pages/index", {
                  user: req.session.user,
                  message: "Mail adresiniz başarıyla doğrulandı!",
                });
                return;
              });
          });
      } else {
        res.render("pages/index", { user: req.session.user });
        return;
      }
    });
});

router.post("/api/user/editprofile", (req, res) => {
  if (!req.session.user) {
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
  var { username, mail, password } = req.body;
  username = xss(username);
  mail = xss(mail);

  if (!username || !mail) {
    res.status(200).json({ message: "Required fields" });
    return;
  }

  if (!emailRegexp.test(mail)) {
    res.status(200).json({ message: "Invalid email" });
    return;
  }

  if (password) {
    if (password.length < 8) {
      res.status(200).json({ message: "Invalid password" });
      return;
    }
    password = crypto.createHash("sha512").update(password).digest("hex");
    db.knex("users")
      .where({ id: req.session.user.id })
      .update({
        username: username,
        mail: mail,
        password: password,
      })
      .then(() => {
        res.status(200).json({ message: "ok" });
        return;
      });
  } else {
    db.knex("users")
      .where({ id: req.session.user.id })
      .update({
        username: username,
        mail: mail,
      })
      .then(() => {
        res.status(200).json({ message: "ok" });
        return;
      });
  }
});

router.get("/api/user/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "ok" });
});

module.exports = router;
