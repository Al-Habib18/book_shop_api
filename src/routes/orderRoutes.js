/** @format */

const router = require("express").Router();
const { orderControllers } = require("../api/v1/order");
const authenticate = require("../middleware/authenticate");

router.get("/:id/cart", authenticate, orderControllers.findCart);
router.get("/:id/user", authenticate, orderControllers.findUser);
router.patch("/:id/order-status", authenticate, orderControllers.orderStatus);

router
    .route("/:id")
    .get(authenticate, orderControllers.findSingle)
    .patch(authenticate, orderControllers.update)
    .delete(authenticate, orderControllers.remove);

router
    .route("/")
    .get(authenticate, orderControllers.findAll)
    .post(authenticate, orderControllers.create);

module.exports = router;
