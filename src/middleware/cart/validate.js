/** @format */

/** @format */

const { badRequest } = require("../../utils/error");
const mongoose = require("mongoose");

const cartValidator = (req, _res, next) => {
    const { bookArray } = req.body;
    const { id } = req.params;
    try {
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw badRequest("Invalid Cart ID in parameter");
            }
        }

        if (bookArray) {
            for (const bookId of bookArray) {
                if (!mongoose.Types.ObjectId.isValid(bookId)) {
                    next(badRequest("Invalid Book ID"));
                }
            }
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = cartValidator;
