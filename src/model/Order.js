/** @format */

const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.ObjectId,
            required: true,
        },
        cartId: {
            type: Schema.ObjectId,
            required: true,
        },
        amount: {
            type: Number,
        },
        shippingMethod: {
            type: String,
            enum: ["standard", "priority"],
            default: "standard",
        },
        orderStatus: {
            type: String,
            enum: ["pending", "approved", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Order = model("Order", orderSchema);
module.exports = Order;
