const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const db = require("../db");
const crypto = require("crypto");
var xss = require("xss");

async function submissionLog(challengeId, teamId, flag, userId, status) {
  await db.knex("submissions").insert({
    challengeId: challengeId,
    teamId: teamId,
    flag: flag,
    userId: userId,
    status: status,
  });
}

router.post("/api/challenge/get/:id", (req, res) => {
  db.knex("config")
    .select("data")
    .where({ type: "paused" })
    .then((data) => {
      if (data[0].data == "1") {
        res.status(403).send({ message: "Paused" });
      }

      if (!req.session.user) {
        res.status(200).json({ message: "Unauthorized" });
        return;
      }
      // if (req.session.user.teamId == null) {
      //   res.status(200).json({ message: "User not in a team" });
      //   return;
      // }
      var challengeId = req.params.id;

      db.knex
        .select("*")
        .from("challenges")
        .where({ id: challengeId })
        .andWhere({ hidden: 0 })
        .andWhere({ seviye: req.session.user.seviye })
        .then((data) => {
          if (data.length > 0) {
            db.knex("solves")
              .where({ challengeId: challengeId })
              .andWhere({ userId: req.session.user.id })
              .then((solves) => {
                if (solves.length > 0) {
                  res.status(200).json({
                    id: data[0].id,
                    name: data[0].name,
                    body: data[0].body,
                    points: data[0].points,
                    category: data[0].category,
                    author: data[0].author,
                    solved: true,
                    type: data[0].type,
                    tA: data[0].tA,
                    tB: data[0].tB,
                    tC: data[0].tC,
                    tD: data[0].tD,
                  });
                  return;
                }

                res.status(200).json({
                  id: data[0].id,
                  name: data[0].name,
                  body: data[0].body,
                  points: data[0].points,
                  category: data[0].category,
                  author: data[0].author,
                  solved: false,
                  type: data[0].type,
                  tA: data[0].tA,
                  tB: data[0].tB,
                  tC: data[0].tC,
                  tD: data[0].tD,
                });
                return;
              });
          } else {
            res.status(200).json({ message: "challenge not found" });
            return;
          }
        });
    });
});

router.post("/api/challenge/get", (req, res) => {
  db.knex("config")
    .select("data")
    .where({ type: "paused" })
    .then((data) => {
      if (data[0].data == "1") {
        res.status(403).send({ message: "Paused" });
      }

      if (!req.session.user) {
        res.status(200).json({ message: "Unauthorized" });
        return;
      }
      // if (req.session.user.teamId == null) {
      //   res.status(200).json({ message: "User not in a team" });
      //   return;
      // }
      console.log(req.session.user.seviye);
      db.knex
        .select("*")
        .from("challenges")
        .where({ hidden: 0 })
        .andWhere({ seviye: req.session.user.seviye })
        .then((data) => {
          db.knex
            .select("*")
            .from("solves")
            .where({ teamId: req.session.user.teamId })
            .orWhere({ userId: req.session.user.id })
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
              var final = [];
              data.forEach((challenge) => {
                final.push({
                  id: challenge.id,
                  name: challenge.name,
                  points: challenge.points,
                  category: challenge.category,
                  solves: challenge.solves,
                  type: challenge.type,
                  points: challenge.points,
                  solved: challenge.solved,
                  author: challenge.author,
                  tA: challenge.tA,
                  tB: challenge.tB,
                  tC: challenge.tC,
                  tD: challenge.tD,
                  body: challenge.body,
                  seviye: challenge.seviye,
                });
              });
              res.status(200).json(final);
            });
        });
    });
});

router.post("/api/challenge/submit", (req, res) => {
  db.knex("config")
    .select("data")
    .where({ type: "paused" })
    .then((data) => {
      if (data[0].data == "1") {
        res.status(403).send({ message: "Paused" });
        return;
      }

      if (!req.session.user) {
        res.status(200).json({ message: "Unauthorized" });
        return;
      }
      // if (req.session.user.teamId == null) {
      //   res.status(200).json({ message: "User not in a team" });
      //   return;
      // }
      var { challengeId, name, flag } = req.body;
      if (!challengeId || !name || !flag) {
        res.status(200).json({
          message: "Required Fields",
          flag: flag,
          challengeId: challengeId,
          name: name,
        });
        return;
      }

      db.knex
        .select("*")
        .from("challenges")
        .where({ id: challengeId })
        .andWhere({ hidden: 0 })
        .andWhere({ name: name })
        .then((data) => {
          if (data.length > 0) {
            if (data[0].flag == flag) {
              db.knex
                .select("*")
                .from("solves")
                .where({ userId: req.session.user.id })
                .andWhere({ challengeId: challengeId })
                .then((solves) => {
                  if (solves.length > 0) {
                    submissionLog(
                      challengeId,
                      req.session.user.teamId,
                      flag,
                      req.session.user.id,
                      "Already Solved"
                    );
                    res.status(200).json({ message: "Already solved" });
                    return;
                  } else {
                    db.knex("challenges")
                      .where({ id: challengeId })
                      .then((challenge) => {
                        db.knex("solves")
                          .insert({
                            teamId: req.session.user.teamId,
                            challengeId: challengeId,
                            userId: req.session.user.id,
                            points: challenge[0].points,
                          })
                          .then(() => {
                            db.knex("users")
                              .where({ id: req.session.user.id })
                              .then((user) => {
                                db.knex("users")
                                  .where({ id: req.session.user.id })
                                  .update({
                                    point: user[0].point + challenge[0].points,
                                  })
                                  .then(() => {
                                    req.session.user.score =
                                      req.session.user.score +
                                      challenge[0].points;
                                    submissionLog(
                                      challengeId,
                                      req.session.user.teamId,
                                      flag,
                                      req.session.user.id,
                                      "Correct"
                                    );
                                    res.status(200).json({
                                      message: "ok",
                                      points: challenge[0].points,
                                    });
                                    db.knex("challenges")
                                      .where({ id: challengeId })
                                      .update({
                                        solves: challenge[0].solves + 1,
                                      })
                                      .then(() => {
                                        db.knex("challenges")
                                          .where({ id: challengeId })
                                          .then((challenge) => {
                                            if (
                                              challenge[0].type == "Dinamik" &&
                                              challenge[0].solves >=
                                                challenge[0].dMaxSubmissions
                                            ) {
                                              db.knex("challenges")
                                                .where({
                                                  id: challengeId,
                                                })
                                                .update({
                                                  points: parseInt(
                                                    challenge[0].dMinPoints
                                                  ),
                                                })
                                                .then(() => {
                                                  console.log(
                                                    "Challenge's points updated"
                                                  );
                                                });
                                            }
                                          });
                                      });
                                    return;
                                  });
                              });
                          });
                      });
                  }
                });
            } else {
              submissionLog(
                challengeId,
                req.session.user.teamId,
                flag,
                req.session.user.id,
                "Incorrect"
              );
              res.status(200).json({ message: "Incorrect" });
              return;
            }
          } else {
            res.status(200).json({ message: "challenge not found" });
            return;
          }
        });
    });
});

