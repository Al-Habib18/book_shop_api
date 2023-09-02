/** @format */
const orderService = require("../../../../lib/order");
const { notFound } = require("../../../../utils/error");

const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        await orderService.removeItem(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = remove;
