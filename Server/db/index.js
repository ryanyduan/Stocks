const mongoose = require("mongoose");

function startDb() {
    mongoose
        .connect("mongodb://localhost:27017/stocks", {
            // TODO change back to "mongodb://mongo:27017/stocks" for deployment
            useNewUrlParser: true,
            keepAlive: 1
        })
        .then(() => console.log("Database successfully connected"));

    return mongoose.connection
        .on("error", console.error)
        .on("disconnected", startDb);
}

module.exports = {
    startDb
};
