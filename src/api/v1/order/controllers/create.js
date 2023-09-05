/** @format */
const orderService = require("../../../../lib/order");
const cartService = require("../../../../lib/cart");

const { notFound } = require("../../../../utils/error");

const create = async (req, res, next) => {
    const { cartId, shippingMethod } = req.body;
    const userId = req.user.id;

    try {
        const cart = await cartService.findById(cartId);
        if (!cart) {
            throw notFound();
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

const create2 = async (req, res, next) => {
    const cart = await cartSercice.create({ bookArray, quantity, amount });

    const data = {
        id: cart.id,
        books,
        quantity,
        amount,
    };

    res.status(200).json({ data });
};
