/** @format */
const bookService = require("../../lib/book");
const ownerShip =
    (model = "") =>
    async (req, _res, next) => {
        if (model === "Book") {
            const { id } = req.params;
            const userId = req.user.id;

            try {
                const isOwner = await bookService.checkOwnership({
                    bookId: id,
                    userId,
                });

                if (isOwner) {
                    next();
                } else {
                    next(
                        authorizationError(
                            "You cannot update or delete  other book"
                        )
                    );
                }
            } catch (err) {
                next(err);
            }
        } else {
            next(notFound("Ownership validation failed"));
        }
    };
module.exports = ownerShip;
