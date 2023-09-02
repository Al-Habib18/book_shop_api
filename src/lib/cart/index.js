/** @format */
const { badRequest, notFound } = require("../../utils/error");
const Cart = require("../../model/Cart");

const create = async ({ userId, bookArray = [], quantity = 0, amount = 0 }) => {
    if (!userId) {
        throw badRequest();
    }
    if (quantity === 0) {
        throw badRequest("bookId is required");
    }
    const book = bookArray;
    const cart = new Cart({ userId, book, quantity, amount });
    await cart.save();
    return cart;
};
const findById = (id) => {
    if (!id) {
        throw badRequest("Id is required");
    }
    return Cart.findById(id);
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

    return Cart.findByIdAndDelete(id);
};

module.exports = {
    create,
    findById,
    findAll,
    updateProperties,
    removeItem,
    count,
};
