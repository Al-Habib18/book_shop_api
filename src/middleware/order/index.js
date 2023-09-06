/** @format */

const mongoose = require("mongoose");
const { badRequest } = require("../../utils/error");

const orderValidator = (req, res, next) => {
    const { cartId, shippingMethod } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            throw badRequest("Invalid cart ID");
        }
        if (shippingMethod) {
            if (shippingMethod !== "standard") {
                next();
            } else if (shippingMethod !== "priority") {
                next();
            } else {
                throw badRequest("Invalid shipping method");
            }
        }
    } catch (e) {
        next(e);
    }
};

module.exports = orderValidator;
