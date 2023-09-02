/** @format */

const router = require("express").Router();
const { authControllers } = require("../api/v1/auth");
const { registerValidator, loginValidator } = require("../middleware/auth");

router.post("/login", loginValidator, authControllers.login);
router.post("/register", registerValidator, authControllers.register);

module.exports = router;
