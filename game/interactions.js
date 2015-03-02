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

function setCollider(collide){
    if (collide && collider == null){
        collider = Physics.behavior('body-impulse-response');
        world.add(collider);
    } else if (!collide && collider != null){
        world.remove(collider);
        collider = null;
    }
}

function Blackhole(){
    console.log('Blackhole mode');
    world.warp(0.20);
    world.changeGrav(GRV.zero);
    
    setBackground('stars');
    setEntitySprite('/assets/planet.png');
    setEntityColors([colors.blue,colors.green,colors.dkBlue]);
    setEntitySpriteScale(1.9);
    setEntityVel({x:0,y:0});
    
    setCollider(true);
    
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

function Snow(){
    console.log('Fluid mode');
    world.warp(0.6);
    world.changeGrav(GRV.micro);
    setEntitySprite('/assets/wisp.png');
    setEntityColors([colors.white]);
    setCollider(false);
    setEntitySpriteScale(0.6);
    
    setBackground('swirl');
    
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
    console.log('Firefly mode');
    world.warp(0.18);
    world.changeGrav(GRV.micro);
    
    setBackground('sunset');
    
    setCollider(false);
    setEntitySprite('/assets/wispLt.png');
    setEntityColors([colors.ltOrange]);
    setEntitySpriteScale(2.6);
    
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
    
    setBackground('dark');
    setEntitySpriteScale(1.9);
    setEntityColors([colors.orange,colors.white,colors.ltOrange]);
    setEntitySprite('/assets/bubbleMd.png');
    
    setCollider(true);
    
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
