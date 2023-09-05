/** @format */
const orderService = require("../../../../lib/order");
const { notFound } = require("../../../../utils/error");

const orderStatus = async (req, res, next) => {
    const { id } = req.params;
    const { orderStatus } = req.body;
    try {
        let order = await orderService.findById(id);
        if (!order) {
            throw notFound("Order not found");
        }
        order = await orderService.updateOrderStatus(id, { orderStatus });

        const cartObj = await orderService.getCart(order.cartId);
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
            user: `/api/v1/users/${order.userId}`,
            cart: `/api/v1/carts/${order.cartId}`,
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

module.exports = orderStatus;
