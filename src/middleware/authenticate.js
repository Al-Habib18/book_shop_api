/** @format */
/** @format */
const tokenService = require("../lib/token");
const userService = require("../lib/user");
const { authenticationError } = require("../utils/error");

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decoded = tokenService.decodeToken(token);

        const user = await userService.findUserByEmail(decoded.email);

        if (!user) {
            next(authenticationError("Authenticate failed"));
        }
        req.user = {
            ...user._doc,
            id: user.id,
        };
        next();
    } catch (err) {
        next(authenticationError());
    }
};

module.exports = authenticate;
