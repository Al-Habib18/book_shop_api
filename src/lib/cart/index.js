/** @format */
const { badRequest, notFound } = require("../../utils/error");
const Cart = require("../../model/Cart");

const create = async ({ bookArray = [], quantity = 0, amount = 0 }) => {
    if (quantity === 0) {
        throw badRequest("bookId is required");
    }
    const book = bookArray;
    const cart = new Cart({ book, quantity, amount });
    await cart.save();
    return cart;
};

const updateProperties = async (
    id,
    { bookArray = [], quantity = 0, amount = 0 }
) => {
    const cart = await findById(id);
    if (!cart) {
        throw notFound();
    }
    const payload = { bookArray, quantity, amount };

    Object.keys(payload).forEach(
        (key) => (cart[key] = payload[key] ?? cart[key])
    );

    await cart.save();
    return cart;
};

const findById = (id) => {
    if (!id) {
        throw badRequest("Id is required");
    }
    return Cart.findById(id);
};

const removeItem = async (id) => {
    const cart = await Cart.findById(id);
    if (!cart) {
        throw notFound();
    }

    return Cart.findByIdAndDelete(id);
};
module.exports = { create, updateProperties, removeItem };
