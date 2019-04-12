const config = require("../config");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

    if (token) {
        if (token.startsWith("Bearer ")) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: "Token is not valid"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({
            message: "Auth token is not supplied"
        });
    }
};

module.exports = {
    verifyToken
};
