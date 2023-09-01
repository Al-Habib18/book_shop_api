/** @format */
const bookService = require("../../../../lib/book");
const reviewService = require("../../../../lib/review");
const { notFound } = require("../../../../utils/error");

const findBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        const review = await reviewService.findReviewById(id);
        if (!review) {
            throw notFound();
        }
        const book = await bookService.findBookById(review.bookId);
        if (!book) {
            throw notFound();
        }

        const links = {
            user: `api/v1/reviews/${id}/user `,
        };

        const response = {
            data: book,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findBook;
