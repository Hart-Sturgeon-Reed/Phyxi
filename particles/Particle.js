function Particle(){
    var self = this;
    this.sprite = new PIXI.Sprite(particleSprite);
    this.sprite.anchor = {
        x:0.5,
        y:0.5
    };
    this.new = true;
    this.sprite.blendMode = PIXI.blendModes.ADD;
    this.sprite.tint = particleTint;
    var scale = range(particleSize.min,particleSize.max);
    this.sprite.width = scale;
    this.sprite.height = scale;
    this.opacity = particleOpacity;
    this.sprite.alpha = this.opacity;
    
    this.currentSprite = particleSprite;
    
    this.lifespan = particleLifespan;
    this.gravity = gravity;
    this.age = 0;
    
    this.vx = equalDist(particleSpeed);
    this.vy = equalDist(particleSpeed);
    
    this.generateSprite = function(){
        this.sprite.setTexture(particleSprite);
        this.sprite.tint = particleTint;
        this.currentSprite = particleSprite;
    };
    this.update = function(){
        if(this.age>this.lifespan){
            this.dead = true;
        }else if(this.sprite.visible){
            //console.log(this.vy);
            this.age++;
            this.sprite.alpha = (1 - this.age/this.lifespan)*self.opacity;
            this.sprite.position.x += this.vx;
            this.sprite.position.y += this.vy;
            //this.sprite.position.y += gravity;
        }
    };
    this.reset = function(){
        this.new = false;
        this.sprite.visible = false;
        this.age = 0;
        this.sprite.alpha = self.opacity;
        this.dead = false;
    };
    this.init = function(){
        if(this.currentSprite != particleSprite || this.sprite.tint != particleTint){
            this.generateSprite();
        }
        this.sprite.visible = true;
        this.lifespan = particleLifespan;
        this.gravity = gravity;
        this.setPosition(mpos.x + equalDist(particleSpread),mpos.y + equalDist(particleSpread));
        this.vx = equalDist(particleSpeed);
        this.vy = equalDist(particleSpeed);
        
    };
    this.setPosition = function(xPos,yPos){
        this.sprite.position = {x:xPos,y:yPos};
    }
}

ParticlePool = function(startingSize,batchSize){
    ObjectPool.call(this,startingSize,batchSize);
    this.addObject = function(){
        //console.log("the pool contains "+(this.numObjects++)+" objects");
        var p = new Particle();
        this.pool.push(p);
    }
}