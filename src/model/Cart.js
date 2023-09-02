/** @format */

const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.ObjectId,
            required: true,
        },
        books: {
            type: [Schema.ObjectId],
            required: true,
        },
        quantity: {
            type: Number,
        },
        amount: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Cart = model("Cart", cartSchema);
module.exports = Cart;
