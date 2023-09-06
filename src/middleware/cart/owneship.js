/** @format */

const { authorizationError, notFound } = require("../../utils/error");
const cartService = require("../../lib/cart");

const ownership =
    (model = "") =>
    async (req, _res, next) => {
        if (model === "Cart") {
            const { id } = req.params;
            const { cartId } = req.body;
            const userId = req.user.id;

            try {
                const isOwner = await cartService.checkOwnership({
                    id: cartId ?? id,
                    userId,
                });

                if (isOwner) {
                    next();
                } else {
                    next(
                        authorizationError(
                            "You cannot create a  order by other cart"
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

module.exports = ownership;
