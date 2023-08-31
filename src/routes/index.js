/** @format */
const router = require("express").Router();
const userRoutes = require("./userRoutes");

router.use("/api/v1/users", userRoutes);

module.exports = router;
