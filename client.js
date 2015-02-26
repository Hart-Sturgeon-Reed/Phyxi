cursors = [];
colors = {
    white: '0xFFFFFF',
    blue: '0x268ECB',
    dkBlue: '0x14546f',
    teal: '0xC8FDFE',
    deepBlue: '0x114FFF',
    orange: '0xFE9208',
    lightOrange: '0xFED59B',
    yellow: '0xFFC102'
};
function init(){
    console.log('We\'re in business!');
    
    // setup websocket
    socket = io();
    socket.on('start up',function(id) {
//        console.log('We are Client #'+id);
        socket.emit('init game');
    });
    
    socket.on('primary click', function(cursor){
        toggleToPrimary(cursors[cursor]);
    });
    socket.on('secondary click', function(cursor){
        toggleToSecondary(cursors[cursor]);
    });
    socket.on('switch mode', function(){
        switchMode();
    });
    socket.on('disable effect', function(cursor){
        disableEffect(cursors[cursor]);
    });
    socket.on('add controller', addUser);
    
    // track mouse position
    defaultCursor = addUser();
    defaultCursor.disabled = false; // removes default cursor when a controller is connected
    
    $(document).mousemove(function(event){
        if(!defaultCursor.disabled){
            defaultCursor.position.x = event.pageX;
            defaultCursor.position.y = event.pageY;
        }
    });
    
    particleBrush = Fireflies;
    
    // create pixi renderer
    renderer = Physics.renderer('pixi', {
        autoResize: true,
        el: 'game', // The DOM element to append the stage to
        meta: false // Turns debug info on/off
    });
    
    stage = new TestStage();

    //set up particle system
    setupParticles();
    
    // setup default cursor interactions
    setupInteractions(defaultCursor);
    
    // create a physics world
    world = new BasicWorld();
    
    //set interaction model (optional)
    Organism();
    
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
    
    socket.on('accel', function(accel, cursor){
        //console.dir(accel);
        var cursor = cursors[cursor];
        cursor.position.x = stageWidth/2 + (accel.xTilt*(stageWidth/1.2));
        cursor.position.y = stageHeight/2 - (accel.yTilt*(stageHeight/1.2));
        
        cursor.primary.position(cursor.position);
        cursor.secondary.position(cursor.position);
    });
}

function addUser(){
    var cursor = new PIXI.Sprite(PIXI.Texture.fromImage('/assets/sphere.png'));
    cursor.anchor = {x:0.5,y:0.5};
    cursor.width = 16;
    cursor.height = 16;
    cursor.tint = colors.teal;
    setupInteractions(cursor);
    cursors.push(cursor);
    return cursor;
}

function updateCursors(){
    for (cursor of cursors){
        updatePos();
    }
}