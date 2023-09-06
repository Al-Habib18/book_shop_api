/** @format */

/** @format */

const { badRequest } = require("../../utils/error");
const mongoose = require("mongoose");

const cartValidator = (req, _res, next) => {
    const bookArr = req.body;
    try {
        if (bookArr) {
            for (const bookId of bookArr) {
                if (!mongoose.Types.ObjectId.isValid(bookId)) {
                    next(badRequest("Invalid cart ID"));
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
