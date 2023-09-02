/** @format */
const reviewService = require("../../../../lib/review");
const bookService = require("../../../../lib/book");

const create = async (req, res, next) => {
    const { bookId, ratting, summary } = req.body;
    // const userId = req.user.id;
    try {
        const review = await reviewService.create({
            //TODO: userId,
            bookId,
            ratting,
            summary,
        });
        const bookObj = await bookService.findBookById(bookId);

        const response = {
            book: bookObj.title,
            ...review._doc,
        };

        res.status(201).json({ data: response });
    } catch (err) {
        next(err);
    }
};

module.exports = create;
