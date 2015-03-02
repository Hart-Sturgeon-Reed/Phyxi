function init(){
    console.log('We\'re in business!');
    
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
    socket.on('disable effect', function(socketNum){
        (getCursor(socketNum)).disableEffect();
    });
    socket.on('add controller', addUser);
    socket.on('controller disconnected', removeUser);
    
    
    $(document).mousemove(function(event){
        if(defaultCursor.enabled){
            defaultCursor.position.x = event.pageX;
            defaultCursor.position.y = event.pageY;
        }
    });
    $(document).keyup(function(event){
        switch(event.which){
            case 77: //m
                switchMode();
                break;
            case 80: //p
                togglePause();
                break;
        }
    });
    
    //Set up the physics world, particle system etc.
    setupGame();
    
    socket.on('accel', function(accel, socketNum){
//        console.log('controller at socket '+socketNum+':');
//        console.dir(accel);
        var cursor = getCursor(socketNum);
        cursor.position.x = stageWidth/2 + (accel.xTilt*(stageWidth/1.2));
        cursor.position.y = stageHeight/2 - (accel.yTilt*(stageHeight/1.2));
        
        cursor.primary.position(cursor.position);
        cursor.secondary.position(cursor.position);
    });
}

function addUser(socketNum, isDefault){
    var cursor = new Cursor(socketNum);
    cursors.push(cursor);
    
    if(!isDefault){
        defaultCursor.enabled = false;
        disableEffect(defaultCursor);
    }
    return cursor;
}

function removeUser(socketNum){
    var dead = cursors.splice(cursors.indexOf(getCursor(socketNum)),1)[0];
    dead.enabled = false;
    disableEffect(dead);
    console.log('removing controller '+socketNum);
    //console.dir(dead);
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

function togglePause(){
    paused = !paused;
}