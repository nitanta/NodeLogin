var http = require("http");
var response = require("../responseHandler/response");


exports.test = function(req, res) {
  res.send(response.sendresponse(true, null, "Welocome to third party controller.", null));
}

exports.getWheather = function(req, res) {
  var city_name = req.body.city_name;
    var options = {
        host : 'https://tvjan-tvmaze-v1.p.rapidapi.com',
        path : '/schedule',
        method : 'GET'
    }
    var req = http.request(options, function(res){
        var body = "";
        res.on('data', function(data) {
            body += data;
        });
        res.on('end', function() {
            res.send(response.sendresponse(true, null, "Wheather info fetched successfully", JSON.parse(body)));
        });
    });
    console.log('here too man');
    req.on('error', function(err) {
        console.log('Problem with request: ' + err.message);
        res.send(response.sendresponse(false, null, err, null));
    });
};