/** @format */

const { Schema, model } = require("mongoose");

const refreshSchema = new Schema(
    {
        email: {
            type: String,
            // required: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Refresh = model("Refresh", refreshSchema);
module.exports = Refresh;
