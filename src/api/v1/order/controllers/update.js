/** @format */
const orderService = require("../../../../lib/order");
const { notFound } = require("../../../../utils/error");

const update = async (req, res, next) => {
    const { id } = req.params;
    const { cartId, orderStatus, shippingMethod } = req.body;
    try {
        const order = await orderService.updatePorperties(id, {
            cartId,
            orderStatus,
            shippingMethod,
        });

        const cartObj = await orderService.getCart(cartId);
        if (!cartObj) {
            throw notFound("Cart not found");
        }

        const data = {
            ...order._doc,
            cart: order.cart,
            quantity: cartObj.quantity,
            amount: cartObj.amount,
        };

        const links = {
            self: `/api/v1/orders/${order.id}`,
            user: `/api/v1/users/${order.user}`,
            cart: `/api/v1/carts/${order.cart}`,
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

module.exports = update;
