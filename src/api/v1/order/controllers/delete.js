/** @format */
const orderService = require("../../../../lib/order");
const cartService = require("../../../../lib/cart");
const { notFound } = require("../../../../utils/error");

const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        let order = await orderService.findById(id);

        await cartService.removeItem(order.cartId);

        await orderService.removeItem(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = remove;
