const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const crypto = require("crypto");
var xss = require("xss");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

router.post("/api/user/login", (req, res) => {
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

router.post("/api/user/register", (req, res) => {
  if (req.session.user) {
    res
      .status(200)
      .json({ message: "Already logged in", user: req.session.user });
    return;
  }
  var { username, mail, password, name } = req.body;
  username = xss(username);
  mail = xss(mail);
  password = xss(password);
  name = xss(name);

  if (!username || !mail || !password) {
    res.status(200).json({ message: "Required fields" });
    return;
  } else if (password.length < 8) {
    res.status(200).json({ message: "Invalid password" });
    return;
  } else if (!emailRegexp.test(mail)) {
    res.status(200).json({ message: "Invalid email" });
    return;
  }
  password = crypto.createHash("sha512").update(password).digest("hex");
  db.knex
    .select("*")
    .from("users")
    .where({ mail: mail })
    .orWhere({ username: username })
    .then((data) => {
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
          })
          .then(() => {
            db.knex("users")
              .where({ mail: mail })
              .then((data) => {
                req.session.user = data[0];

                res.status(200).json({ message: "ok" });
                return;
              });
          });
      }
    });
});

router.get("/api/user/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "ok" });
});

router.post("/test", (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.status(200).json({ user: req.session.user });
});

module.exports = router;
