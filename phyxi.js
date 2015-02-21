var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientNum = 1;

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
    socket.emit('start up', clientNum++);
});

http.listen(3000,function(){
    console.log('server started on 3000');
});