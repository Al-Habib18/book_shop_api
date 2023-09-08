/** @format */
/** @format */
const tokenService = require("../lib/token");
const authService = require("../lib/auth");
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
        //TODO: redirect to /refresh route
        // const isExpired = tokenService.isExpired(token);
        // if (isExpired) {
        //     const refresh = await authService.findRefreshToken(user.email);

        //     await authService.requestRefresh({
        //         refresh_token: refresh.token,
        //     });

        //     next(
        //         authenticationError(
        //             "authentication failed in authenticate middleware"
        //         )
        //     );
        // }

        req.user = {
            ...user._doc,
            id: user.id,
        };
        next();
    } catch (err) {
        next(
            authenticationError(
                "authentication failed in authenticate middleware"
            )
        );
    }
};

module.exports = authenticate;
