const express = require("express");
const users = require("./users");
const { ensureAuthenticated } = require("../services/auth");

const router = express.Router();

router.use("/users", users);

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send("Hit dashboard");
});

module.exports = router;
