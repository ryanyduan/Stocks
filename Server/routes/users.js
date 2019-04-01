const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const { ensureAuthenticated } = require("../services/auth");
const User = require("../db/models/User");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    failWithError: true,
    successRedirect: "/dashboard",
    failureRedirect: "/users/login"
  })(req, res, next);
});

router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

router.get("/login", (req, res) => res.render("login"));

router.post("/register", async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  if (!username || !password || !email || !firstName || !lastName) {
    res.status(422).send({ errorMsg: "Invalid input" });
  } else {
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (emailExists || usernameExists) {
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
      res.send({ msg: "User successfully registered" });
    }
  }
});

router.get("/stocks", ensureAuthenticated, (req, res) => {
  res.send({ msg: "Hit stocks" });
});

module.exports = router;
