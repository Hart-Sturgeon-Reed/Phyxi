particleSprites = {
    circle: PIXI.Texture.fromImage('assets/particles/circle.png'),
    drop: PIXI.Texture.fromImage('assets/particles/drop.png'),
    fire: PIXI.Texture.fromImage('assets/particles/fire.png')
}

function setupParticles(){
    particles = [];
    
    Minimal();
    particleBrush();

    particlePool = new ParticlePool(200,60);

    tick = 0;
    frequency = 0;
}

function Minimal(){
    gravity = 0.02;
    particleFlow = 1;
    particleSpeed = 0.8;
    particleSpread = 60;
    particleLifespan = 20;
    particleOpacity = 1;
    particleTint = colors.white;
    particleSprite = particleSprites.circle;
    particleSize = {
        min: 10,
        max: 12
    }
}

function FireTrail() {
    particleFlow = 24;
    particleSpeed = 1.6;
    particleLifespan = 65;
    particleOpacity = 0.86;
    particleTint = colors.orange;
    particleSprite = particleSprites.fire;
    particleSize = {
        min: 4,
        max: 14
    }
}

function Fireflies() {
    gravity = 0.04;
    particleFlow = 1;
    particleSpeed = 1.6;
    particleSpread = 60;
    particleLifespan = 65;
    particleOpacity = 1;
    particleTint = colors.yellow;
    particleSize = {
        min: 8,
        max: 16
    }
}

function Sparks() {
    gravity = 0.04;
    particleFlow = 1;
    particleSpeed = 1.6;
    particleSpread = 60;
    particleLifespan = 65;
    particleOpacity = 0.7;
    particleTint = colors.teal;
    particleSprite = particleSprites.circle;
    particleSize = {
        min: 8,
        max: 16
    }
}

function addParticle(xPos,yPos){
    var np = particlePool.requestObject();
    np.setPosition(mpos.x,mpos.y);
    if(np.new){
        stage.ui.addChild(np.sprite);
        particles.push(np);
    }
}

function addParticles(num,xPos,yPos){
    for (var i=0;i<num;i++){
        addParticle(xPos,yPos);
    }
}

function updateParticles(){
    for (var i=0;i<particleFlow;i++){
        addParticle();
    }
    for (var p of particles){
        p.update();
        if(p.dead){
            particlePool.returnObject(p);
        }
    }
}