/** @format */

const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        userId: {
            type: Schema.ObjectId,
            required: true,
        },
        bookId: {
            type: Schema.ObjectId,
            required: true,
        },
        ratting: {
            type: Number,
            required: true,
        },
        summary: {
            type: String,
        },
    },
    { timestamps: true }
);

const Review = model("Review", reviewSchema);
module.exports = Review;
