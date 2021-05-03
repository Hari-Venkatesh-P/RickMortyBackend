const router = require("express").Router();
const CartoonService = require("../service/CartoonService");
const MiddlewareService = require("../service/MiddlewareServices");

router.get("/:pageNo" ,CartoonService.fetchCartoons);
router.delete("/:userId/:cartoonId",MiddlewareService.isTokenPresent, CartoonService.removeCartoon);
router.post("/",MiddlewareService.isTokenPresent, CartoonService.addCartoon);
router.get("/user/:userId",MiddlewareService.isTokenPresent, CartoonService.getCartoonByUserId);



module.exports = router;