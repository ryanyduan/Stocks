const config = require("../config");
const jwt = require("jsonwebtoken");

const Token = require("../db/models/Token");

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (token) {
        if (token.startsWith("Bearer ")) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Token is not valid"
                });
            } else {
                const invalidToken = await Token.findOne({ token });
                if (invalidToken)
                    return res.status(401).json({
                        message: "Token is blacklisted"
                    });
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: "Auth token is not supplied"
        });
    }
};

module.exports = {
    verifyToken
};
