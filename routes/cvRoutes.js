const express = require("express");
const cvController = require("../controllers/cvController");
const router = express.Router();

router.route("/").post(cvController.processCV);

module.exports = router;