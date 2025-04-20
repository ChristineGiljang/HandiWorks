const express = require("express");
const router = express.Router();
const { googleSignIn, emailSignUp } = require("../controllers/userController");

router.post("/google", googleSignIn); // For Google login/signup
router.post("/email", emailSignUp);

module.exports = router;
