var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientNum = 1;
var controllerNum = 1;

var game = null;
var controllers = [];

app.use(express.static(__dirname));

app.get('/Control/', function(req, res){
    res.sendFile(__dirname+'/control.html');
});

app.get('/', function(req, res){
    res.sendFile(__dirname+'/client.html');
});

io.on('connection', function(socket){
    console.log('client '+clientNum+' connected');
    socket.sid = clientNum;
    socket.emit('start up', clientNum++);
    
    socket.on('init game',function(){
        game = socket;
        console.log('client '+socket.sid+' is the game client');
    });
    
    socket.on('init controller',function(){
        var controller = socket;
        console.log('client '+socket.sid+' is a controller');
        socket.num = controllerNum++;
        controllers.push(controller);
        game.emit('add controller');
        // controller events
        socket.on('accel', function(accel){
            if(game){
                game.emit('accel', accel, socket.num);
            }
        });
        socket.on('primary click', function(){
            console.log('primary click');
            if(game){
                game.emit('primary click',socket.num);
            }
        });
        socket.on('secondary click', function(){
            console.log('secondary click');
            if(game){
                game.emit('secondary click',socket.num);
            }
        });
        socket.on('switch mode', function(e){
            console.log('switching interaction modes');
            if(game){
                game.emit('switch mode');
            }
        });
        socket.on('disable effect', function(){
            console.log('disabling effect');
            if(game){
                game.emit('disable effect',controller.num);
            }
        });
    });
    
    socket.on("disconnect", function(){
        console.log('client '+socket.sid+' disconnected');
    });
});



http.listen(3000,function(){
    console.log('server started on 3000');
});