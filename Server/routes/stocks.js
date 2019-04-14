const express = require("express");
const router = express.Router();
const verifyToken = require("../services/authenticate").verifyToken;

const User = require("../db/models/User");

router.get("/stocks", verifyToken, async (req, res) => {
    const user = await User.findOne({ username: req.decoded.user });
    const { stocks } = user;
    //TODO alphavantage api call to get stock data then just send back to client
    console.log(stocks);
});

router.post("/addStock", verifyToken, async (req, res) => {
    const { newStock } = req.body;
    const user = await User.findOne({ username: req.decoded.user });
    user.stocks.push(newStock);
    await user.save();
});

router.delete("deleteStock", verifyToken, async (req, res) => {
    const { stock } = req.body;
    const user = await User.findOne({ username: req.decoded.user });

    const found = user.stocks.findIndex(stock);
    if (found === -1) res.status(404).send({ msg: "Stock not found" });
    else {
        user.stocks.splice(found, 1);
        await user.save();
        res.send({ msg: `{stock} successfully deleted` });
    }
});

module.exports = router;
