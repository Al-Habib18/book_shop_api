/** @format */

const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            //TODO: required: true,
        },
        cart: {
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
            enum: ["pending", "shipped", "delivered", "cancelled "],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Order = model("Order", orderSchema);
module.exports = Order;
