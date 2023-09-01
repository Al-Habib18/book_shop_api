/** @format */
const reviewService = require("../../../../lib/review");
const bookService = require("../../../../lib/book");

const update = async (req, res, next) => {
    const { id } = req.params;
    const { ratting, summary } = req.body;
    try {
        const review = await reviewService.updateProperties(id, {
            ratting,
            summary,
        });
        const bookObj = await bookService.findBookById(review.bookId);

        const response = {
            book: bookObj.title,
            ...review._doc,
        };

        res.status(200).json({ data: response });
    } catch (err) {
        next(err);
    }
};

module.exports = update;
