const express = require("express");
const session = require("express-session");
const { startDb } = require("./db/index");
const router = require("./routes");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 5000;

require("./services/passport")(passport);

// Bodyparser
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

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

startDb().once("open", () => {
  app.listen(PORT, () => console.log(`Listening on port* ${PORT}`));
});
