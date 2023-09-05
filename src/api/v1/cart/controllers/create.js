/** @format */
const cartService = require("../../../../lib/cart");

const create = async (req, res, next) => {
    const bookArray = req.body;
    const userId = req.user.id;
    try {
        const booksObj = await cartService.getBooks({ bookArray });
        const quantity = booksObj.length;
        let amount = 0;
        for (let book of booksObj) {
            amount += book.price;
        }
        const cart = await cartService.create({
            bookArray,
            userId,
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
                cart: `/api/v1/carts/${cart.id}`,
            },
        };
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

module.exports = create;
