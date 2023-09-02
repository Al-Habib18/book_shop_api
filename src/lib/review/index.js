/** @format */
const Review = require("../../model/Review");
const { notFound, badRequest } = require("../../utils/error");

// create a new review
const create = async ({ bookId, ratting, summary = "" }) => {
    const review = new Review({
        //TODO: userId,
        bookId,
        ratting,
        summary,
    });
    return review.save();
};

// count reviews
const count = ({ search = "" }) => {
    const filter = {
        summary: { $regex: search, $options: "i" },
    };

    return Review.count(filter);
};

//find all reviews
const findAll = async ({
    page = 1,
    limit = 5,
    sortBy = "updatedAt",
    sortType = "desc",
    search = "",
}) => {
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;
    const filter = {
        summary: { $regex: search, $options: "i" },
    };

    const reviews = await Review.find(filter)
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return reviews;
};

//find a single review
const findReviewById = async (id) => {
    if (!id) {
        throw badRequest("id is required");
    }
    return Review.findById(id);
};

// update a review
const updateProperties = async (id, { ratting = 0, summary = "" }) => {
    const review = await Review.findById(id);

    if (!review) {
        throw notFound();
    }

    const payload = { ratting, summary };

    Object.keys(payload).forEach(
        (key) => (review[key] = payload[key] ?? review[key])
    );

    await review.save();
    return review;
};
// delete a review
const removeItem = async (id) => {
    const review = await Review.findById(id);

    if (!review) {
        throw notFound();
    }
    return Review.findByIdAndDelete(id);
};

module.exports = {
    create,
    removeItem,
    updateProperties,
    findReviewById,
    findAll,
    count,
};
