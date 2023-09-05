/** @format */
const reviewService = require("../../../../lib/review");
const { notFound } = require("../../../../utils/error");

const create = async (req, res, next) => {
    const { bookId, ratting, summary } = req.body;
    const userId = req.user.id;
    try {
        const book = reviewService.getBook(bookId);
        if (!book) {
            throw notFound("Book not found");
        }
        const review = await reviewService.create({
            userId,
            bookId,
            ratting,
            summary,
        });

        const data = {
            book: book.title,
            ...review._doc,
        };
        const links = {
            book: `/api/v1/books/${bookId}`,
        };
        const response = { data, links };

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = create;
