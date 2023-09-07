/** @format */

const mongoose = require("mongoose");
const { badRequest } = require("../../utils/error");

const orderValidator = (req, res, next) => {
    const { cartId, orderStatus } = req.body;
    const { id } = req.params;
    try {
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw badRequest("Invalid Order ID in parameter");
            }
        }
        if (cartId) {
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                next(badRequest("Invalid cart ID"));
            }
        }
        if (orderStatus) {
            if (orderStatus !== "cancel") {
                next(badRequest("Invalid order status"));
            }
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = orderValidator;
