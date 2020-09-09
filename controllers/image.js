var Image = require("../models/image");
var responseBody = {
  success: null,
  error: null,
  message: null,
  payload: null
};

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  responseBody.success = true;
  responseBody.error = null;
  responseBody.message = "Welcome to Image controller";
  responseBody.payload = null;
  res.send(responseBody);
};

//Create a new product
exports.upload_image = function(req, res) {
  var image = new Product({
    userid: req.body.userId,
    filepath: req.body.price
  });

  product.save(function(err) {
    var responseBody = {
      success: null,
      error: null,
      message: null,
      payload: null
    };
    if (err) {
      responseBody.success = false;
      responseBody.error = null;
      responseBody.message = err;
      responseBody.payload = null;
      res.send(responseBody);
      return;
    } else {
      responseBody.success = true;
      responseBody.error = null;
      responseBody.message = "Product Created successfully";
      responseBody.payload = null;
      res.send(responseBody);
    }
  });
};
