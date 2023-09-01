/** @format */
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/api/v1/users", userRoutes);
router.use("/api/v1/books", bookRoutes);
router.use("/api/v1/reviews", reviewRoutes);

module.exports = router;
