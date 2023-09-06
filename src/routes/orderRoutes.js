/** @format */

const router = require("express").Router();
const { orderControllers } = require("../api/v1/order");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const orderValidator = require("../middleware/order");
router.get(
    "/:id/cart",
    authenticate,
    authorize(["admin", "seller", "customer"]),
    orderControllers.findCart
);
router.get(
    "/:id/user",
    authenticate,
    authorize(["admin"]),
    orderControllers.findUser
);
router.patch(
    "/:id/order-status",
    authenticate,
    authorize(["admin"]),
    orderControllers.orderStatus
);

router
    .route("/:id")
    .get(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        orderControllers.findSingle
    )
    .patch(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        orderValidator,
        orderControllers.update
    )
    .delete(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        orderControllers.remove
    );

router
    .route("/")
    .get(authenticate, authorize(["admin"]), orderControllers.findAll)
    .post(
        authenticate,
        authorize(["admin", "seller", "customer"]),
        orderValidator,
        orderControllers.create
    );

module.exports = router;
