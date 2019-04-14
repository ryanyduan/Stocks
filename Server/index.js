const express = require("express");
const session = require("express-session");
const { startDb } = require("./db/index");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Bodyparser
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type"
    });
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sessions
app.use(
    session({
        secret: "jiafoerzhewhhowehfaefh", // this is used to hash
        resave: false, // save only if user edits session
        saveUninitialized: false // dont save unless logged in
    })
);

app.use(router);

startDb().once("open", () => {
    app.listen(PORT, () => console.log(`Listening on port* ${PORT}`));
});
