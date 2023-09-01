/** @format */

const router = require("express").Router();
const { cartControllers } = require("../api/v1/cart");

router
    .route("/:id")
    .get(cartControllers.findSingle)
    .patch(cartControllers.update)
    .delete(cartControllers.remove);

router.route("/").get(cartControllers.findAll).post(cartControllers.create);

module.exports = router;
