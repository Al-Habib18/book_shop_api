/** @format */
const authService = require("../../../../lib/auth");
const logout = async (req, res, next) => {
    const { refresh_token } = req.body;
    try {
        await authService.removeRefreshToken({ token: refresh_token });
        res.status(204).end();
    } catch (e) {
        next(e);
    }
};

module.exports = logout;
