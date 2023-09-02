/** @format */
const orderService = require("../../../../lib/order");
const cartService = require("../../../../lib/cart");
const { badRequest } = require("../../../../utils/error");

const findCart = async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await orderService.findById(id);
        if (!order) {
            throw badRequest("Invalid id");
        }

        const cart = await cartService.findById(order.cart);
        const links = {
            //TODO:user: `/api/v1/users/${order.user}`,
        };
        const respose = {
            data: cart,
            links,
        };
        res.status(200).json(respose);
    } catch (err) {
        next(err);
    }
};

module.exports = findCart;
