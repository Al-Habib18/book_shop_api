/** @format */

const router = require("express").Router();
const { orderControllers } = require("../api/v1/order");

router
    .route("/:id")
    .get(orderControllers.findSingle)
    .patch(orderControllers.update)
    .delete(orderControllers.remove);

router.route("/").get(orderControllers.findAll).post(orderControllers.create);

module.exports = router;
