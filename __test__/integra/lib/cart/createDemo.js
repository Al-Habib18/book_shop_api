/** @format */

const cartService = require("../../../../src/lib/cart");
const { createBook } = require("../book/createDemo");

const userId = "65084ca04f2fe61598c8b7b9";
let bookArray = [];
const quantity = 2;
const amount = 1200;
const createCart = async () => {
    const book = await createBook();
    bookArray.push(book);
    const cart = await cartService.create({
        userId,
        bookArray,
        quantity,
        amount,
    });
    await cart.save();
    return cart;
};

module.exports = { createCart };
