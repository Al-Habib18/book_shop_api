/** @format */

const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");

/**
 * @param {object} payload - The payload will be sign
 * @param {string} algorithm
 * @param {string} secret
 * @param {string} expiresIn
 * @returns {string} jsonwebtoken
 */
const generateToken = ({
    payload,
    algorithm = "HS256",
    secret = process.env.ACCESS_TOKEN_SECRET,
    expiresIn = "5m", // 30 seconds
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

/** - decode a token
 * @param {string} token  - token will be decoded
 * @param {string} secret - token will be decoded with the secret
 * @returns {object} - decoded object
 */
const decodeToken = (token, secret = process.env.ACCESS_TOKEN_SECRET) => {
    try {
        const decoded = jwt.decode(token, secret);
        return decoded;
    } catch (err) {
        console.log("[JWT]", err);
        throw serverError();
    }
};

/** - varify a token
 * @param {string} token  - token will be decoded
 * @param {string} secret - token will be decoded with the secret
 * @returns {object} - decoded object
 */
const verifyToken = (token, secret = process.env.ACCESS_TOKEN_SECRET) => {
    const decoded = jwt.verify(token, secret);
    return decoded;
};

/** - check token expiration
 * @param {string} token  - token will be decoded
 * @returns {boolean}
 */
const isExpired = (token) => {
    const decoded = decodeToken(token);

    let expiration = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > expiration) {
        return true;
    }
    return false;
};

module.exports = { generateToken, decodeToken, verifyToken, isExpired };
