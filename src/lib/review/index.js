/** @format */
const Review = require("../../model/Review");
const bookService = require("../book");
const { notFound, badRequest } = require("../../utils/error");

// create a new review
const create = async ({ userId, bookId, ratting, summary = "" }) => {
    if (!userId || !bookId || !ratting) {
        throw badRequest();
    }
    const book = await bookService.findBookById(bookId);
    if (!book) {
        throw badRequest("Book does not Exist");
    }
    // only one user can create a review of a book
    const reviews = await findByBookId(bookId, { page: 1, limit: 0 });

    for (const review of reviews) {
        let reviewerId = `${review.userId}`;
        if (reviewerId === userId) {
            throw badRequest(
                "You hav already been created a review to this book"
            );
        }
    }

    const review = new Review({
        userId,
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
    if (!id) {
        throw badRequest("id is required");
    }

    const review = await Review.findById(id);
    if (!review) {
        throw notFound();
    }
    return Review.findByIdAndDelete(id);
};

// find all reviews of a user
const findByUserId = async (
    id,
    { page = 1, limit = 10, sortType = "desc", sortBy = "updatedAt" }
) => {
    if (!id ?? !page ?? !limit) {
        throw badRequest();
    }
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;

    //TODO: implement summary regex for find reviews
    const reviews = await Review.find({ userId: id })
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return reviews;
};

// find all reviews of a given book
const findByBookId = async (
    id,
    { page = 1, limit = 10, sortType = "desc", sortBy = "updatedAt" }
) => {
    if (!id ?? !page ?? !limit) {
        throw badRequest();
    }
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;

    //TODO: implement summary regex for find reviews
    const reviews = await Review.find({ bookId: id })
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return reviews;
};

// get a book by book_id
const getBook = async (id) => {
    const book = await bookService.findBookById(id);
    return book;
};

// get a book by review_id
const getBookByReview = async (id) => {
    const book = await bookService.findBookById(id);
    return book;
};

const checkOwnership = async ({ id, userId }) => {
    const review = await findReviewById(id);
    if (!review) {
        throw "Review not found";
    }

    if (review.userId === userId) {
        return true;
    }
    return false;
};
module.exports = {
    create,
    removeItem,
    updateProperties,
    findReviewById,
    findAll,
    count,
    findByUserId,
    findByBookId,
    getBook,
    getBookByReview,
    checkOwnership,
};
