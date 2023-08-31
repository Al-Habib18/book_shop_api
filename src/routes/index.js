/** @format */
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");

router.use("/api/v1/users", userRoutes);
router.use("/api/v1/books", bookRoutes);

module.exports = router;
