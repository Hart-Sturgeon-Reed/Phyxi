function init(){
    console.log('We\'re in business!');
    
    userNum = 0;
    
    prevBackground = "canvas";
    
    // setup websocket
    socket = io();
    socket.on('start up',function(id) {
//        console.log('We are Client #'+id);
        socket.emit('init game');
    });
    
    socket.on('primary click', function(socketNum){
        (getCursor(socketNum)).toggleToPrimary();
    });
    socket.on('secondary click', function(socketNum){
        (getCursor(socketNum)).toggleToSecondary();
    });
    socket.on('switch mode', function(){
        switchMode();
    });
    socket.on('recolor', function(){
        recolorEntities();
    });
    socket.on('pause', function(){
        togglePause();
    });
    socket.on('disable effect', function(socketNum){
        (getCursor(socketNum)).disableEffect(false);
    });
    socket.on('add controller', function(socketNum){
        addUser(socketNum,false,Smooth);
    });
    socket.on('controller disconnected', removeUser);
    
    socket.on('accel', function(accel, socketNum){
        //console.log('controller at socket '+socketNum+':');
        //console.dir(accel);
        var cursor = getCursor(socketNum);
        if(cursor!=null){
            cursor.filterMotion.call(cursor,accel);
        }
    });
    
    socket.on('osc', function(msg){
        var address = msg.address;
        var userId = msg.args[0].value;
        console.log('OSC message recieved from user '+userId+', kind is '+address);
        
        if(address=="/F") {
            var data = {
                x: msg.args[1].value,
                y: msg.args[2].value,
                z: msg.args[3].value
            };
            // console.dir(data);
            var cursor = getCursor(userId);
            if(cursor!=null){
                cursor.filterMotion.call(cursor,data);
            }
        }else if(address=="/User Joined"){
            addUser(userId,false,Kinect);
        }else if(address=="/User Left"){
            removeUser(userId);
        }
    });
    
    
    $(document).on("mousemove", function(event){
        if(defaultCursor.enabled){
            defaultCursor.position.x = event.pageX;
            defaultCursor.position.y = event.pageY;
        }
    });
    $(document).on("mousedown", function(event){
        defaultCursor.position.x = event.pageX;
        defaultCursor.position.y = event.pageY;
        defaultCursor.updatePos();
    });
    $(document).on("keyup", function(event){
        switch(event.which){
            case 77: //m
                switchMode();
                break;
            case 80: //p
                togglePause();
                break;
            case 70: //f
                break;
            case 72: //h
                defaultCursor.enabled = !defaultCursor.enabled;
                if(!defaultCursor.enabled){defaultCursor.disableEffect(true);}
                break;
        }
    });
    
    //Set up the physics world, particle system etc.
    setupGame();
}

function addUser(socketNum, isDefault, filter){
    var brush = userBrushes[userNum];
    userNum++;
    if(userNum>userBrushes.length-1){
        userNum = 0;
    }
    var cursor = new Cursor(socketNum,brush,filter);
    cursors.push(cursor);
    
    if(!isDefault){
        defaultCursor.disableEffect(true);
    }
    console.log('new controller: number '+socketNum);
    return cursor;
}

function removeUser(socketNum){
    var cursor = getCursor(socketNum);
    if(cursor!=null){
        var dead = cursors.splice(cursors.indexOf(cursor),1)[0];
        dead.disableEffect(true);
        dead = null;
        console.log('removing controller '+socketNum);
    }else{
        console.log('removing old controller: number '+socketNum);
    }
}

function getCursor(socketNum){
    for (var cursor of cursors){
        if (cursor.num == socketNum){
            return cursor;
        }
    }
    return null;
}

function disableAllEffects(){
    for (var cursor of cursors){
        cursor.disableEffect();
    }
}

function setBackground(newBackground){
    $('#back').addClass(newBackground);
    if(prevBackground != null){
        $('#back').removeClass(prevBackground);
    }
    prevBackground = newBackground;
}

function togglePause(){
    paused = !paused;
}