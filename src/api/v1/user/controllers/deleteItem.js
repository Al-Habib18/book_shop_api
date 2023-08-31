/** @format */
const userService = require("../../../../lib/user");
const { notFound } = require("../../../../utils/error");

const deleteItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        await userService.removeItem(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = deleteItem;
