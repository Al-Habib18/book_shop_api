/** @format */

const Order = require("../../model/Order");
const defaults = require("../../config/defaults");
const cartService = require("../cart");
const { badRequest, notFound } = require("../../utils/error");

/** create a new Order
 * @param {string} userId - user id of the order
 * @param {string} cartId - cart id of the order
 * @param {enum} shippingMethod - shipping method of the order
 * @param {number}  amount - total amount of the order
 * @return {Promise} promise of a new Order
 */
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

/** - find a  single order by order_id
 * @param {string} id - order id
 */
const findById = async (id) => {
    if (!id) {
        throw badRequest("id is required");
    }
    return Order.findById(id);
};

/** - find all orders
 * @param {string} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} orders  - array of orders
 */
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

/**
 * count all orders
 */
const count = () => {
    return Order.count();
};

/** update a Order
 * @param {string} id -  id of the order
 * @param {string} cartId - cart id of the order
 * @param {enum} shippingMethod - shipping method of the order
 * @param {enum}  orderStatus - status of the order
 * @return {object} object of a the updated Order
 */
const updateProperties = async (
    id,
    { cartId, shippingMethod, orderStatus }
) => {
    if (!id) {
        throw badRequest();
    }
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

/** - cancel a order
 * @param {string} id - order id
 * @param {enum} orderStatus [canelled] - status of the order
 */
const cancleOrder = async (id, { orderStatus }) => {
    const order = await Order.findById(id);
    if (!id) {
        throw badRequest();
    }
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

/** delete a order
 * @param {string} id - order id
 * @returns {Promise} - promise of the deleted order
 */
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

/** - find order by user id
 * @param {string} id - id of a user
 * @param {string} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} order  - array of order
 */
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

/** - find order by cart id
 * @param {string} id - cart id
 * @return {Array} order - array of order- technicaly it is returns a single order
 */
const findByCartId = async (id) => {
    if (!id) {
        throw badRequest();
    }
    return Order.find({ cartId: id });
};

/** get cart of a  by cart id
 * @param {string} id - cart id
 * @return {object}  cart object
 */
const getCart = (id) => {
    return cartService.findById(id);
};

/** -  check owner ship of a order
 * @param {string} id - order id
 * @param {string} userId - requested user id
 * @returns {boolean}
 */
const checkOwnership = async ({ id, userId }) => {
    if (!id) {
        throw badRequest();
    }
    const order = await findById(id);

    if (!order) {
        throw badRequest("order does not exist");
    }
    const orderOwner = order.userId.toString();

    if (orderOwner === userId) {
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
    updateProperties,
    findByUserId,
    findByCartId,
    getCart,
    cancleOrder,
    checkOwnership,
};
