function init(){
    console.log('We\'re in business!');
    
    // setup websocket
    var socket = io();
    socket.on('start up',function(id) {
        console.log('We are Client #'+id);
    });
    
    // track mouse position
    mpos = {
        x:0,
        y:0
    }
    $(document).mousemove(function(event){
        mpos.x = event.pageX;
        mpos.y = event.pageY;
    });
    
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
    
    particleBrush = Minimal;
    //set up particle system
    setupParticles();
    
    // create a physics world
    world = new BasicWorld();
    
    
    // set physics interactions
    setupInteractions();
    
    //set interaction model (optional)
    Organism();
    
    // add physics entities
    addEntities();
    
    // render on each step
    world.on('step', function(){
        updateCursor();
        updateParticles();
        world.render();
    });
    
    // start simulation and rendering
    Physics.util.ticker.on(function(time){
        // custom physics and state checking should go here
        world.step(time);
    });
    Physics.util.ticker.start();
}

function updateCursor(){
    cursor.position.x = mpos.x;
    cursor.position.y = mpos.y;
}