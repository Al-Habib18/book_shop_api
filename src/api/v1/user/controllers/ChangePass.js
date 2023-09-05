/** @format */
const userService = require("../../../../lib/user");

const changePassword = async (req, res, next) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
        let user = await userService.changePassword(id, {
            oldPassword,
            newPassword,
        });
        user = await userService.findUserById(user.id);
        const links = {
            self: `/api/v1/users/${user.id}`,
        };

        const response = {
            data: user,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = changePassword;
