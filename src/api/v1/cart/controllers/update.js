/** @format */
const cartService = require("../../../../lib/cart");

const { badRequest, notFound } = require("../../../../utils/error");

const update = async (req, res, next) => {
    const { id } = req.params;
    const { bookArray } = req.body;

    try {
        const booksObj = await cartService.getBooks({ bookArray });
        const quantity = booksObj.length;

        let amount = 0;
        for (let book of booksObj) {
            amount += book.price;
        }

        const cart = await cartService.updateProperties(id, {
            bookArray,
            quantity,
            amount,
        });

        const data = {
            id: cart.id,
            books: booksObj,
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
