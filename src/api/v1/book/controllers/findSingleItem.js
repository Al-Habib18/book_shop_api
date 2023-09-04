/** @format */
const bookService = require("../../../../lib/book");
const { notFound } = require("../../../../utils/error");

const findSingleItem = async (req, res, next) => {
    const { id } = req.params;

    try {
        const book = await bookService.findBookById(id);
        if (!book) {
            throw notFound();
        }

        const ratting = await bookService.getRatting(id);
        const isRatting = !!ratting;

        const links = {
            self: `/api/v1/books/${book.id}`,
            reviews: `/api/v1/books/${book.id}/reviews`,
            photos: `/api/v1/books/${book.id}/photos`,
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

        const response = isRatting ? response_1 : response_2;

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingleItem;
