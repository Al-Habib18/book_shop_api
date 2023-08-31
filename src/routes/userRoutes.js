/** @format */

const router = require("express").Router();
const { userControllers } = require("../api/v1/user");

router.get("/", userControllers.findAllItems);

router.post("/", userControllers.createItem);

module.exports = router;
