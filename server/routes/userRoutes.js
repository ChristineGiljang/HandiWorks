const express = require("express");
const router = express.Router();
const { saveUser } = require("../controllers/userController");

router.post("/google", saveUser);
router.post("/saveUser", saveUser);

module.exports = router;
