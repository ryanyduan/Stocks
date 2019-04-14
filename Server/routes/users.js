const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("../services/authenticate").verifyToken;

const User = require("../db/models/User");

router.post("/login", async (req, res) => {
    const { user, password } = req.body;

    const exists = await User.findOne({
        $or: [{ username: user }, { email: user }]
    });

    if (exists) {
        const match = await bcrypt.compare(password, exists.password);
        if (match) {
            jwt.sign(
                { user: exists },
                config.secret,
                { algorithm: "HS256" }, //can't use RS256 cause of invalid SSL certificate
                (err, token) => {
                    if (err) console.log(err);
                    else res.send({ token });
                }
            );
        }
    } else res.status(400).send({ msg: "Wrong password" });
});

router.get("/logout", (req, res) => {
    // TO DO
});

router.get("/login", (req, res) => {
    res.send({ msg: "Login" });
});

router.post("/register", async (req, res) => {
    const { username, password, email, firstName, lastName } = req.body;
    if (!username || !password || !email || !firstName || !lastName) {
        res.status(422)
            .send({ errorMsg: "Invalid input" })
            .end();
    } else {
        const userexists = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (userexists) {
            res.status(499).send({ errorMsg: "User is already registered" });
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
                res.send({ msg: "User successfully registered" });
            });
        }
    }
});

module.exports = router;
