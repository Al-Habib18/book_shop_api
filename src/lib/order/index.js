/** @format */

const Order = require("../../model/Order");
const { badRequest, notFound } = require("../../utils/error");
const { page, limit } = require("../../config/defaults");

const create = async ({ userId, cartId, shippingMethod = "", amount = 0 }) => {
    if (!cartId || !userId) {
        throw badRequest();
    }

    const order = new Order({
        userId,
        cartId,
        shippingMethod,
        amount,
    });
    return order.save();
};

// find a  sing order
const findById = async (id) => {
    if (!id) {
        throw badRequest("id is required");
    }
    return Order.findById(id);
};

// find all orders
const findAll = async ({
    page = 1,
    limit = 5,
    sortType = "desc",
    sortBy = "updatedAt",
}) => {
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;
    return Order.find()
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);
};

// count all orders
const count = () => {
    return Order.count();
};
const updatePorperties = async (
    id,
    { cartId, orderStatus, shippingMethod }
) => {
    const order = await Order.findById(id);
    if (!order) {
        throw notFound();
    }
    const cart = cartId;
    const payload = { cart, orderStatus, shippingMethod };

    Object.keys(payload).forEach(
        (key) => (order[key] = payload[key] ?? order[key])
    );
    await order.save();
    return order;
};

// delete a order
const removeItem = async (id) => {
    if (!id) {
        throw badRequest("id is required");
    }

    const order = await findById(id);
    if (!order) {
        throw notFound();
    }

    return Order.findByIdAndDelete(id);
};

const findByUserId = async (
    id,
    { page = 1, limit = 10, sortType = "desc", sortBy = "updatedAt" }
) => {
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;

    const orders = await Order.find({ userId: id })
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return orders;
};

const findByCartId = async (id) => {
    if (!id) {
        throw badRequest();
    }
    return Order.find({ cartId: id });
};
module.exports = {
    create,
    findById,
    findAll,
    count,
    removeItem,
    updatePorperties,
    findByUserId,
    findByCartId,
};
