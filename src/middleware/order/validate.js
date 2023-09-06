/** @format */

const mongoose = require("mongoose");
const { badRequest } = require("../../utils/error");

const orderValidator = (req, res, next) => {
    const { cartId } = req.body;
    try {
        if (cartId) {
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                next(badRequest("Invalid cart ID"));
            }
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = orderValidator;
