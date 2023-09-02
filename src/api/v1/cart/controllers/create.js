/** @format */
const cartService = require("../../../../lib/cart");
const bookService = require("../../../../lib/book");
const { badRequest } = require("../../../../utils/error");

const create = async (req, res, next) => {
    const bookArray = req.body;
    const userId = req.user.id;
    try {
        const books = [];
        let amount = 0;

        for (let bookId of bookArray) {
            const book = await bookService.bookObj(bookId);
            if (!book) {
                throw badRequest("Please provide  valid book");
            }
            books.push(book);
            amount += book.price;
        }

        const quantity = bookArray.length;

        const cart = await cartService.create({
            bookArray,
            userId,
            quantity,
            amount,
        });

        const data = {
            id: cart.id,
            books,
            quantity,
            amount,
        };
        const response = {
            data,
            links: {
                cart: `/api/v1/carts/${cart.id}`,
            },
        };
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = create;
