/** @format */

const mongoose = require("mongoose");
const { badRequest } = require("../../utils/error");

const reviewValidator = (req, res, next) => {
    const { ratting, summary } = req.body;
    const bookId = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            next(badRequest("Invalid book ID"));
        }
        if (ratting) {
            if (ratting < 0) next(badRequest("ratings must be in range [0,5]"));
            if (ratting > 5) next(badRequest("ratings must be in range [0,5]"));
        }
        if (summary) {
            if (summary.length < 3)
                next(badRequest("summary must be at least 3 characters"));

            if (summary.length > 200) next(badRequest("summary is too long"));
        }
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = reviewValidator;
