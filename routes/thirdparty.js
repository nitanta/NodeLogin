var express = require("express");
var router = express.Router();


var thirdperty_controller = require("../controllers/thirdparty");

router.get("/test", thirdperty_controller.test);

router.post("/getWheather", thirdperty_controller.getWheather);

module.exports = router;
