/** @format */

const router = require("express").Router();
const { userControllers } = require("../api/v1/user");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { userValidator, ownership } = require("../middleware/user");

router.get(
    "/:id/books",
    authenticate,
    authorize(["admin", "seller"]),
    ownership("User"),
    userControllers.allBooks
);
router.get(
    "/:id/orders",
    authenticate,
    authorize(["admin", "seller", "customer"]),
    ownership("User"),
    userControllers.allOrders
);
router.get(
    "/:id/reviews",
    authenticate,
    authorize(["admin"]),
    userControllers.allReviews
);

router.patch(
    "/:id/password",
    authenticate,
    authorize(["admin", "seller", "customer"]),
    userValidator,
    ownership("User"),
    userControllers.changePassword
);

router
    .route("/:id")
    .get(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        ownership("User"),
        userControllers.findSingleItem
    )
    .patch(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        userValidator,
        ownership("User"),
        userControllers.updateItem
    )
    .delete(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        ownership("User"),
        userControllers.deleteItem
    );

router
    .route("/")
    .get(authenticate, authorize(["admin"]), userControllers.findAllItems)
    .post(
        authenticate,
        authorize(["admin"]),
        userValidator,
        userControllers.createItem
    );

module.exports = router;
