var Product = require("../models/product");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send(response.sendresponse(true, null, "Welocome to product controller.", null));
};

//Create a new product
exports.product_create = function(req, res) {
  var product = new Product({
    name: req.body.name,
    price: req.body.price
  });

  product.save(function(err) {
    if (err) {
      res.send(response.sendresponse(false, null, err, null));
      return;
    } else {
      res.send(response.sendresponse(true, null, "Product Created successfully", null));
    }
  });
};

exports.product_details = function(req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      res.send(response.sendresponse(false, null, err, null));
      return;
    }
    res.send(response.sendresponse(true, null, "Product Created successfully", product));
  });
};

exports.product_update = function(req, res) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    product
  ) {
    if (err) {
      res.send(response.sendresponse(false, null, err, null));
      return;
    }
    res.send(response.sendresponse(true, null, "Product updated successfully", product));
  });
};

exports.product_delete = function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send(response.sendresponse(false, null, err, product));
      return;
    }
    res.send(response.sendresponse(true, null, "Product deleted successfully", null));
  });
};
