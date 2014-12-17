
var redis = require('redis'),
	ws2811 = require('ws2811'),
	main = require('./lib/app');

var app = main({
	redis: redis.createClient(),
	driver: ws2811()
});

app.listen(process.env.PORT)
