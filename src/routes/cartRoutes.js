/** @format */

const router = require("express").Router();
const { cartControllers } = require("../api/v1/cart");
const authenticate = require("../middleware/authenticate");

router
    .route("/:id")
    .get(authenticate, cartControllers.findSingle)
    .patch(authenticate, cartControllers.update)
    .delete(authenticate, cartControllers.remove);

router
    .route("/")
    .get(authenticate, cartControllers.findAll)
    .post(authenticate, cartControllers.create);

module.exports = router;
