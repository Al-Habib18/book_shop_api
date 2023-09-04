/** @format */
const { badRequest, notFound } = require("../../utils/error");
const Cart = require("../../model/Cart");
const orderService = require("../order");

// create a new Cart
const create = async ({ userId, bookArray = [], quantity = 0, amount = 0 }) => {
    if (!userId) {
        throw badRequest();
    }
    if (quantity === 0) {
        throw badRequest("bookId is required");
    }
    const books = bookArray;
    const cart = new Cart({ userId, books, quantity, amount });
    await cart.save();
    return cart;
};

// find cart by cart id
const findById = (id) => {
    if (!id) {
        throw badRequest("Id is required");
    }
    return Cart.findById(id);
};

// find cart by userId
const findByUserId = (id) => {
    if (!id) {
        throw badRequest();
    }
    return Cart.find({ userId: id });
};
// count all cart
const count = () => {
    return Cart.count();
};

//find all carts
const findAll = async ({
    page = 1,
    limit = 5,
    sortBy = "updatedAt",
    sortType = "desc",
}) => {
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;
    const carts = await Cart.find({})
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return carts;
};

// update a carts
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

// delete a carts
const removeItem = async (id) => {
    if (!id) throw badRequest("id is required");

    const cart = await Cart.findById(id);
    if (!cart) {
        throw notFound();
    }

    const orders = await orderService.findByCartId(cart.id);
    //TODO: remove loop later
    for (let order of orders) {
        await orderService.removeItem(order.id);
    }

    return Cart.findByIdAndDelete(id);
};

module.exports = {
    create,
    findById,
    findByUserId,
    findAll,
    updateProperties,
    removeItem,
    count,
};
