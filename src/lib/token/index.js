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

const verifyToken = (token, secret = process.env.ACCESS_TOKEN_SECRET) => {
    try {
        const decoded = jwt.decode(token, secret);
        return decoded;
    } catch (err) {
        console.log("[JWT]", err);
        throw serverError();
    }
};

module.exports = { generateToken, verifyToken };
const decodeToken = ({ token, algorithm = "HS256" }) => {
    try {
        return jwt.decode(token, { algorithms: [algorithm] });
    } catch (err) {
        console.log("[JWT]", err);
        throw serverError();
    }
};
