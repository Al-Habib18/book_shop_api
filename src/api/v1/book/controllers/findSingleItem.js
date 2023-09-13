/** @format */
const bookService = require("../../../../lib/book");
const reviewService = require("../../../../lib/review");
const { notFound } = require("../../../../utils/error");

const findSingleItem = async (req, res, next) => {
    const { id } = req.params;

    try {
        const book = await bookService.findBookById(id);
        if (!book) {
            throw notFound();
        }

        let totalRatting = 0;
        const reviewArray = await reviewService.findByBookId(id, {
            page: 1,
            limit: 0,
        });

        for (const review of reviewArray) {
            totalRatting += review.ratting;
        }

        const ratting = totalRatting / reviewArray.length;

        const links = {
            self: `/api/v1/books/${book.id}`,
            reviews: `/api/v1/books/${book.id}/reviews`,
        };

        const data = {
            ...book._doc,
            ratting,
        };
        const response_1 = {
            data,
            ratting,
            links,
        };

        const response_2 = {
            data: book,
            links,
        };

        const response = ratting ? response_1 : response_2;

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingleItem;
