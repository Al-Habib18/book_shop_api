/** @format */

const { authorizationError, notFound } = require("../../utils/error");
const bookService = require("../../lib/book");
const reviewService = require("../../lib/review");

const ownership =
    (model = "") =>
    async (req, _res, next) => {
        if (model === "Book") {
            const { bookId } = req.body;
            const userId = req.user.id;

            try {
                const isOwner = await bookService.checkOwnership({
                    bookId,
                    userId,
                });

                if (isOwner) {
                    next(
                        authorizationError(
                            "You cannot create a review in your book"
                        )
                    );
                } else {
                    next();
                }
            } catch (err) {
                next(err);
            }
        }
        if (model === "Review") {
            const { id } = req.params;
            const userId = req.user.id;
            try {
                const isOwner = await reviewService.checkOwnership({
                    id,
                    userId,
                });

                if (isOwner) {
                    next();
                } else if (req.user.role === "admin") {
                    next();
                } else {
                    next(
                        authorizationError(
                            "You cannot create a review in your book"
                        )
                    );
                }
            } catch (err) {
                next(err);
            }
        }
        next(notFound("Ownershpip validation failed"));
    };

module.exports = ownership;
