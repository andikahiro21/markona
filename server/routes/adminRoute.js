const express = require("express");
const router = express.Router();

const { authenticateAdmin } = require("../middleware/authenticateAdmin");
const { disabledMenu, reactivatedMenu, serveMenu } = require("../controllers/adminController");
const upload = require("../helpers/storage");

router.use(authenticateAdmin);
router.post("/disable-menu/:id", disabledMenu);
router.post("/enable-menu/:id", reactivatedMenu);
router.post("/serve", upload.array(), serveMenu);

module.exports = router;
