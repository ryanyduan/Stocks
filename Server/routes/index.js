const express = require("express");
const users = require("./users");
const stocks = require("./stocks");

const router = express.Router();

router.use("/users", users);
router.use("stocks", stocks);

router.get("/dashboard", (req, res) => {
    res.send("Hit dashboard");
});

module.exports = router;
