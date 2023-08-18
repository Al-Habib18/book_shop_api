/** @format */

const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            required: true,
        },
        book: {
            type: Schema.ObjectId,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        summary: {
            type: String,
        },
    },
    { timeseries: true }
);

const Review = model("Review", reviewSchema);
module.exports = Review;
