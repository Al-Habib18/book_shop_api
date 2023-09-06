/** @format */

const { badRequest } = require("../../utils/error");

const bookValidator = (req, res, next) => {
    const { title, author, publisher, category, summary, price } = req.body;
    try {
        if (title) {
            if (title.length < 3)
                next(badRequest("title must be at least 3 characters"));
            if (title.length > 50)
                next(badRequest("title must be less than 50 characters"));
        }
        if (author) {
            if (author.length < 1)
                next(badRequest("A author must be at least to the book"));
            if (author.length > 10)
                next(badRequest("Number of authors must be less than 10 "));
        }
        if (publisher) {
            if (publisher.length < 3)
                next(badRequest("Publisher must be at least 3 characters"));
            if (publisher.length > 50)
                next(badRequest("Publisher must be less than 50 characters"));
        }
        if (category) {
            if (category.length < 3)
                next(badRequest("Category must be at least 3 characters"));
            if (category.length > 50)
                next(badRequest("Category must be less than 50 characters"));
        }
        if (summary) {
            if (summary.length < 10)
                next(badRequest("Summary must be at least 10 characters"));
            if (summary.length > 250)
                next(badRequest("Summary must be less than 250 characters"));
        }
        if (price) {
            if (price < 0)
                next(badRequest("Price must be in a positive value"));
        }

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = bookValidator;
