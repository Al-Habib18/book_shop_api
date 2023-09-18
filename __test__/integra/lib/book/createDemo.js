/** @format */

const bookService = require("../../../../src/lib/book");
const title = "Clear Architecture";
const userId = "6506fa9a15f02938d7fce87a";
const author = ["Robert C.Martin"];
const publisher = "pearson";
const category = "science";
const summary = "A creaftsman's guide to software structure and design";
const price = 1200;

const createBook = async () => {
    const book = await bookService.create({
        title,
        userId,
        author,
        publisher,
        category,
        price,
    });
    await book.save();
    return book;
};

module.exports = { createBook };
