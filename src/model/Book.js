/** @format */

const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        author: {
            type: [String],
            required: true,
        },
        publisher: {
            type: String,
        },
        category: {
            type: String,
        },
        summary: {
            type: String,
        },
        price: {
            type: Number,
        },
        available: {
            type: String,
            enum: ["yes", "no"],
            default: "yes",
        },
    },
    { timestamps: true }
);

const Book = model("Book", bookSchema);

module.exports = Book;
