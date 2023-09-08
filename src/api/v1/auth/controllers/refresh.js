/** @format */

const authService = require("../../../../lib/auth");
const { badRequest, authenticationError } = require("../../../../utils/error");

const refresh = async (req, res, next) => {
    const { refresh_token } = req.body;
    try {
        if (!refresh_token) {
            throw badRequest("Refresh token is required");
        }

        const decode = authService.verifyRefreshToken(refresh_token);

        const isExpired = authService.isExpiredToken(refresh_token);

        if (isExpired) {
            throw authenticationError("Refresh token Validation failed");
        }

        const accessToken = await authService.createAccessToken({
            email: decode.email,
        });
        await authService.removeRefreshToken({ token: refresh_token });

        const refresh = await authService.createRefreshToken({
            email: decode.email,
        });

        const response = {
            code: 201,
            message: "Refresh token create successful",
            data: {
                access_token: accessToken,
                refress_token: refresh.token,
            },
            links: {
                self: req.url,
            },
        };
        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};
module.exports = refresh;
