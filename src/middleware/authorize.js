/** @format */

const { authorizationError } = require("../utils/error");
const authorize =
    (roles = ["admin"]) =>
    (req, _res, next) => {
        if (roles.includes(req.user.role)) {
            return next();
        }
        return next(authorizationError());
    };

module.exports = authorize;
