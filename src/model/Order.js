/** @format */

const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            required: true,
        },
        cart: {
            type: Schema.ObjectId,
            required: true,
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
    { timeseries: true }
);

const Order = model("Order", orderSchema);
module.exports = Order;
