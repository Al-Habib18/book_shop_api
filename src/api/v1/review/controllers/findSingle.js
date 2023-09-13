/** @format */
const reviewService = require("../../../../lib/review");
const bookService = require("../../../../lib/book");
const userService = require("../../../../lib/user");

const { notFound } = require("../../../../utils/error");

const findSingle = async (req, res, next) => {
    const { id } = req.params;
    try {
        const review = await reviewService.findReviewById(id);
        if (!review) {
            throw notFound();
        }

        const userObj = await userService.findUserById(review.userId);

        const bookObj = await bookService.findBookById(review.bookId);
        const data = {
            ...review._doc,
            book: bookObj.title,
            user: userObj.name,
        };
        const links = {
            book: `/api/v1/books/${review.bookId}`,
            user: `/api/v1/users/${review.userId}`,
        };
        const response = {
            data,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingle;
