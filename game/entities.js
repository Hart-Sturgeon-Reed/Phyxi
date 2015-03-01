function addEntities(){
    for (var i=0;i<numPlanets;i++){
        new Planet();
    }
    
    console.log(numPlanets+' entities added');
}

function Planet(){
    var self = this;
    var max = 24;
    var min = 6;
    var scale = (Math.random()*(max-min))+min;
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
    
    this.body.view = new PIXI.Sprite(PIXI.Texture.fromImage('/assets/wisp.png'));
    this.sprite = this.body.view;
    this.sprite.anchor = {
        x:0.5,
        y:0.5
    };
    this.sprite.width = scale * 1.9;
    this.sprite.height = scale * 1.9;
    this.sprite.tint = getRandomProperty(entityColors);//getRandomProperty(colors,restrictedColors);
    
    world.add(this.body);
    stage.ents.addChild(this.sprite);
    
    return this;
}