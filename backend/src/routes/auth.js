const router = require("express").Router();
const { createUser, loginUser } = require("../controllers/auth");
const validatePwd = require("../middlewares/validatePwd");

// create user
router.post("/api/auth/register", createUser, loginUser);

// login user
router.post("/api/auth/login", validatePwd, loginUser);

module.exports = router;
