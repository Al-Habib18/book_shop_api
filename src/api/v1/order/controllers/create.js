/** @format */
const orderService = require("../../../../lib/order");

const { notFound } = require("../../../../utils/error");

const create = async (req, res, next) => {
    const { cartId, shippingMethod } = req.body;
    const userId = req.user.id;

    try {
        const cart = await orderService.getCart(cartId);
        if (!cart) {
            throw notFound("cart not found");
        }
        const amount = cart.amount;
        const order = await orderService.create({
            userId,
            cartId,
            shippingMethod,
            amount,
        });

        const data = {
            id: order.id,
            cart: order.cartId,
            quantity: cart.quantity,
            amount: amount,
            orderStatus: order.orderStatus,
            shippingMethod: order.shippingMethod,
        };

        const links = {
            order: `/api/v1/orders/${order.id}`,
            cart: `/api/v1/cart/${order.cartId}`,
        };
        const response = {
            data,
            links,
        };

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = create;
