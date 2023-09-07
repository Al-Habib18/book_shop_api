/** @format */

const router = require("express").Router();
const { authControllers } = require("../api/v1/auth");
const { validator } = require("../middleware/auth");

router.post("/login", validator, authControllers.login);
router.post("/register", validator, authControllers.register);
router.post("/refresh", authControllers.refresh);
router.get("/logout", /* authenticate */ authControllers.logout);

module.exports = router;
