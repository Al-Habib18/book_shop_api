/** @format */

const router = require("express").Router();
const { bookControllers } = require("../api/v1/book");
const authenticate = require("../middleware/authenticate");

router.get("/:id/reviews", authenticate, bookControllers.findReviews);

router
    .route("/:id")
    .get(authenticate, bookControllers.findSingleItem)
    .patch(authenticate, bookControllers.updateItem)
    .delete(authenticate, bookControllers.deleteItem);

router
    .route("/")
    .get(bookControllers.findAllItems)
    .post(authenticate, bookControllers.createItem);

module.exports = router;
