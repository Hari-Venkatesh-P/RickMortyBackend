const router = require("express").Router();
const UserService = require("../service/UserService");

router.post("/login", UserService.loginUser);
router.post("/create", UserService.createNewUser);

module.exports = router;
