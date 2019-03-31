const express = require("express");
const session = require("express-session");
const { startDb } = require("./db/index");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sessions
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(router);

startDb().once("open", () => {
  app.listen(PORT, () => console.log(`Listening on port* ${PORT}`));
});
