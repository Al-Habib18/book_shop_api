/** @format */
const bookService = require("../../../../lib/book");

const updateItem = async (req, res, next) => {
    const { id } = req.params;
    const { title, author, publisher, category, summary, price } = req.body;
    try {
        const book = await bookService.updateProperties(id, {
            title,
            author,
            publisher,
            category,
            summary,
            price,
        });
        const links = {
            self: `/api/v1/books/${book.id}`,
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

module.exports = updateItem;
