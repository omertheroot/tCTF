const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const crypto = require("crypto");
var xss = require("xss");

router.get("/admin", (req, res) => {
  if (req.session.user && req.session.user.isAdmin == 1) {
    db.knex("users").then((data) => {
      db.knex("teams").then((data2) => {
        db.knex("challenges").then((data3) => {
          var admindata = {
            ...req.session.user,
            ...{ users: data },
            ...{ teams: data2 },
            ...{ challanges: data3 },
          };
          res.render("pages/admin", admindata);
        });
      });
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/admin/teams/:id", (req, res) => {
  if (req.session.user && req.session.user.isAdmin == 1) {
    db.knex("users")
      .where({ teamId: req.params.id })
      .then((data) => {
        db.knex("teams")
          .where({ id: req.params.id })
          .then((data2) => {
            var admindata = {
              ...req.session.user,
              ...{ users: data },
              ...{ team: data2[0] },
            };
            console.log(admindata);
            res.render("pages/admin-team", admindata);
          });
      });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
