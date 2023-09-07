/** @format */

/** @format */

const { badRequest } = require("../../utils/error");
const mongoose = require("mongoose");

const cartValidator = (req, _res, next) => {
    const bookArr = req.body;
    const { id } = req.params;
    try {
        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw badRequest("Invalid Cart ID in parameter");
            }
        }
        if (bookArr) {
            for (const bookId of bookArr) {
                if (!mongoose.Types.ObjectId.isValid(bookId)) {
                    next(badRequest("Invalid Book ID"));
                }
            }
        } else {
            next(badRequest("Invalid cart Request"));
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = cartValidator;
