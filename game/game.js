function setupGame(){
    // create pixi renderer
    renderer = Physics.renderer('pixi', {
        autoResize: true,
        el: 'game', // The DOM element to append the stage to
        meta: false // Turns debug info on/off
    });
    
    // set up stage layers
    stage = new TestStage();
    
    // set up interaction models
    modes = [Organism,Blackhole,Fluid];
    mode = 0;
    model = {
        primary: Physics.behavior('attractor', {
            order: 1.16,
            strength: 0.4,
            max: 700,
            min: 10
        }),

        secondary:Physics.behavior('attractor', {
            order: 1.1,
            strength: -0.8,
            max: 60,
            min: 10
        })
    };

    // set up default particle system
    particleBrush = FireTrail;
    defaultCursor = addUser(0,true);
    
    setupParticles();
    
    // create a physics world
    world = new BasicWorld();
    
    // start current interaction model
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