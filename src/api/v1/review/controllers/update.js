/** @format */
const reviewService = require("../../../../lib/review");

const update = async (req, res, next) => {
    const { id } = req.params;
    const { ratting, summary } = req.body;
    try {
        const review = await reviewService.updateProperties(id, {
            ratting,
            summary,
        });

        const book = await reviewService.getBookByReview(review.bookId);

        const response = {
            book: book.title,
            ...review._doc,
        };

        res.status(200).json({ data: response });
    } catch (err) {
        next(err);
    }
};

module.exports = update;
