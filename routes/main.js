const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const homeController = require('../controllers/home');

router.get('/', homeController.getIndex);
router.get("/flavors", homeController.getFlavors);
router.get("/addFlavor", homeController.getAddFlavor);
router.get("/editFlavor/:id", homeController.getEditFlavor);
router.post("/addFlavor", upload.single("file"), homeController.addFlavor);
router.put("/editFlavor/:id", upload.single("file"), homeController.editFlavor);
router.delete("/deleteFlavor/:id", homeController.deleteFlavor);

module.exports = router;