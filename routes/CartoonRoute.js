const router = require("express").Router();
const CartoonService = require("../service/CartoonService");

router.get("/:pageNo", CartoonService.fetchCartoons);
router.delete("/:userId/:cartoonId", CartoonService.removeCartoon);
router.post("/", CartoonService.addCartoon);


module.exports = router;
