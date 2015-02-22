cursors = [];
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
    
    // track mouse position
    mpos = {
        x:0,
        y:0
    }
//    $(document).mousemove(function(event){
//        mpos.x = event.pageX;
//        mpos.y = event.pageY;
//    });
    
    particleBrush = Fireflies;
    
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
    
    // create pixi renderer
    renderer = Physics.renderer('pixi', {
        autoResize: true,
        el: 'game', // The DOM element to append the stage to
        meta: false // Turns debug info on/off
    });
    
    stage = new TestStage();

    //set up particle system
    setupParticles();
    
    // create a physics world
    world = new BasicWorld();
    
    
    // set physics interactions
    //setupInteractions();
    
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

function updateCursors(){
    for (cursor of cursors){
        updatePos();
    }
}