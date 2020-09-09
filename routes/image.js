var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var image_controller = require("../controllers/image");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", image_controller.test);

router.post("/uploadImage", image_controller.upload_image);

module.exports = router;
