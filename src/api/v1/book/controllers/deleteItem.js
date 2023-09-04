/** @format */

const bookService = require("../../../../lib/book");
const reviewService = require("../../../../lib/review");
const { notFound } = require("../../../../utils/error");

const deleteItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        let reviews = await reviewService.findByBookId(id);

        for (const review of reviews) {
            await reviewService.removeItem(review.id);
            console.log("i ma here");
        }
        await bookService.removeItem(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = deleteItem;
