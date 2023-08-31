/** @format */

const userService = require("../../../../lib/user");
const { notFound } = require("../../../../utils/error");

const findSingleItem = async (req, res, next) => {
    const { id } = req.params;

    try {
        const data = await userService.findUserById(id);
        if (!data) {
            throw notFound();
        }
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
};

module.exports = findSingleItem;
