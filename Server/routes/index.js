const express = require("express");
const users = require("./users");
const stocks = require("./stocks");

const router = express.Router();

router.use("/users", users);
router.use("/stocks", stocks);

module.exports = router;
