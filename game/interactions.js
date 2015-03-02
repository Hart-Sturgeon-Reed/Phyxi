function switchMode(){
    mode++;
    if(mode>modes.length-1){
        mode = 0;
    }
    disableAllEffects();
    modes[mode]();
    for (var cursor of cursors){
        cursor.primary = model.primary;
        cursor.secondary = model.secondary;
    }
}

function Blackhole(){
    console.log('Blackhole mode');
    world.warp(0.20);
    world.changeGrav(GRV.zero);
    
    entityColors = [colors.blue,colors.green,colors.red];
    
    if (collider == null){
        collider = Physics.behavior('body-impulse-response');
        world.add(collider);
    }
    
    model.primary = Physics.behavior('attractor', {
            order: 1.16,
            strength: 0.32,
            max: 460,
            min: 10
    });

    model.secondary = Physics.behavior('attractor', {
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
    entityColors = [colors.blue,colors.dkBlue,colors.white];
    
    if (collider == null){
        collider = Physics.behavior('body-impulse-response');
        world.add(collider);
    }
    
    model.secondary = Physics.behavior('attractor', {
        order: 1.2,
        strength: 0.4,
        max: 600,
        min: 10
    });

    model.primary = Physics.behavior('attractor', {
        order: 1,
        strength: -0.06,
        max: 160,
        min: 60
    });
}

function Firefly(){
    console.log('Rain mode');
    world.warp(0.2);
    world.changeGrav(GRV.micro);
    entityColors = [colors.ltOrange]
    
    if (collider != null){
        world.remove(collider);
        collider = null;
    }
    entitySize = {
        max: 40,
        min: 20
    }
    
    model.primary = Physics.behavior('attractor', {
        order: 1.2,
        strength: 0.5,
        max: 300,
        min: 10
    });

    model.secondary = Physics.behavior('attractor', {
        order: 1,
        strength: -0.9,
        max: 160,
        min: 0
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
    
    if (collider == null){
        collider = Physics.behavior('body-impulse-response');
        world.add(collider);
    }
    
    model.primary = Physics.behavior('attractor', {
        order: 1.16,
        strength: 0.4,
        max: 700,
        min: 10
    });

    model.secondary = Physics.behavior('attractor', {
        order: 1.2,
        strength: -6.8,
        max: 80,
        min: 10
    });
}
