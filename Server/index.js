const express = require("express");
const { startDb } = require("./db/index");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Bodyparser
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization"
    });
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

startDb().once("open", () => {
    app.listen(PORT, () => console.log(`Listening on port* ${PORT}`));
});

module.exports = app;
