const express = require("express");
const router = express.Router();
const verifyToken = require("../services/authenticate").verifyToken;

const User = require("../db/models/User");

router.get("/getStocks", verifyToken, async (req, res) => {
    const user = await User.findOne({ username: req.decoded.user.username });
    const { stocks } = user;
    //TODO alphavantage api call to get stock data then just send back to client
    res.send(stocks);
});

router.post("/addStock", verifyToken, async (req, res) => {
    const { newStock } = req.body;
    const user = await User.findOne({ username: req.decoded.user.username });
    const found = user.stocks.findIndex((stock) => stock === newStock);
    if (found !== -1) res.status(422).send({ errorType: "exists", stock: newStock });
    else {
        user.stocks.push(newStock);
        await user.save();
        res.send(newStock);
    }
});

router.post("/deleteStock", verifyToken, async (req, res) => {
    const { stock } = req.body;
    const user = await User.findOne({ username: req.decoded.user.username });

    const found = user.stocks.findIndex((stock) => stock === stock);
    if (found === -1) res.status(404).send({ errorType: "DNE", stock });
    else {
        user.stocks.splice(found, 1);
        await user.save();
        res.send(stock);
    }
});

module.exports = router;
