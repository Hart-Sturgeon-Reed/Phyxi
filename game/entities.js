function setEntityColors(newColors){
    entityColors = newColors;
    for (var entity of entities){
        entity.sprite.tint = getRandomProperty(entityColors);
    }
}
function setEntitySprite(newSprite){
    entitySprite = newSprite;
    for (var entity of entities){
        entity.sprite.texture = PIXI.Texture.fromImage(entitySprite);
    }
}
function setEntitySpriteScale(newScale){
    for (var entity of entities){
        entity.setScale(newScale);
    }
}
function setEntityVel(newVel){
//    for (var entity of entities){
//        entity.body.state.vel = newVel;
//        entity.body.state.acc = {x:0,y:0};
//    }
}

function addEntities(){
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
    this.spriteScale = scale;
    this.sprite.width = scale * 1.9;
    this.sprite.height = scale * 1.9;
    this.sprite.tint = getRandomProperty(entityColors);//getRandomProperty(colors,restrictedColors);
    this.update = function(){
        if (self.body.state.pos.y > stageHeight + 60 && self.body.state.vel.y > 0) {
            self.body.state.pos.y = -20;
            self.body.state.vel.y = Math.random()*0.3;
        }else if (self.body.state.pos.y < -400 && self.body.state.vel.y < 0){
            self.body.state.pos.y = stageHeight + 20;
            self.body.state.vel.y = Math.random()*-0.6;
        }
        if (self.body.state.pos.x > stageWidth + 60 && self.body.state.vel.x > 0) {
            self.body.state.pos.x = -20;
            self.body.state.vel.x = Math.random()*0.3;
        }else if (self.body.state.pos.x < -60 && self.body.state.vel.x < 0) {
            self.body.state.pos.x = stageWidth + 20;
            self.body.state.vel.x = Math.random()*-0.3;
        }
    }
    this.setScale = function(newScale){
        self.sprite.width = self.spriteScale * newScale;
        self.sprite.height = self.spriteScale * newScale;
    }
    
    world.add(this.body);
    stage.ents.addChild(this.sprite);
    entities.push(this);
    
    return this;
}