const mongoose = require("mongoose");

function startDb() {
    mongoose
        .connect("mongodb://localhost:27017/stocks", {
            useNewUrlParser: true,
            keepAlive: 1
        })
        .then(() => console.log("Database successfully connected"));

    return mongoose.connection.on("error", console.error).on("disconnected", startDb);
}

module.exports = {
    startDb
};
