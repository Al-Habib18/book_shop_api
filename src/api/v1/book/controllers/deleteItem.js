/** @format */

const bookService = require("../../../../lib/book");
const { notFound } = require("../../../../utils/error");

const deleteItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        //TODO: asynchronously delete all reviews
        await bookService.removeItem(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = deleteItem;
