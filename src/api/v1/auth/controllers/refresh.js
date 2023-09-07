/** @format */

const authService = require("../../../../lib/auth");
const tokenService = require("../../../../lib/token");
const { badRequest } = require("../../../../utils/error");

const refresh = async (req, res, next) => {
    const { refresh_token } = req.body;
    try {
        if (!refresh_token) {
            throw badRequest("Refresh token is required");
        }
        const decode = authService.verifyRefreshToken(refresh_token);

        const accessToken = await authService.createAccessToken({
            email: decode.email,
        });
        await authService.removeAccessToken({ token: refresh_token });

        const refresh = await authService.createRefreshToken({
            email: decode.email,
        });
        const response = {
            code: 200,
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
