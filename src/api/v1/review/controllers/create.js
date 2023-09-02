/** @format */
const reviewService = require("../../../../lib/review");
const bookService = require("../../../../lib/book");

const create = async (req, res, next) => {
    const { bookId, ratting, summary } = req.body;
    const userId = req.user.id;
    try {
        const review = await reviewService.create({
            userId,
            bookId,
            ratting,
            summary,
        });
        const bookObj = await bookService.findBookById(bookId);

        const data = {
            book: bookObj.title,
            ...review._doc,
        };
        const links = {
            book: `/api/v1/books/${bookId}`,
        };
        const response = { data, links };

        res.status(201).json({ data: response });
    } catch (err) {
        next(err);
    }
};

module.exports = create;
