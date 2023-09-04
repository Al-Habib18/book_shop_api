/** @format */

const bookService = require("../../../../lib/book");

const deleteItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        await bookService.removeItem(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

module.exports = deleteItem;
