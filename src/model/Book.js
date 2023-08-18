/** @format */

const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.ObjectId, // user.id
            required: true,
        },
        publisher: {
            type: String,
        },
        category: {
            String,
            enum: [regional, science, novel, accademic, history],
        },
        summary: {
            type: String,
        },
        price: {
            type: Number,
        },
        availability: {
            type: String,
            enum: [available, unavailable],
        },
    },
    { timeseries: true }
);

const Book = model("Book", bookSchema);

module.exports = Book;
