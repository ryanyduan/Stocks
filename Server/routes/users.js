const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../db/models/User");

router.get("/login", (req, res) => {
  // find login then see if passwords match
  const { login, password } = req.body;
});

router.post("/register", async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  if (!username || !password || !email || !firstName || !lastName) {
    res.status(422).send({ errorMsg: "Invalid input" });
  } else {
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409).send({ errorMsg: "User is already registered" });
    } else {
      const newUser = new User({
        username,
        password,
        email,
        firstName,
        lastName
      });
      // Hash Password
      bcrypt.genSalt(10, async (err, salt) => {
        if (err) throw err;
        let hashed = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashed;
        await newUser.save();
      });
      res.status(200).send({ msg: "User successfully registered" });
    }
  }
});

module.exports = router;