/** @format */

const router = require("express").Router();
const { cartControllers } = require("../api/v1/cart");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

router
    .route("/:id")
    .get(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        cartControllers.findSingle
    )
    .patch(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        cartControllers.update
    )
    .delete(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        cartControllers.remove
    );

router
    .route("/")
    .get(authenticate, authorize(["admin"]), cartControllers.findAll)
    .post(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        cartControllers.create
    );

module.exports = router;
