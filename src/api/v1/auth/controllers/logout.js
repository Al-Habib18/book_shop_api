/** @format */

const logout = (req, res, next) => {
    const user = req.user;
    try {
        // const refreshToken =
        res.status(200).json({ user: user });
    } catch (e) {
        next(e);
    }
};

module.exports = logout;
