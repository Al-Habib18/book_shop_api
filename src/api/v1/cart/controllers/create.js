/** @format */
const cartService = require("../../../../lib/cart");
const bookService = require("../../../../lib/book");

const create = async (req, res, next) => {
    const bookArray = req.body;
    try {
        const books = [];
        let amount = 0;

        for (let bookId of bookArray) {
            const book = await bookService.bookObj(bookId);
            books.push(book);
            amount += book.price;
        }

        const quantity = bookArray.length;

        const cart = await cartService.create({ bookArray, quantity, amount });

        const data = {
            id: cart.id,
            books,
            quantity,
            amount,
        };

        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
};

module.exports = create;
