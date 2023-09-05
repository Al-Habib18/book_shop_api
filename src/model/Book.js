/** @format */

const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
    {
        title: {
            type: String,
            maxlength: 50,
            minlength: 3,
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
            maxlength: 50,
            minlength: 3,
        },
        category: {
            type: String,
            maxlength: 50,
            minlength: 3,
        },
        summary: {
            type: String,
            maxlength: 250,
            minlength: 10,
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
