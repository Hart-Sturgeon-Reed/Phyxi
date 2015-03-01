function init(){
    console.log('We\'re in business!');
    
    // setup websocket
    socket = io();
    socket.on('start up',function(id) {
//        console.log('We are Client #'+id);
        socket.emit('init game');
    });
    
    socket.on('primary click', function(socketNum){
        toggleToPrimary(getCursor(socketNum));
    });
    socket.on('secondary click', function(socketNum){
        toggleToSecondary(getCursor(socketNum));
    });
    socket.on('switch mode', function(){
        switchMode();
    });
    socket.on('disable effect', function(socketNum){
        disableEffect(getCursor(socketNum));
    });
    socket.on('add controller', addUser);
    socket.on('controller disconnected', removeUser);
    
    // track mouse position
    defaultCursor = addUser();
    defaultCursor.num = 0;
    
    $(document).mousemove(function(event){
        if(defaultCursor.enabled){
            defaultCursor.position.x = event.pageX;
            defaultCursor.position.y = event.pageY;
        }
    });
    
    // create pixi renderer
    renderer = Physics.renderer('pixi', {
        autoResize: true,
        el: 'game', // The DOM element to append the stage to
        meta: false // Turns debug info on/off
    });
    
    stage = new TestStage();

    //set up particle system
    particleBrush = Fireflies;
    setupParticles();
    
    // setup default cursor interactions
    setupInteractions(defaultCursor);
    
    // create a physics world
    world = new BasicWorld();
    
    //set up interaction models
    modes = [Organism,Blackhole,Fluid];
    mode = 0;
    modes[mode]();
    
    // add physics entities
    addEntities();
    
    // render on each step
    world.on('step', function(){
        //updateCursor();
        updateParticles();
        world.render();
    });
    
    // start simulation and rendering
    Physics.util.ticker.on(function(time){
        // custom physics and state checking should go here
        world.step(time);
    });
    Physics.util.ticker.start();
    
    socket.on('accel', function(accel, socketNum){
//        console.log('controller at socket '+socketNum+':');
//        console.dir(accel);
        defaultCursor.enabled = false;
        disableEffect(defaultCursor);
        var cursor = getCursor(socketNum);
        cursor.position.x = stageWidth/2 + (accel.xTilt*(stageWidth/1.2));
        cursor.position.y = stageHeight/2 - (accel.yTilt*(stageHeight/1.2));
        
        cursor.primary.position(cursor.position);
        cursor.secondary.position(cursor.position);
    });
}

function addUser(socketNum){
    var cursor = new PIXI.Sprite(PIXI.Texture.fromImage('/assets/sphere.png'));
    cursor.anchor = {x:0.5,y:0.5};
    cursor.width = 16;
    cursor.height = 16;
    cursor.tint = colors.teal;
    cursor.num = socketNum;
    cursor.enabled = true;
    setupInteractions(cursor);
    cursors.push(cursor);
    return cursor;
}

function removeUser(socketNum){
    var dead = cursors.splice(cursors.indexOf(getCursor(socketNum)),1)[0];
    dead.enabled = false;
    disableEffect(dead);
    console.log('removing controller '+socketNum);
    console.dir(dead);
}

function getCursor(socketNum){
    for (var cursor of cursors){
        if (cursor.num == socketNum){
            return cursor;
        }
    }
    return null;
}

function updateCursors(){
    for (cursor of cursors){
        updatePos();
    }
}