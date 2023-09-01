/** @format */

const router = require("express").Router();
const { reviewControllers } = require("../api/v1/review");

router
    .route("/:id")
    .get(reviewControllers.findSingle)
    .patch(reviewControllers.update)
    .delete(reviewControllers.remove);

router
    .route("/")
    .get(reviewControllers.findAllItem)
    .post(reviewControllers.create);

module.exports = router;
