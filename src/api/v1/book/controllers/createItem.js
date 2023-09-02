/** @format */
const bookService = require("../../../../lib/book");

const createItem = async (req, res, next) => {
    const { title, author, publisher, category, summary, price } = req.body;
    try {
        const userId = req.user.id;
        const book = await bookService.create({
            title,
            author,
            userId,
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

        res.status(201).json(response);
    } catch (e) {
        next(e);
    }
};

module.exports = createItem;
