/** @format */

const router = require("express").Router();
const { reviewControllers } = require("../api/v1/review");
const authenticate = require("../middleware/authenticate");
const { reviewValidator, ownership } = require("../middleware/review");
const authorize = require("../middleware/authorize");

router.get(
    "/:id/book",
    authenticate,
    authorize(["admin"]),
    reviewValidator,
    reviewControllers.findBook
);
router.get(
    "/:id/user",
    authenticate,
    authorize(["admin"]),
    reviewValidator,
    reviewControllers.findUser
);

router
    .route("/:id")
    .get(reviewValidator, reviewControllers.findSingle)
    .patch(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        reviewValidator,
        ownership("Review"),
        reviewControllers.update
    )
    .delete(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        reviewValidator,
        ownership("Review"),
        reviewControllers.remove
    );

router
    .route("/")
    .get(authenticate, authorize(["admin"]), reviewControllers.findAllItem)
    .post(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        reviewValidator,
        ownership("Book"),
        reviewControllers.create
    );

module.exports = router;
