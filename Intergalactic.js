curtainUp = true;
function init() {
    
    stageWidth = $("#game").width();
    stageHeight = $("#game").height();
    
    console.log(stageWidth),
    console.log(stageHeight)
    
    PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
    
    var assetsToLoad = ["assets/aliens.json","assets/platforms.json","assets/players.json","assets/crates.json","assets/menus.json"];
	
	loader = new PIXI.AssetLoader(assetsToLoad);
	
	loader.onComplete = onAssetsLoaded;
	
	loader.load();
    
    renderer = Physics.renderer('pixi', {
        el: 'game', // The DOM element to append the stage to
        width: stageWidth,
        height: stageHeight,
        meta: false, // Turns debug info on/off
    });
    
    world = Physics({
        timestep: 1000.0 / 180
    });
    world.add(renderer);
    stage = renderer.stage;
    
    gravity = Physics.behavior('constant-acceleration', {
        acc: { x : 0, y: gravityStrength } // 0.0016 is the default // 14 normal // 10 light // 18 heavy
    });
    world.add(gravity);
    
    var viewportBounds = Physics.aabb(-350, -350, stageWidth+350, stageHeight+400);
    
    world.add(Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.4,
        cof: 0.99,
        label:'bounds'
    }));
    
    //world.add(Physics.behavior('constant-acceleration') );
    world.add(Physics.behavior('body-impulse-response') );
    world.add(Physics.behavior('body-collision-detection') );
    world.add(Physics.behavior('sweep-prune') );
    world.add(Physics.behavior('interactive', { el: renderer.el }));
    //world.add(Physics.behavior('newtonian', { strength: .1, max:300,min:50}));
    
    attractor = Physics.behavior('attractor', {
        order: 0,
        strength: blackholeStrength
    });
    world.on({
        'interact:poke': function( pos ){
            attractor.position( pos );
            world.add( attractor );
        }
        ,'interact:move': function( pos ){
            attractor.position( pos );
        }
        ,'interact:release': function(){
            world.remove( attractor );
        }
    });
    
    gamepad1 = new Gamepad();
    gamepad2 = new Gamepad();
    
    
    world.on('step', function(){
        world.render();
    });
    
    setupCollisions();
    
    Physics.util.ticker.on(function( time ){
        
        
            animate();
        if(!titleDisplayed&&!gameStarted){
            customLeftAlien.anim.animate();
            customRightAlien.anim.animate();
        }
            world.step( time );
    });
    
    window.addEventListener('resize', function () {

        stageWidth = $("#game").width();
        stageHeight = $("#game").height();

        renderer.el.width = stageWidth;
        renderer.el.height = stageHeight;

        viewportBounds = Physics.aabb(0, 0, stageWidth, stageHeight);
        // update the boundaries
        world.add(Physics.behavior('edge-collision-detection', {
            aabb: viewportBounds,
            restitution: 0.00,
            cof: 0.3
        }));
        

    }, true);
}

