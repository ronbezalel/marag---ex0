var http    = require('http'),
    express = require('express'),
    SoccerPlayer = require('./SoccerPlayer.js').SoccerPlayer,
    eventsConfige = require('./eventsConfige.js').eventsConfige;

var app = express();

app.get('/', function(req,res){
	var player = new SoccerPlayer('Ron Bezalel');

	player.addMedals(2);
	player.decreaseMedals(1);
	player.decreaseMedals(2);
	player.addMedals(10);

	var desc = player.description;
    res.send(desc);
});
http.createServer(app).listen(8080);




