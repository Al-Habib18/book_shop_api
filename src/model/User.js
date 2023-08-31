/** @format */

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            enum: ["customer", "author", "admin"],
            default: "customer",
        },
        account: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
