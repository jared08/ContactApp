var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');
var port = process.env.PORT || 80;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); //allows server to parse the body of input it receives

app.get('/contactlist', function(req, res) {
	console.log("I got a GET request !!")

	 db.contactlist.find(function(error, docs) {
	 	console.log(docs);
	 	res.json(docs); //sends the data back to the controller
	 })
});

app.post('/contactlist', function(req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc) {
		res.json(doc); //inserts data into db & sends new data back to the controller
	})
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
  	res.json(doc);
  })
});

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
  	update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
  	new: true}, function (err, doc) {
  		res.json(doc);
  	});
});

app.listen(port);
console.log("Server running on port: " + port);