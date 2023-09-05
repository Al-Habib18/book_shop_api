/** @format */

const router = require("express").Router();
const { userControllers } = require("../api/v1/user");
const authenticate = require("../middleware/authenticate");
const userValidator = require("../middleware/user");

router.get("/:id/books", authenticate, userControllers.allBooks);
router.get("/:id/orders", authenticate, userControllers.allOrders);
router.get("/:id/reviews", authenticate, userControllers.allReviews);

router.patch(
    "/:id/password",
    authenticate,
    userValidator,
    userControllers.changePassword
);

router
    .route("/:id")
    .get(authenticate, userControllers.findSingleItem)
    .patch(authenticate, userValidator, userControllers.updateItem)
    .delete(authenticate, userControllers.deleteItem);

router
    .route("/")
    .get(authenticate, userControllers.findAllItems)
    .post(authenticate, userValidator, userControllers.createItem);

module.exports = router;
