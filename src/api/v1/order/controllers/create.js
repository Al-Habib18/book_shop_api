/** @format */
const orderService = require("../../../../lib/order");
const cartSercice = require("../../../../lib/cart");
const { notFound } = require("../../../../utils/error");

const create = async (req, res, next) => {
    const { cartId, shippingMethod } = req.body;
    try {
        const cartObj = await cartSercice.findById(cartId);
        if (!cartObj) {
            throw notFound();
        }
        const amount = cartObj.amount;
        const order = await orderService.create({
            //TODO: user
            cartId,
            shippingMethod,
            amount,
        });

        const data = {
            id: order.id,
            cart: order.cart,
            quantity: cartObj.quantity,
            amount: amount,
            orderStatus: order.orderStatus,
            shippingMethod: order.shippingMethod,
        };

        const links = {
            order: `/api/v1/orders/${order.id}`,
            cart: `/api/v1/cart/${cartObj.id}`,
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
