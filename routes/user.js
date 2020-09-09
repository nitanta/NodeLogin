var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var user_controller = require("../controllers/user");
var passport = require("../middleware/passport");

// a simple test url to check that all of our files are communicating correctly.

router.get("/test", user_controller.test);

router.get("/getall", passport.verifyToken, user_controller.getall);

router.post("/getallpaged", passport.verifyToken, user_controller.getallpaged);

router.post("/create", user_controller.user_create);

router.post("/login", user_controller.user_login);

router.post("/token", user_controller.user_refresh_token);

router.put("/:id/update", user_controller.user_update);

router.delete("/:id/delete", user_controller.user_delete);

router.get("/:id", user_controller.user_details);

module.exports = router;
