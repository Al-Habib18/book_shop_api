/** @format */

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            maxlength: 50,
            minlength: 3,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            maxlength: 10,
            minlength: 4,
            require: true,
        },
        role: {
            type: String,
            enum: ["customer", "seller", "admin"],
            default: "customer",
        },
        account: {
            type: String,
            maxlength: 11,
            minlength: 11,
        },
    },
    { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
