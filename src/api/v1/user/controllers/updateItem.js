/** @format */

const userService = require("../../../../lib/user");
const { notFound } = require("../../../../utils/error");

const updateItem = async (req, res, next) => {
    const { id } = req.params;
    const { name, role, account } = req.body;
    try {
        const user = await userService.updateProperties(id, {
            name,
            role,
            account,
        });

        if (!user) {
            throw notFound();
        }

        const links = {
            self: `/api/v1/users/${user.id}`,
        };

        const response = {
            data: user,
            links,
        };

        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
};

module.exports = updateItem;
