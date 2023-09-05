/** @format */

const router = require("express").Router();
const { reviewControllers } = require("../api/v1/review");
const authenticate = require("../middleware/authenticate");
const reviewValidator = require("../middleware/review");

router.get("/:id/book", authenticate, reviewControllers.findBook);
router.get("/:id/user", authenticate, reviewControllers.findUser);

router
    .route("/:id")
    .get(authenticate, reviewControllers.findSingle)
    .patch(authenticate, reviewValidator, reviewControllers.update)
    .delete(authenticate, reviewControllers.remove);

router
    .route("/")
    .get(authenticate, reviewControllers.findAllItem)
    .post(authenticate, reviewValidator, reviewControllers.create);

module.exports = router;
