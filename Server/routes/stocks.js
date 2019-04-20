const express = require("express");
const router = express.Router();
const verifyToken = require("../services/authenticate").verifyToken;
const axios = require("axios");

const User = require("../db/models/User");

router.get("/getStocks", verifyToken, async (req, res) => {
    const user = await User.findOne({ username: req.decoded.user.username });
    const { stocks } = user;
    const stocksURL = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${stocks.toString()}&apikey=${
        process.env.API_URL
    }`;
    let stocksData = await axios.get(stocksURL).catch((err) => console.log(err));
    stocksData = stocksData.data["Stock Quotes"].map((stock) => ({
        name: stock["1. symbol"],
        price: stock["2. price"]
    }));
    res.send(stocksData);
});

router.post("/addStock", verifyToken, async (req, res) => {
    const { newStock } = req.body;
    const user = await User.findOne({ username: req.decoded.user.username });
    const found = user.stocks.findIndex((stock) => stock === newStock);
    if (found !== -1) res.status(422).send({ errorType: "exists", stock: newStock });
    else {
        user.stocks.push(newStock);
        await user.save();
        const stocksURL = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${newStock}&apikey=${
            process.env.API_URL
        }`;
        let stocksData = await axios.get(stocksURL).catch((err) => console.log(err));
        stocksData = {
            name: stocksData.data["Stock Quotes"][0]["1. symbol"],
            price: stocksData.data["Stock Quotes"][0]["2. price"]
        };
        res.send(stocksData);
    }
});

router.post("/deleteStock", verifyToken, async (req, res) => {
    const { delStock } = req.body;
    const user = await User.findOne({ username: req.decoded.user.username });
    const found = user.stocks.findIndex((stock) => stock === delStock);
    if (found === -1) res.status(404).send({ errorType: "DNE", delStock });
    else {
        user.stocks.splice(found, 1);
        await user.save();
        res.send(delStock);
    }
});

module.exports = router;
