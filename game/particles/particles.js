particleSprites = {
    circle: PIXI.Texture.fromImage('assets/particles/circle.png'),
    drop: PIXI.Texture.fromImage('assets/particles/drop.png'),
    fire: PIXI.Texture.fromImage('assets/particles/fire.png')
}

function setupParticles(){
    particles = [];
    
    var brush = new particleBrush();
    var pool = new ParticlePool(brush, 200, 60);
    
    defaultCursor.brush = brush;
    defaultCursor.pool = pool;
}

function addParticle(cursor){
    var np = cursor.pool.requestObject();
    np.setPosition(cursor.position.x,cursor.position.y);
    if(np.new){
        stage.ui.addChild(np.sprite);
        particles.push(np);
    }
}

function updateParticles(){
    for (var cursor of cursors){
        if(cursor.enabled){
            for (var i=0;i<cursor.brush.particleFlow;i++){
                addParticle(cursor);
            }
        }
    }
    for (var p of particles){
        p.update();
        if(p.dead){
            p.pool.returnObject(p);
        }
    }
}

function Minimal(){
    this.gravity = 0.02;
    this.particleFlow = 1;
    this.particleSpeed = 0.8;
    this.particleSpread = 60;
    this.particleLifespan = 20;
    this.particleOpacity = 1;
    this.particleTint = colors.white;
    this.primary = colors.white;
    this.secondary = colors.black;
    this.particleSprite = particleSprites.circle;
    this.particleSize = {
        min: 10,
        max: 12
    }
}

function FireTrail() {
    this.gravity = 0.02;
    this.particleFlow = 20;
    this.particleSpeed = 1.6;
    this.particleSpread = 60;
    this.particleLifespan = 35;
    this.particleOpacity = 0.86;
    this.particleTint = colors.orange;
    this.primary = colors.orange;
    this.secondary = colors.deepBlue;
    this.particleSprite = particleSprites.fire;
    this.particleSize = {
        min: 1,
        max: 14
    }
}

function Fireflies() {
    this.gravity = 0.04;
    this.particleFlow = 1;
    this.particleSpeed = 1.6;
    this.particleSpread = 60;
    this.particleLifespan = 65;
    this.particleOpacity = 1;
    this.particleTint = colors.yellow;
    this.primary = colors.yellow;
    this.secondary = colors.orange;
    this.particleSprite = particleSprites.circle;
    this.particleSize = {
        min: 8,
        max: 16
    }
}

function Sparks() {
    this.gravity = 0.04;
    this.particleFlow = 1;
    this.particleSpeed = 1.6;
    this.particleSpread = 60;
    this.particleLifespan = 65;
    this.particleOpacity = 0.7;
    this.particleTint = colors.teal;
    this.primary = colors.teal;
    this.secondary = colors.deepBlue;
    this.particleSprite = particleSprites.circle;
    this.particleSize = {
        min: 8,
        max: 16
    }
}