/** @format */

const router = require("express").Router();
const { userControllers } = require("../api/v1/user");

router
    .route("/:id")
    .get(userControllers.findSingleItem)
    .patch(userControllers.updateItem)
    .delete(userControllers.deleteItem);

router
    .route("/")
    .get(userControllers.findAllItems)
    .post(userControllers.createItem);

module.exports = router;
