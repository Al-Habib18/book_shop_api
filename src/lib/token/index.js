/** @format */

const { serverError } = require("../../utils/error");

const jwt = require("jsonwebtoken");

const generateToken = ({
    payload,
    algorithm = "HS256",
    secret = process.env.ACCESS_TOKEN_SECRET,
    expiresIn = "30s", // 30 seconds
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

const decodeToken = (token, secret = process.env.ACCESS_TOKEN_SECRET) => {
    try {
        const decoded = jwt.decode(token, secret);
        return decoded;
    } catch (err) {
        console.log("[JWT]", err);
        throw serverError();
    }
};

const verifyToken = ({ token, secret = process.env.ACCESS_TOKEN_SECRET }) => {
    const decoded = jwt.verify(token, secret);
    return decoded;
};

module.exports = { generateToken, decodeToken, verifyToken };
const decodeToken2 = ({ token, algorithm = "HS256" }) => {
    try {
        return jwt.decode(token, { algorithms: [algorithm] });
    } catch (err) {
        console.log("[JWT]", err);
        throw serverError();
    }
};
