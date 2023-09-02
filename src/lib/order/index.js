/** @format */

const { badRequest, notFound } = require("../../utils/error");
const Order = require("../../model/Order");
const { page, limit } = require("../../config/defaults");

const create = async ({ cartId, shippingMethod = "", amount = 0 }) => {
    if (!cartId) {
        throw badRequest("cartId is required");
    }

    const order = new Order({
        // TODO: user
        cart: cartId,
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
module.exports = {
    create,
    findById,
    findAll,
    count,
    removeItem,
    updatePorperties,
};
