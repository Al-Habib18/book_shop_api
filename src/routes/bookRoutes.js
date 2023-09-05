/** @format */

const router = require("express").Router();
const { bookControllers } = require("../api/v1/book");
const authenticate = require("../middleware/authenticate");
const bookValidator = require("../middleware/book");

router.get("/:id/reviews", authenticate, bookControllers.findReviews);

router
    .route("/:id")
    .get(authenticate, bookControllers.findSingleItem)
    .patch(authenticate, bookValidator, bookControllers.updateItem)
    .delete(authenticate, bookControllers.deleteItem);

router
    .route("/")
    .get(bookControllers.findAllItems)
    .post(authenticate, bookValidator, bookControllers.createItem);

module.exports = router;
