/** @format */

const router = require("express").Router();
const { userControllers } = require("../api/v1/user");
const authenticate = require("../middleware/authenticate");

router.get("/:id/books", authenticate, userControllers.allBooks);
router.get("/:id/orders", authenticate, userControllers.allOrders);
router.get("/:id/reviews", authenticate, userControllers.allReviews);

router
    .route("/:id")
    .get(authenticate, userControllers.findSingleItem)
    .patch(authenticate, userControllers.updateItem)
    .delete(authenticate, userControllers.deleteItem);

router
    .route("/")
    .get(authenticate, userControllers.findAllItems)
    .post(authenticate, userControllers.createItem);

module.exports = router;
