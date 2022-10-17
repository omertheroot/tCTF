const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const crypto = require("crypto");
var xss = require("xss");

router.post("/api/team/create", (req, res) => {
  var { name, description, password } = req.body;
  if (!req.session.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  db.knex("users")
    .where({ id: req.session.user.id })
    .then((data) => {
      if (data[0].teamId) {
        res.status(200).json({ message: "User already in a team" });
        return;
      }
    });
  if (
    name.includes("/") ||
    name.includes("\\") ||
    name.includes(":") ||
    name.includes("*") ||
    name.includes("?") ||
    name.includes('"') ||
    name.includes("<") ||
    name.includes(">") ||
    name.includes("|") ||
    name.includes(".") ||
    name.length > 20
  ) {
    res.status(200).json({ message: "Invalid name" });
    return;
  } else if (description.length > 1000) {
    res.status(200).json({ message: "Invalid description" });
    return;
  }

  name = xss(name);
  description = xss(description);

  if (!name || !password) {
    res.status(200).json({ message: "Required fields" });
    return;
  }
  if (password.length < 8) {
    res.status(200).json({ message: "Invalid password" });
    return;
  }
  password = crypto.createHash("sha512").update(password).digest("hex");
  db.knex
    .select("*")
    .from("teams")
    .where({ name: name })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({ message: "Team name already exists" });
        return;
      } else {
        const id = uuidv4();
        db.knex("teams")
          .insert({
            id: id,
            name: name,
            description: description,
            captainId: req.session.user.id,
            password: password,
            captain: req.session.user.username,
          })
          .then(() => {
            db.knex("users")
              .where({ id: req.session.user.id })
              .update({ teamId: id, teamName: name, teamCaptain: true })
              .then(() => {
                req.session.user.teamId = id;
                req.session.user.teamName = name;
                req.session.user.teamCaptain = true;
                res.status(200).json({ message: "ok" });
                return;
              });
          });
      }
    });
});

router.post("/api/team/join", (req, res) => {
  var { name, password } = req.body;
  if (!req.session.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  db.knex("users")
    .where({ id: req.session.user.id })
    .then((data) => {
      if (data[0].teamId) {
        res.status(200).json({ message: "User already in a team" });
        return;
      }
    });

  if (!name || !password) {
    res.status(200).json({ message: "Required fields" });
    return;
  }
  password = crypto.createHash("sha512").update(password).digest("hex");
  db.knex
    .select("*")
    .from("teams")
    .where({ name: name })
    .andWhere({ password: password })
    .then((data) => {
      if (data.length > 0) {
        db.knex
          .select("teamId")
          .from("users")
          .where({ teamId: data[0].id })
          .then((data) => {
            if (data.length >= 4) {
              res.status(200).json({ message: "Team is full" });
              return;
            }
          });
        db.knex("users")
          .where({ id: req.session.user.id })
          .update({ teamId: data[0].id, teamName: data[0].name })
          .then(() => {
            req.session.user.teamId = data[0].id;
            req.session.user.teamName = data[0].name;
            req.session.user.teamCaptain = false;
            res.status(200).json({ message: "ok" });
            return;
          });
      } else {
        res.status(200).json({ message: "Team does not exist" });
        return;
      }
    });
});

router.post("/api/team/kick", (req, res) => {
  var { username } = req.body;
  console.log(req.body);
  if (!req.session.user) {
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
  if (!req.session.user.teamCaptain) {
    res.status(200).json({ message: "Not team captain" });
    return;
  }
  if (!username) {
    res.status(200).json({ message: "Required fields" });
    return;
  }
  db.knex
    .select("*")
    .from("users")
    .where({ username: username })
    .then((data) => {
      if (data.length > 0) {
        if (data[0].teamId != req.session.user.teamId) {
          res.status(200).json({ message: "User not in your team" });
          return;
        } else {
          db.knex("users")
            .where({ username: username })
            .update({ teamId: null, teamName: null, teamCaptain: false })
            .then(() => {
              res.status(200).json({ message: "ok" });
              return;
            });
        }
      } else {
        res.status(200).json({ message: "User does not exist" });
        return;
      }
    });
});

router.post("/api/team/leave", (req, res) => {
  if (!req.session.user) {
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
  if (!req.session.user.teamId) {
    res.status(200).json({ message: "Not in a team" });
    return;
  }
  if (req.session.user.teamCaptain == true) {
    console.log("captain");
  }
  if (req.session.user.teamCaptain == true) {
    db.knex("users")
      .where({ teamId: req.session.user.teamId })
      .update({ teamId: null, teamName: null, teamCaptain: false })
      .then(() => {
        db.knex("teams")
          .where({ id: req.session.user.teamId })
          .del()
          .then(() => {
            var temp = req.session.user.teamId;
            req.session.user.teamId = null;
            req.session.user.teamName = null;
            req.session.user.teamCaptain = false;
            if (req.session.user.teamCaptain) {
              req.session.user.teamCaptain = false;
            }
            db.knex("users")
              .where({ teamId: temp })
              .then((data) => {
                if (data.length == 0) {
                  db.knex("teams").where({ id: temp }).del();
                }
              });
            res.status(200).json({ message: "Team deleted" });
            return;
          });
      });
  } else {
    db.knex("users")
      .where({ id: req.session.user.id })
      .update({ teamId: null, teamName: null, teamCaptain: false })
      .then(() => {
        req.session.user.teamId = null;
        req.session.user.teamName = null;
        req.session.user.teamCaptain = false;
        res.status(200).json({ message: "Leaved from the team" });
        return;
      });
  }
});

router.post("/api/team/changePassword", (req, res) => {
  var { oldpassword, password } = req.body;
  if (!req.session.user) {
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
  if (!req.session.user.teamCaptain) {
    res.status(200).json({ message: "Not team captain" });
    return;
  }
  if (!password || !oldpassword) {
    res.status(200).json({ message: "Required fields" });
    return;
  }
  if (password.length < 8) {
    res.status(200).json({ message: "Password too short" });
    return;
  }
  if (password == oldpassword) {
    res.status(200).json({ message: "New password is the same as old one" });
    return;
  }
  password = crypto.createHash("sha512").update(password).digest("hex");
  oldpassword = crypto.createHash("sha512").update(oldpassword).digest("hex");
  db.knex
    .select("*")
    .from("teams")
    .where({ id: req.session.user.teamId })
    .andWhere({ password: oldpassword })
    .then((data) => {
      if (data.length > 0) {
        db.knex("teams")
          .where({ id: req.session.user.teamId })
          .update({ password: password })
          .then(() => {
            res.status(200).json({ message: "ok" });
            return;
          });
      } else {
        res.status(200).json({ message: "Wrong password" });
        return;
      }
    });
});

module.exports = router;
