/** @format */

const router = require("express").Router();
const { cartControllers } = require("../api/v1/cart");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { cartValidator, ownership } = require("../middleware/cart");

router
    .route("/:id")
    .get(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        ownership("Cart"),
        cartControllers.findSingle
    )
    .patch(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        cartValidator,
        ownership("Cart"),
        cartControllers.update
    )
    .delete(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        ownership("Cart"),
        cartControllers.remove
    );

router
    .route("/")
    .get(authenticate, authorize(["admin"]), cartControllers.findAll)
    .post(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        cartValidator,
        cartControllers.create
    );

module.exports = router;
