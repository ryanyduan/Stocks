const express = require("express");
const users = require("./users");

const router = express.Router();

router.use("/users", users);

router.get("/dashboard", (req, res) => {
    res.send("Hit dashboard");
});

module.exports = router;