router.post("/api/challenge/submit/test", (req, res) => {
  db.knex("config")
    .select("data")
    .where({ type: "paused" })
    .then((data) => {
      if (data[0].data == "1") {
        res.status(403).send({ message: "Paused" });
        return;
      }

      if (!req.session.user) {
        res.status(200).json({ message: "Unauthorized" });
        return;
      }
      // if (req.session.user.teamId == null) {
      //   res.status(200).json({ message: "User not in a team" });
      //   return;
      // }
      var { challengeId, name, answer } = req.body;
      if (!challengeId || !name || !answer) {
        res.status(200).json({
          message: "Required Fields",
          answer: answer,
          challengeId: challengeId,
          name: name,
        });
        return;
      }

      db.knex
        .select("*")
        .from("challenges")
        .where({ id: challengeId })
        .andWhere({ hidden: 0 })
        .andWhere({ name: name })
        .andWhere({ type: "Test" })
        .andWhere({ seviye: req.session.user.seviye })
        .then((data) => {
          if (data.length > 0) {
            if (data[0].tCorrect == answer[1]) {
              db.knex
                .select("*")
                .from("solves")
                .where({ userId: req.session.user.id })
                .andWhere({ challengeId: challengeId })
                .then((solves) => {
                  if (solves.length > 0) {
                    submissionLog(
                      challengeId,
                      req.session.user.teamId,
                      answer,
                      req.session.user.id,
                      "Already Solved"
                    );
                    res.status(200).json({ message: "Already solved" });
                    return;
                  } else {
                    db.knex("challenges")
                      .where({ id: challengeId })
                      .then((challenge) => {
                        db.knex("solves")
                          .insert({
                            teamId: req.session.user.teamId,
                            challengeId: challengeId,
                            userId: req.session.user.id,
                            points: challenge[0].points,
                          })
                          .then(() => {
                            db.knex("users")
                              .where({ id: req.session.user.id })
                              .then((user) => {
                                db.knex("users")
                                  .where({ id: req.session.user.id })
                                  .update({
                                    point: user[0].point + challenge[0].points,
                                  })
                                  .then(() => {
                                    req.session.user.score =
                                      req.session.user.score +
                                      challenge[0].points;
                                    submissionLog(
                                      challengeId,
                                      req.session.user.teamId,
                                      answer,
                                      req.session.user.id,
                                      "Correct"
                                    );
                                    res.status(200).json({
                                      message: "ok",
                                      points: challenge[0].points,
                                    });
                                    db.knex("challenges")
                                      .where({ id: challengeId })
                                      .update({
                                        solves: challenge[0].solves + 1,
                                      })
                                      .then(() => {
                                        db.knex("challenges")
                                          .where({ id: challengeId })
                                          .then((challenge) => {
                                            if (
                                              challenge[0].type == "Dinamik" &&
                                              challenge[0].solves >=
                                                challenge[0].dMaxSubmissions
                                            ) {
                                              db.knex("challenges")
                                                .where({
                                                  id: challengeId,
                                                })
                                                .update({
                                                  points: parseInt(
                                                    challenge[0].dMinPoints
                                                  ),
                                                })
                                                .then(() => {
                                                  console.log(
                                                    "Challenge's points updated"
                                                  );
                                                });
                                            }
                                          });
                                      });
                                    return;
                                  });
                              });
                          });
                      });
                  }
                });
            } else {
              db.knex("solves")
                .insert({
                  teamId: req.session.user.teamId,
                  challengeId: challengeId,
                  userId: req.session.user.id,
                  points: 0,
                })
                .then(() => {
                  submissionLog(
                    challengeId,
                    req.session.user.teamId,
                    answer,
                    req.session.user.id,
                    "Incorrect"
                  );
                });
              res.status(200).json({ message: "Incorrect" });
              return;
            }
          } else {
            res.status(200).json({ message: "challenge not found" });
            return;
          }
        });
    });
});

module.exports = router;
