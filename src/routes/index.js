/** @format */
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
const reviewRoutes = require("./reviewRoutes");
const cartRoutes = require("./cartRoutes");

router.use("/api/v1/users", userRoutes);
router.use("/api/v1/books", bookRoutes);
router.use("/api/v1/reviews", reviewRoutes);
router.use("/api/v1/carts", cartRoutes);

module.exports = router;
