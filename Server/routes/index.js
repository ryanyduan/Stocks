const express = require("express");
const users = require("./users");
const { ensureAuthenticated, handleError } = require("../services/auth");

const router = express.Router();

router.use("/users", users);
router.use(handleError);

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send("Hit dashboard");
});

module.exports = router;
