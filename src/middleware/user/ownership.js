/** @format */

const { authorizationError, notFound } = require("../../utils/error");
const userService = require("../../lib/user");

const ownership =
    (model = "") =>
    async (req, _res, next) => {
        if (model === "User") {
            const { id } = req.params;
            const userId = req.user.id;

            try {
                const isOwner = await userService.checkOwnership({
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
                            "You cannot access other information"
                        )
                    );
                }
            } catch (err) {
                next(err);
            }
        } else {
            next(notFound("Ownershpip validation failed"));
        }
    };

module.exports = ownership;
