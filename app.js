const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");
const User = require("./routes/User");
const Team = require("./routes/Team");
const Admin = require("./routes/Admin");
const Challange = require("./routes/Challange");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const { json } = require("express");
var fileUpload = require("express-fileupload");
const config = require("./config");

const limiter = rateLimit({
  windowMs: 100 * 60 * 15,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "rate limit exceeded",
    message: "Adamım acelen nedir, biraz bekle bakalım şöyle :)",
  },
});
app.use(limiter);
app.use(fileUpload({ safeFileNames: /\\/g }));
require("dotenv").config();
app.use("/assets", express.static(__dirname + "/public"));

app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

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
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("pages/login");
  }
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
    res.render("pages/profile", {
      user: req.session.user,
      profileuser: req.session.user,
    });
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

app.get("/challenges", (req, res) => {
  if (req.session.user) {
    db.knex("users")
      .where({ id: req.session.user.id })
      .then((data) => {
        if (data[0].teamId) {
          if (!req.session.user) {
            res.status(200).json({ message: "Unauthorized" });
            return;
          }
          if (req.session.user.teamId == null) {
            res.status(200).json({ message: "User not in a team" });
            return;
          }
          db.knex
            .select("*")
            .from("challenges")
            .where({ hidden: 0 })
            .then((data) => {
              db.knex
                .select("*")
                .from("solves")
                .where({ teamId: req.session.user.teamId })
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
        } else {
          req.session.user.teamId = data[0].teamId;
          req.session.user.teamName = data[0].teamName;
          req.session.user.teamCaptain = data[0].teamCaptain;
          res.redirect("/team");
        }
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
          res.render("pages/profile", {
            user: req.session.user,
            profileuser: JSON.parse(JSON.stringify(data))[0],
          });
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
  //console.log(JSON.parse(config.readConfig()).sayfalar)
  sayfalar = JSON.parse(config.readConfig()).sayfalar
  //console.log(sayfalar)
  if (sayfalar.hasOwnProperty(req.params.page)) {
    //console.log(sayfalar)
    //console.log(req.params.page)
    //console.log(sayfalar[req.params.page])
    var page = cfg.sayfalar[req.params.page];
    res.render("pages/custom.ejs", { user: req.session.user, page: sayfalar[req.params.page] });
    return;
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

app.listen(port, () => {
  console.log("SERVER STARTED");
  console.log("node.js at http://127.0.0.1:" + port);
});
