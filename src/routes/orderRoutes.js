/** @format */

const router = require("express").Router();
const { orderControllers } = require("../api/v1/order");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const { orderValidator, ownership } = require("../middleware/order");
router.get(
    "/:id/cart",
    authenticate,
    authorize(["admin", "seller", "customer"]),
    orderValidator,
    ownership("Order"),
    orderControllers.findCart
);
router.get(
    "/:id/user",
    authenticate,
    authorize(["admin"]),
    orderValidator,
    orderControllers.findUser
);
router.patch(
    "/:id/cancel",
    authenticate,
    authorize(["admin", "seller", "customer"]),
    orderValidator,
    orderControllers.cancleOrder
);

router
    .route("/:id")
    .get(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        orderValidator,
        orderControllers.findSingle
    )
    .patch(
        authenticate,
        authorize(["admin"]),
        orderValidator,
        ownership("Order"),
        orderControllers.update
    )
    .delete(
        authenticate,
        authorize(["admin"]),
        orderValidator,
        ownership("Order"),
        orderControllers.remove
    );

router
    .route("/")
    .get(authenticate, authorize(["admin"]), orderControllers.findAll)
    .post(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        orderValidator,
        ownership("Cart"),
        orderControllers.create
    );

module.exports = router;
