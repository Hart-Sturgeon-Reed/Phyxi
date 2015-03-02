function setupGame(){
    // create pixi renderer
    renderer = Physics.renderer('pixi', {
        autoResize: true,
        el: 'game', // The DOM element to append the stage to
        meta: false // Turns debug info on/off
    });
    
    stage = new TestStage();

    //set up default particle system
    particleBrush = FireTrail;
    defaultCursor = addUser(0,true);
    
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
        if(!paused){world.step(time);}
    });
    Physics.util.ticker.start();
}