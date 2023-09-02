/** @format */

const { serverError } = require("../../utils/error");

const jwt = require("jsonwebtoken");

const generateToken = ({
    payload,
    algorithm = "HS256",
    secret = process.env.ACCESS_TOKEN_SECRET,
    expiresIn = "24h",
}) => {
    try {
        const jsonWebToken = jwt.sign(payload, secret, {
            expiresIn,
            algorithm,
        });
        return jsonWebToken;
    } catch (err) {
        console.log("[JWT]", err);
        throw serverError();
    }
};

module.exports = { generateToken };
