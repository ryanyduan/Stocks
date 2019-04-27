const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("../services/authenticate").verifyToken;

const User = require("../db/models/User");
const Token = require("../db/models/Token");

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
        } else res.status(403).send({ errorType: "password" });
    } else return res.status(403).send({ errorType: "DNE" });
});

router.post("/logout", verifyToken, async (req, res) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

    if (token) {
        if (token.startsWith("Bearer ")) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
            const newToken = new Token({ token });
            await newToken.save();
            res.sendStatus(200);
        }
    } else res.status(401).send({ errorType: "no-token" });
});

router.post("/register", async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.sendStatus(404);
    }

    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });

    if (usernameExists) {
        res.status(499).send({ errorType: "usernameExists" });
    } else if (emailExists) {
        res.status(499).send({ errorType: "emailExists" });
    } else {
        const newUser = new User({
            email,
            username,
            password
        });
        // Hash Password
        bcrypt.genSalt(10, async (err, salt) => {
            if (err) throw err;
            let hashed = await bcrypt.hash(newUser.password, salt);
            newUser.password = hashed;
            await newUser.save();
            res.sendStatus(200);
        });
    }
});

module.exports = router;
