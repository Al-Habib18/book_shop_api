/** @format */

const mongoose = require("mongoose");
const { badRequest } = require("../../utils/error");

const reviewValidator = (req, res, next) => {
    const { ratting, summary, bookId } = req.body;
    let { id } = req.params;
    try {
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                next(badRequest("Invalid review ID in parameter"));
            }
        }
        if (bookId) {
            if (!mongoose.Types.ObjectId.isValid(bookId)) {
                next(badRequest("Invalid book ID in request body"));
            }
        }
        if (ratting) {
            const validRatting = /^[0-5]+$/.test(ratting);
            if (!validRatting) {
                next(badRequest("ratting  must be in range [0,5]"));
            }
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
