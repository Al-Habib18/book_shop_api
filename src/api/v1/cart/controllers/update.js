/** @format */
const cartSercice = require("../../../../lib/cart");
const bookService = require("../../../../lib/book");
const { badRequest, notFound } = require("../../../../utils/error");

const update = async (req, res, next) => {
    const { id } = req.params;
    const bookArray = req.body;

    try {
        const books = [];
        let amount = 0;

        for (let bookId of bookArray) {
            const book = await bookService.bookObj(bookId);
            if (!book) {
                throw badRequest(`this id (${bookId}) dosen't exist`);
            }
            books.push(book);
            amount += book.price;
        }

        const quantity = books.length;

        const cart = await cartSercice.updateProperties(id, {
            bookArray,
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
                self: "/api/v1/cart/:id",
            },
        };

        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
};

module.exports = update;
