function setupInteractions(){
    primary = Physics.behavior('attractor', {
        order: 1.16,
        strength: 0.4,
        max: 700,
        min: 10
    });
    
    secondary = Physics.behavior('attractor', {
        order: 1.1,
        strength: -0.8,
        max: 60,
        min: 10
    });
    
    world.on({
        'interact:poke': function( pos ){
            world.wakeUpAll();
            primary.position( pos );
            secondary.position( pos );
            world.remove( primary );
            world.add( secondary );
            
        }
        ,'interact:move': function( pos ){
            primary.position( pos );
            secondary.position( pos );
        }
        ,'interact:release': function(){
            world.wakeUpAll();
            world.add( primary );
            world.remove( secondary );
            
        }
    });
}

function Blackhole(){
    world.changeGrav(GRV.zero);
    primary = Physics.behavior('attractor', {
        order: 1.16,
        strength: 0.4,
        max: 700,
        min: 10
    });
    
    secondary = Physics.behavior('attractor', {
        order: 1.1,
        strength: -0.8,
        max: 60,
        min: 10
    });
}

function Fluid(){
    world.changeGrav(GRV.micro);
    
    primary = Physics.behavior('attractor', {
        order: 1,
        strength: -0.06,
        max: 160,
        min: 60
    });
    
    secondary = Physics.behavior('attractor', {
        order: 1.2,
        strength: 0.4,
        max: 600,
        min: 10
    });
}

function Organism(){
    world.changeGrav(GRV.low);
    primary = Physics.behavior('attractor', {
        order: 1.16,
        strength: 0.4,
        max: 700,
        min: 10
    });
    
    secondary = Physics.behavior('attractor', {
        order: 1.2,
        strength: -0.8,
        max: 60,
        min: 10
    });
}
