/** @format */
const orderService = require("../../../../lib/order");
const cartSercice = require("../../../../lib/cart");
const { notFound } = require("../../../../utils/error");

const findSingle = async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await orderService.findById(id);
        if (!order) {
            throw notFound();
        }
        const cart = await cartSercice.findById(order.cartId);
        if (!cart) {
            throw notFound();
        }
        const quantity = cart.books.length;
        const data = {
            ...order._doc,
            quantity,
        };
        const links = {
            cart: `/api/v1/cart/${order.cartId}`,
            user: `/api/v1/user/${order.userId}`,
        };
        const response = {
            data,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingle;
