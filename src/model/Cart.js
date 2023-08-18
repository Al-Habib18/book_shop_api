/** @format */

const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            required: true,
        },
        book: {
            type: Schema.ObjectId,
            required: true,
        },
    },
    { timeseries: true }
);

const Cart = model("Cart", cartSchema);
module.exports = Cart;
