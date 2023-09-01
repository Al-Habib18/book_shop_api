/** @format */

const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            required: true,
        },
        order: {
            type: Schema.ObjectId,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ["bKash", "roket", "nagad"],
            default: "bKash",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "successful", "failed "],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Payment = model("Payment", paymentSchema);
module.exports = Payment;
