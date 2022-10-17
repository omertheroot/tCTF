const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const crypto = require("crypto");
var xss = require("xss");

router.post("/api/challange/get", (req, res) => {
  if (!req.session.user) {
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
  if (req.session.user.teamId == null) {
    res.status(200).json({ message: "User not in a team" });
    return;
  }
  var { challangeId } = req.body;
  db.knex
    .select("*")
    .from("challanges")
    .where({ challangeId: challangeId })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data[0]);
        return;
      } else {
        res.status(200).json({ message: "Challange not found" });
        return;
      }
    });
});

router.post("/api/challange/create", (req, res) => {
  if (!req.session.user) {
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
  var { name, body, points, flag, category } = req.body;

  db.knex("users")
    .where({ id: req.session.user.id })
    .then((data) => {
      if (data[0].isAdmin != 1) {
        res.status(200).json({ message: "User is not an admin" });
        return;
      } else {
        db.knex("challanges")
          .insert({
            id: uuidv4(),
            name: name,
            body: body,
            points: points,
            flag: flag,
            category: category,
          })
          .then((data) => {
            res.status(200).json({ message: "Challange created" });
            return;
          });
      }
    });
});

module.exports = router;
