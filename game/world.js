//Constants
GRV = {
    zero: 0,
    micro: 0.0001,
    low:0.0004,
    moon:0.0007,
    normal:0.0014,
    earth:0.0016,
    heavy:0.0018,
    lead:0.0024
}

gravityStrength = GRV.zero;

function BasicWorld() {
    var world = Physics({
        timestep: 1000.0 / 180
    });

    // add the renderer
    world.add( renderer );
    
    //renderer.resize([stageWidth,stageHeight]);
    
    console.log('creating a Phyxi canvas '+stageWidth+'px wide & '+stageHeight+'px high');
    
    // setup physics behaviors
    var viewportBounds = Physics.aabb(0, 0, stageWidth, stageHeight); //for desktop 
    
//    var viewportBounds = Physics.aabb(-5, -5, 245, 395); //for mobile
    
    world.add(Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.4,
        cof: 0.99,
        label:'bounds'
    }));
    
    gravity = Physics.behavior('constant-acceleration', {
        acc: { x : 0, y: gravityStrength } // 0.0016 is the default // 14 normal // 10 light // 18 heavy
    });
    world.add(gravity);
    
    world.add(Physics.behavior('body-impulse-response') );
    world.add(Physics.behavior('body-collision-detection') );
    world.add(Physics.behavior('sweep-prune') );
    world.add(Physics.behavior('interactive', { el: renderer.container }));
    world.add(Physics.behavior('newtonian', { strength: .06, max:80,min:50}));
    
    world.changeGrav = function(newGrav){
        world.removeBehavior(gravity);
        gravity = Physics.behavior('constant-acceleration', 
        {
            acc: { x : 0, y: newGrav } 
        });
        world.add(gravity);
    }
    

    return world;
}