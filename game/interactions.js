modes = [Organism,Blackhole,Fluid];
mode = 0;

function setupInteractions(cursor){
    cursor.primary = Physics.behavior('attractor', {
        order: 1.16,
        strength: 0.4,
        max: 700,
        min: 10
    });

    cursor.secondary = Physics.behavior('attractor', {
        order: 1.1,
        strength: -0.8,
        max: 60,
        min: 10
    });
}

function switchMode(){
    mode++;
    if(mode>modes.length-1){
        mode = 0;
    }
    disableEffects();
    modes[mode]();
}

function disableEffect(cursor){
    world.remove( cursor.primary );
    world.remove( cursor.secondary );
}

function disableEffects(){
    for (cursor of cursors){
        world.remove( cursor.primary );
        world.remove( cursor.secondary );
    }
}

function toggleToPrimary(cursor){
    world.wakeUpAll();
    world.add( cursor.primary );
    world.remove( cursor.secondary );
}
function toggleToSecondary(cursor){
    world.wakeUpAll();
    cursor.primary.position( cursor.position );
    cursor.secondary.position( cursor.position );
    world.remove( cursor.primary );
    world.add( cursor.secondary );
}
function updatePos(cursor){
    cursor.primary.position( cursor.position );
    cursor.secondary.position( cursor.position );
}

function Blackhole(){
    console.log('Blackhole mode');
    world.warp(0.20);
    world.changeGrav(GRV.zero);
    for (cursor of cursors){
        cursor.primary = Physics.behavior('attractor', {
            order: 1.16,
            strength: 0.32,
            max: 460,
            min: 10
        });

        cursor.secondary = Physics.behavior('attractor', {
            order: 1.1,
            strength: -0.8,
            max: 60,
            min: 10
        });
    }
}

function Fluid(){
    console.log('Fluid mode');
    world.warp(1);
    world.changeGrav(GRV.micro);
    
    for (cursor of cursors){
        cursor.primary = Physics.behavior('attractor', {
            order: 1.2,
            strength: 0.4,
            max: 600,
            min: 10
        });
    
        cursor.secondary = Physics.behavior('attractor', {
            order: 1,
            strength: -0.06,
            max: 160,
            min: 60
        });
    }
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
    
    for (cursor of cursors){
        cursor.primary = Physics.behavior('attractor', {
            order: 1.16,
            strength: 0.4,
            max: 700,
            min: 10
        });

        cursor.secondary = Physics.behavior('attractor', {
            order: 1.2,
            strength: -6.8,
            max: 80,
            min: 10
        });
    }
}
