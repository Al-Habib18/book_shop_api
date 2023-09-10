/** @format */

const Order = require("../../model/Order");
const cartService = require("../cart");
const userService = require("../user");

const { badRequest, notFound } = require("../../utils/error");
const defaults = require("../../config/defaults");

const create = async ({ userId, cartId, shippingMethod = "", amount = 0 }) => {
    if (!cartId || !userId) {
        throw badRequest();
    }
    // check ,is already ordered by this cart?
    const order_arr = await findByCartId(cartId);

    if (order_arr.length > 0) {
        throw badRequest("Order already has been created by this cart");
    }

    const order = new Order({
        userId,
        cartId,
        shippingMethod,
        amount,
    });
    return order.save();
};

// find a  single order by order_id
const findById = async (id) => {
    if (!id) {
        throw badRequest("id is required");
    }
    return Order.findById(id);
};

// find all orders
const findAll = async ({
    page = defaults.page || 1,
    limit = defaults.limit || 5,
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
// update order
const updatePorperties = async (
    id,
    { cartId, shippingMethod, orderStatus }
) => {
    const order = await Order.findById(id);

    if (!order) {
        throw notFound("Order not found");
    }

    const payload = { cart: cartId, shippingMethod, orderStatus };

    Object.keys(payload).forEach(
        (key) => (order[key] = payload[key] ?? order[key])
    );

    await order.save();
    return order;
};

// update order-status
const cancleOrder = async (id, { orderStatus }) => {
    const order = await Order.findById(id);
    if (!order) {
        throw notFound();
    }
    if (order.orderStatus === "cancelled") {
        throw badRequest("Your order already cancelled");
    } else if (order.orderStatus === "shipped") {
        throw badRequest("Your order has already been shipped");
    } else if (order.orderStatus === "delivered") {
        throw badRequest("Your order has already been delivered");
    }
    order.orderStatus = orderStatus || order.orderStatus;
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

// find order by user id
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

// find order by cart id
const findByCartId = async (id) => {
    if (!id) {
        throw badRequest();
    }
    return Order.find({ cartId: id });
};

// get cart of a  by cart id
const getCart = (id) => {
    return cartService.findById(id);
};

// check owner ship of a order
const checkOwnership = async ({ id, userId }) => {
    const order = await findById(id);

    if (!order) {
        throw "Order not found";
    }

    if (order.userId === userId) {
        return true;
    }
    return false;
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
    getCart,
    cancleOrder,
    checkOwnership,
};
