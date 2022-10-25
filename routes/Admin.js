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
            ...{ user: req.session.user },
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
              ...{ user: req.session.user },
              ...{ users: data },
              ...{ team: data2[0] },
            };
            res.render("pages/admin-team", admindata);
          });
      });
  } else {
    res.redirect("/login");
  }
});

router.get("/admin/users/:id", (req, res) => {
  if (req.session.user && req.session.user.isAdmin == 1) {
    db.knex("users")
      .where({ id: req.params.id })
      .then((data) => {
        if (data.length > 0) {
          res.render("pages/profile", { user: req.session.user ,profileuser: JSON.parse(JSON.stringify(data))[0]});
        }
        else{
          res.render("pages/404");
        }
      });
  } else {
    res.redirect("/login");
  }
});

router.get("/admin/challenges/create", (req, res) => {
  if (req.session.user && req.session.user.isAdmin == 1) {
    db.knex("challenges").then((data) => {
      var admindata = {
        ...{ user: req.session.user },
        ...{ challanges: data },
      };

      res.render("pages/create-challenge", admindata);
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/admin/statics", (req, res) => {
  if (req.session.user && req.session.user.isAdmin == 1) {
    db.knex("users").then((data) => {
      db.knex("teams").then((data2) => {
        db.knex("challenges").then((data3) => {
          var admindata = {
            ...{ user: req.session.user },
            ...{ users: data },
            ...{ teams: data2 },
            ...{ challanges: data3 },
          };
          res.render("pages/admin-statics", admindata);
        });
      });
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/api/challenge/create", (req, res) => {
  if (req.session.user && req.session.user.isAdmin == 1) {
    if (
      req.body.qname &&
      req.body.qbody &&
      req.body.qvalue &&
      req.body.qflag &&
      req.body.qcategory &&
      req.body.qhidden
    ) {
      var challenge = {
        id: uuidv4(),
        name: xss(req.body.qname),
        body: req.body.qbody,
        points: req.body.qvalue,
        flag: req.body.qflag,
        category: req.body.qcategory,
        hidden: req.body.qhidden,
        author: req.session.user.username,
      };
      db.knex("challenges")
        .where({
          name: challenge.name,
        })
        .then((data) => {
          if (data.length > 0) {
            res.status(200).json({ message: "Challenge already exists" });
            return;
          } else {
            db.knex("challenges")
              .insert(challenge)
              .then((data) => {
                res.json({ message: "ok" });
                return;
              });
          }
        });
    } else {
      res.json({ message: "error" });
      return;
    }
  } else {
    res.redirect("/login");
  }
});

router.post("/api/admin/verifyuser", (req, res) => {
  var {userID, verify} = req.body;

  if (req.session.user && req.session.user.isAdmin == 1) {
    db.knex
      .select("*")
      .from("users")
      .where({ id: userID })
      .then((data) => {
        if (data.length > 0) {
          db.knex("users")
            .where({ id: userID })
            .update({ isVerified: verify })
            .then(() => {
              res.status(200).json({ message: "ok" });
              return;
            });
        } else {
          res.status(200).json({ message: "No user" });
          return;
        }
      });
  }
  else{
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
});

router.post("/api/admin/verifyteam", (req, res) => {
  var {teamID, verify} = req.body;

  if (req.session.user && req.session.user.isAdmin == 1) {
    db.knex
      .select("*")
      .from("teams")
      .where({ id: teamID })
      .then((data) => {
        if (data.length > 0) {
          db.knex("teams")
            .where({ id: teamID })
            .update({ isVerified: verify })
            .then(() => {
              res.status(200).json({ message: "ok" });
              return;
            });
        } else {
          res.status(200).json({ message: "No team" });
          return;
        }
      });
  }
  else {
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
});

router.post("/api/admin/deleteuser", (req, res) => {
  var {userID} = req.body;

  if (req.session.user && req.session.user.isAdmin == 1) {
    db.knex
      .select("*")
      .from("users")
      .where({ id: userID })
      .then((data) => {
        if (data.length > 0) {
          db.knex("users")
            .where({ id: userID })
            .del()
            .then(() => {
              res.status(200).json({ message: "ok" });
              return;
            });
        } else {
          res.status(200).json({ message: "No user" });
          return;
        }
      });
  }
  else {
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
});

router.post("/api/admin/changeadmin", (req, res) => {
  var {userID, admin} = req.body;

  if (req.session.user && req.session.user.isAdmin == 1) {
    db.knex
      .select("*")
      .from("users")
      .where({ id: userID })
      .then((data) => {
        if (data.length > 0) {
          db.knex("users")
            .where({ id: userID })
            .update({ isAdmin: admin })
            .then(() => {
              res.status(200).json({ message: "ok" });
              return;
            });
        } else {
          res.status(200).json({ message: "No user" });
          return;
        }
      });
  }
  else {
    res.status(200).json({ message: "Unauthorized" });
    return;
  }
});

module.exports = router;
