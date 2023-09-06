/** @format */

const router = require("express").Router();
const { reviewControllers } = require("../api/v1/review");
const authenticate = require("../middleware/authenticate");
const reviewValidator = require("../middleware/review");
const authorize = require("../middleware/authorize");

router.get(
    "/:id/book",
    authenticate,
    authorize(["admin"]),
    reviewControllers.findBook
);
router.get(
    "/:id/user",
    authenticate,
    authorize(["admin"]),
    reviewControllers.findUser
);

router
    .route("/:id")
    .get(reviewControllers.findSingle)
    .patch(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        reviewValidator,
        reviewControllers.update
    )
    .delete(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        reviewControllers.remove
    );

router
    .route("/")
    .get(authenticate, authorize(["admin"]), reviewControllers.findAllItem)
    .post(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        reviewValidator,
        reviewControllers.create
    );

module.exports = router;
