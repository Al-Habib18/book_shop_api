/** @format */

const bookService = require("../../../../lib/book");
const reviewService = require("../../../../lib/review");

const deleteItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        let reviews = await reviewService.findByBookId(id, {
            page: 1,
            limit: 0,
        });

        // asyncronously delete all reviews of a book
        for (const review of reviews) {
            await reviewService.removeItem(review.id);
        }
        await bookService.removeItem(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = deleteItem;
