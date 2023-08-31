/** @format */

const router = require("express").Router();
const { bookControllers } = require("../api/v1/book");

router
    .route("/:id")
    .get(bookControllers.findSingleItem)
    .patch(bookControllers.updateItem)
    .delete(bookControllers.deleteItem);

router
    .route("/")
    .get(bookControllers.findAllItems)
    .post(bookControllers.createItem);

module.exports = router;
