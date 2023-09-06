/** @format */

const { authorizationError, notFound } = require("../../utils/error");
const cartService = require("../../lib/cart");
const orderService = require("../../lib/order");

const ownership =
    (model = "") =>
    async (req, _res, next) => {
        if (model === "Cart") {
            const { cartId } = req.body;
            const userId = req.user.id;

            try {
                const isOwner = await cartService.checkOwnership({
                    id: cartId,
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
        } else if (model === "Order") {
            const { id } = req.params;
            const userId = req.user.id;
            try {
                const isOwner = await orderService.checkOwnership({
                    id,
                    userId,
                });

                if (isOwner) {
                    next();
                } else if (req.user.role === "admin") {
                    next();
                } else {
                    next(authorizationError("You cannot update other order"));
                }
            } catch (err) {
                next(err);
            }
        } else {
            next(notFound("Ownership validation failed"));
        }
    };

module.exports = ownership;
