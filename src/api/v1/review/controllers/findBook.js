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

        let totalRatting = 0;
        const reviewArray = await reviewService.findByBookId(book.id, {
            page: 1,
            limit: 0,
        });
        for (const review of reviewArray) {
            totalRatting += review.ratting;
        }

        const ratting = totalRatting / reviewArray.length;

        const links = {
            user: `api/v1/reviews/${id}/user `,
        };

        const data = {
            ...book._doc,
            ratting,
        };
        const response = {
            data: data,
            ratting,
            links,
        };

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findBook;
