const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../db/models/User");

const secretKey = "ulilagfeawfgaewkdylewauh";

router.post("/login", async (req, res, next) => {
    const { user, password } = req.body;

    const exists = await User.find({
        $or: [{ username: user }, { email: user }]
    });

    if (exists) {
        const match = await bcrypt.compare(password, exists[0].password);
        if (match) {
            jwt.sign(
                { user },
                secretKey,
                { algorithm: "HS256" }, //can't use RS256 cause of invalid SSL certificate
                (err, token) => {
                    if (err) console.log(err);
                    res.send({ token });
                }
            );
        }
    } else res.status(400).send({ msg: "Wrong password" });
});

router.get("/logout", (req, res) => {
    // TO DO
});

router.get("/login", (req, res) => {
    res.send({ msg: "Login" }).end();
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
            res.status(499)
                .send({ errorMsg: "User is already registered" })
                .end();
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
                res.send({ msg: "User successfully registered" }).end();
            });
        }
    }
});

router.get("/stocks", (req, res) => {
    console.log(req.user);
});

module.exports = router;
