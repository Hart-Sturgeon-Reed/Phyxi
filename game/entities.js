function addEntities(){
    entities = [];
    for (var i=0;i<numPlanets;i++){
        new Planet();
    }
    
    console.log(numPlanets+' entities added');
}

function Planet(){
    var self = this;
    var scale = (Math.random()*(entitySize.max-entitySize.min))+entitySize.min;
    this.body = Physics.body('circle', {
        x: Math.random()*stageWidth, // x-coordinate
        y: Math.random()*stageHeight, // y-coordinate
//        vx: 0.2, // velocity in x-direction
//        vy: 0.11, // velocity in y-direction,
        radius: scale,
        restitution: 0.9,
        mass: scale/8,
        styles: {
            strokeStyle: colors.darkRed
            ,fillStyle: colors.blue
            ,lineWidth: 1
        }
    });
    
    this.body.view = new PIXI.Sprite(PIXI.Texture.fromImage(entitySprite));
    this.sprite = this.body.view;
    this.sprite.blendMode = PIXI.blendModes.SCREEN;
    this.sprite.anchor = {
        x:0.5,
        y:0.5
    };
    this.sprite.width = scale * 1.9;
    this.sprite.height = scale * 1.9;
    this.sprite.tint = getRandomProperty(entityColors);//getRandomProperty(colors,restrictedColors);
    this.update = function(){
        if (self.body.state.pos.y > stageHeight + 60) {
            self.body.state.pos.y = -300;
            self.body.state.vel.y = 0;
        }
    }
    
    world.add(this.body);
    stage.ents.addChild(this.sprite);
    entities.push(this);
    
    return this;
}