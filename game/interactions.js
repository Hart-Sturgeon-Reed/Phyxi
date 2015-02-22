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
            toggleToSecondary();
        }
        ,'interact:move': function( pos ){
            updatePos();
        }
        ,'interact:release': function(){
            toggleToPrimary();
            
        }
    });
    modes = [Organism,Blackhole,Fluid];
    mode = 0;
}

function switchMode(){
    mode++;
    if(mode>modes.length-1){
        mode = 0;
    }
    world.remove( primary );
    world.remove( secondary );
    modes[mode]();
}

function toggleToPrimary(){
    world.wakeUpAll();
    world.add( primary );
    world.remove( secondary );
}
function toggleToSecondary(){
    world.wakeUpAll();
    primary.position( mpos );
    secondary.position( mpos );
    world.remove( primary );
    world.add( secondary );
}
function updatePos(){
    primary.position( mpos );
    secondary.position( mpos );
}

function Blackhole(){
    console.log('Blackhole mode');
    world.warp(0.10);
    world.changeGrav(GRV.zero);
    primary = Physics.behavior('attractor', {
        order: 1.16,
        strength: 0.32,
        max: 460,
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
    console.log('Fluid mode');
    world.warp(1);
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
    console.log('Organism mode');
    world.warp(0.76);
    world.changeGrav(GRV.low);
    world.changeOrbit(Physics.behavior('newtonian', {
        strength: 0.11,
        max: 180,
        min: 20
    }));
    
    primary = Physics.behavior('attractor', {
        order: 1.16,
        strength: 0.4,
        max: 700,
        min: 10
    });
    
    secondary = Physics.behavior('attractor', {
        order: 1.2,
        strength: -6.8,
        max: 80,
        min: 10
    });
}
