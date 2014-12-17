
var redis = require('redis'),
	express = require('express');


module.exports = function(options) {

	var app = express();

	app.use(bodyParser.json());

	// Get configuration values
	app.get('/', function(req, res) {

	});

	// Set configuration values
	app.put('/', function(req, res) {

	});

	// Turn everything lights on/off
	app.post('/power', function() {
		if (req.body.mode === 'on') {
			app.enabled = true;
			drive.start();
		} else {
			app.enabled = false;
			drive.all.to(0x00, 0x00, 0x00);
			drive.stop();
		}
	});

	// Define a grouping of pixels
	app.put('/group/:group', function(req, res) {

	});

	// Get group of pixels
	app.get('/group/:group', function(req, res) {

	});

	// Get list of all groups
	app.get('/group', function(req, res) {

	});

	// Define a show
	app.put('/show/:show', function(req, res) {

	});

	// Get a show
	app.get('/show/:show', function(req, res) {

	});

	// Stop the current show to run test, then resume
	app.post('/test', function(req, res) {

	});
}
