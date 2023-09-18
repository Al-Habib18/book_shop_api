/** @format */
const Review = require("../../model/Review");
const bookService = require("../book");
const { notFound, badRequest } = require("../../utils/error");

/** - create a new review
 * @param {string} userId - requested user id
 * @param {string} bookId - for which book is being reviewed
 * @param {number} ratting - ratting of the book
 * @param {string} summary - summary of the review
 * @return {Promise} Promise of review of object
 */
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

/** - count reviews
 * @param {string} search - search term
 * @return {number} number of reviews counted by search
 */
const count = ({ search = "" }) => {
    const filter = {
        summary: { $regex: search, $options: "i" },
    };

    return Review.count(filter);
};

/** - find all reviews
 * @param {string} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} reviews  - array of reviews
 */
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

/** - find a single review
 * @param {string} id - id of a review
 * @return {Promise} promise a review
 */
const findReviewById = async (id) => {
    if (!id) {
        throw badRequest("id is required");
    }
    return Review.findById(id);
};

/** -  update a review
 * @param {string} id - review id
 * @param {number} ratting - ratting of the book
 * @param {string} summary - summary of the review
 * @return {object} object of review
 */
const updateProperties = async (id, { ratting, summary }) => {
    const review = await Review.findById(id);

    if (!review) {
        throw notFound("review not found");
    }

    const payload = { ratting, summary };

    Object.keys(payload).forEach(
        (key) => (review[key] = payload[key] ?? review[key])
    );

    await review.save();
    return review;
};
//
/** - delete a review
 * @param {string} id - review id
 * @return {promise}  - promise of review
 */
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

/** - find all reviews for given user
 * @param {string} id - id of a user
 * @param {string} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} reviews  - array of reviews
 */
const findByUserId = async (
    id,
    { page = 1, limit = 10, sortType = "desc", sortBy = "updatedAt" }
) => {
    if (!id ?? !page ?? !limit) {
        throw badRequest();
    }
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;
    const reviews = await Review.find({ userId: id })
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return reviews;
};

/** - find all reviews for given book
 * @param {string} id - id of a book
 * @param {string} page - current page number,
 * @param {number} limit- limit of result
 * @param {enum} sortType - sort type of result
 * @param {enum} sortBy - sort by of result
 * @return {Array} reviews  - array of reviews
 */
const findByBookId = async (
    id,
    { page = 1, limit = 10, sortType = "desc", sortBy = "updatedAt" }
) => {
    if (!id ?? !page ?? !limit) {
        throw badRequest();
    }
    const sortString = `${sortType === "desc" ? "-" : ""}${sortBy}`;

    const reviews = await Review.find({ bookId: id })
        .sort(sortString)
        .skip(page * limit - limit)
        .limit(limit);

    return reviews;
};

/** get a book by book id
 * @param {string} id - book id
 * @return {object} book - book object
 */
const getBook = async (id) => {
    const book = await bookService.findBookById(id);
    return book;
};

/** get a book by review_id
 * @param {string} id - review id
 * @return {object} book - book object
 */
const getBookByReview = async (id) => {
    const book = await bookService.findBookById(id);
    return book;
};

/** check owner ship of a review
 * @param {string} id - review id
 * @param {string} userId - requested user id
 * @return {boolean} -
 */
const checkOwnership = async ({ id, userId }) => {
    const review = await findReviewById(id);
    if (!review) {
        throw badRequest("Requested review does not exist");
    }
    const reviewer = review.userId.toString();

    if (reviewer === userId) {
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
