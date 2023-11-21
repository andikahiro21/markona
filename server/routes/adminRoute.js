const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middleware/authenticateAdmin");
const { disabledMenu, reactivatedMenu } = require("../controllers/adminController");

router.use(authenticateAdmin);
router.post("/disable-menu/:id", disabledMenu);
router.post("/enable-menu/:id", reactivatedMenu);

module.exports = router;
