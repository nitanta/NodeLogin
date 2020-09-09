var User = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require("../config/config");
var response = require("../responseHandler/response");



//creates an access token
function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.secret, {
    expiresIn: config.tokenLife // 86400 expires in 24 hours
  });
}


//creates refresh token
function createRefreshToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    config.refreshTokenSecret,
    { expiresIn: config.refreshTokenLife }
  );
}



//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send(
    response.sendresponse(true, null, "Welocome to user controller.", null)
  );
};




//Create a new user
exports.user_create = function(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.send(response.sendresponse(false, null, err, null));
      return;
    }

    if (user) {
      res.send(
        response.sendresponse(false, null, "The user already exists.", null)
      );
      return;
    }

    var user = new User({
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      displayname: req.body.middlename,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      location: req.body.location,
      mobilenumber: req.body.mobilenumber,
      refreshtoken: null
    });

    user.save(function(err, result) {
      if (err) {
        res.send(response.sendresponse(false, null, err, null));
        return;
      } else {
        res.send(
          response.sendresponse(true, null, "User Created successfully", result)
        );
      }
    });
  });
};




//Fetch all users
exports.getall = function(req, res) {
  User.find().exec(function(err, users) {
    if (err) {
      res.send(response.sendresponse(false, null, err, null));
      return;
    } else {
      User.count().exec(function(err, count) {
        if (err) {
          res.send(response.sendresponse(false, null, err, null));
          return;
        } else {
          res.send(response.sendresponse(true, null, err, users));
        }
      });
    }
  });
};




//Fetch users list with pagination
exports.getallpaged = function(req, res) {
  let documentCount = 0;
  var page = parseInt(req.body.page);
  var size = parseInt(req.body.size);
  var searchString = req.body.searchString;
  console.log(page);
  console.log(size);
  var pagination = {
    page: page,
    size: size,
    totalcount: 0,
    hasmore: false
  };
  User.count({}, function(err, count) {
    documentCount = count;
  });
  if (searchString === null && searchString === "") {
    let dbQuery = User.find()
    .skip(size * page)
    .limit(size)
  } else {
    let dbQuery = User.find({ email: searchString })
    .skip(size * page)
    .limit(size)
  }

  dbQuery.exec(function(err, users) {
      if (err) {
        res.send(response.sendresponse(false, null, err, null));
        return;
      } else {
        res.send(
          response.sendresponsePagination(
            true,
            null,
            err,
            users,
            page,
            size,
            documentCount,
            documentCount > size * page + size ? true : false,
            page > 0 ? true : false
          )
        );
      }
    });
};

//Fetch user details by id
exports.user_details = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.send(response.sendresponse(false, null, err, null));
      return;
    }
    res.send(
      response.sendresponse(
        true,
        null,
        "User details fetched successfully",
        user
      )
    );
  });
};




//Update user details by id
exports.user_update = function(req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    user
  ) {
    if (err) {
      res.send(response.sendresponse(false, null, err, null));
      return;
    }
    res.send(response.sendresponse(true, null, "", user));
  });
};

//Delete user by id
exports.user_delete = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.send(response.sendresponse(false, null, err, null));
      return;
    }
    res.send(
      response.sendresponse(true, null, "User deleted successfully", null)
    );
  });
};



//login user and send access token
exports.user_login = function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.send(
      response.sendresponse(
        false,
        null,
        "Please send the username and passowrd",
        null
      )
    );
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.send(response.sendresponse(false, null, err, null));
    }

    if (!user) {
      res.send(
        response.sendresponse(false, null, "The user does not exist", null)
      );
    }
    var token = createToken(user);
    var refreshtoken = createRefreshToken(user);
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        res.send(
          response.sendloginresponse(
            true,
            null,
            "User information fetched",
            user,
            token,
            refreshtoken
          )
        );
        var userObject = user;
        userObject.refreshtoken = refreshtoken;
        User.findByIdAndUpdate(user.id, { $set: userObject }, function(
          err,
          user
        ) {
          if (err) {
          }
        });
      } else {
        res.send(
          response.sendresponse(
            false,
            null,
            "The email and password do not match"
          )
        );
      }
    });
  });
};




//refresh token
exports.user_refresh_token = function(req, res) {
  if (!req.body.refreshtoken) {
    res.send(
      response.sendresponse(false, null, "Please send the refreshtoken", null)
    );
  } else {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.send(response.sendresponse(false, null, err, null));
        return;
      }

      if (!user) {
        res
          .status(200)
          .send(
            response.sendresponse(false, null, "The user does not exist", null)
          );
        return;
      }
      if (user.refreshtoken != req.body.refreshtoken) {
        res
          .status(200)
          .send(
            response.sendresponse(
              false,
              null,
              "The refresh token is invalid.",
              null
            )
          );
        return;
      } else {
        var token = createToken(user);
        var refreshtoken = createRefreshToken(user);
        res.send(
          response.sendloginresponse(
            true,
            null,
            "User information fetched",
            user,
            token,
            refreshtoken
          )
        );
        var userObject = user;
        userObject.refreshtoken = refreshtoken;
        User.findByIdAndUpdate(user.id, { $set: userObject }, function(
          err,
          user
        ) {
          if (err) {
          }
        });
      }
    });
  }
};
