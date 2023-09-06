/** @format */

const router = require("express").Router();
const { bookControllers } = require("../api/v1/book");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { bookValidator } = require("../middleware/book");

router.get("/:id/reviews", bookControllers.findReviews);

router
    .route("/:id")
    .get(bookControllers.findSingleItem)
    .patch(
        authenticate,
        authorize(["admin", "seller"]),
        bookValidator,
        bookControllers.updateItem
    )
    .delete(
        authenticate,
        authorize(["admin", "seller"]),
        bookControllers.deleteItem
    );

router
    .route("/")
    .get(bookControllers.findAllItems)
    .post(
        authenticate,
        authorize(["admin", "seller"]),
        bookValidator,
        bookControllers.createItem
    );

module.exports = router;
