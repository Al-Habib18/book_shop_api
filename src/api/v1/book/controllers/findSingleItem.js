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

        const links = {
            self: `/api/v1/books/${book.id}`,
            reviews: `/api/v1/books/${book.id}/reviews`,
            photos: `/api/v1/books/${book.id}/photos`,
        };
        const response = {
            data: book,
            links,
        };
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = findSingleItem;
