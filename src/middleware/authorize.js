/** @format */

const { authorizationError } = require("../utils/error");
const authorize =
    (roles = ["admin"]) =>
    (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next();
        }
        return next(authorizationError());
    };

module.exports = authorize;
