function Cursor(socketNum,brush){
    var cursor = new PIXI.Sprite(PIXI.Texture.fromImage('/assets/sphereLt.png'));
    var size = 18;
    cursor.anchor = {x:0.5,y:0.5};
    cursor.position = {x:stageWidth/2, y:stageHeight/2};
    var inset = 15;
    cursor.bounds = {xMin:inset,xMax:stageWidth-inset,yMin:inset,yMax:stageHeight-inset};
    cursor.width = size;
    cursor.height = size;
    cursor.tint = colors.white;
    cursor.num = socketNum;
    cursor.filterMotion = Smooth;
    cursor.enabled = true;
    if(brush==null){
        cursor.brush = new particleBrush();
    }else{
        cursor.brush = new brush();
    }
    cursor.pool = new ParticlePool(cursor.brush, 200, 60);
    
    
    cursor.primary = model.primary;

    cursor.secondary = model.secondary;
    
    
    cursor.disableEffect = function(hideCursor){
        if(hideCursor){cursor.enabled = false;}
        world.remove( cursor.primary );
        world.remove( cursor.secondary );
        cursor.brush.particleTint = cursor.brush.primary;
    };
    cursor.toggleToPrimary = function(){
        if(cursor.enabled){
            world.wakeUpAll();
            world.add( cursor.primary );
            world.remove( cursor.secondary );
            cursor.brush.particleTint = cursor.brush.primary;
        }
    };
    cursor.toggleToSecondary = function(){
        if(cursor.enabled){
            world.wakeUpAll();
            cursor.primary.position( cursor.position );
            cursor.secondary.position( cursor.position );
            world.remove( cursor.primary );
            world.add( cursor.secondary );
            cursor.brush.particleTint = cursor.brush.secondary;
        }
    };
    cursor.updatePos = function(){
        cursor.primary.position( cursor.position );
        cursor.secondary.position( cursor.position );
    };
    cursor.checkBounds = function(){
        if (cursor.position.x < cursor.bounds.xMin) {
            cursor.position.x = cursor.bounds.xMin;
        }else if (cursor.position.x > cursor.bounds.xMax){
            cursor.position.x = cursor.bounds.xMax;
        }
        if (cursor.position.y < cursor.bounds.yMin) {
            cursor.position.y = cursor.bounds.yMin;
        }else if (cursor.position.y > cursor.bounds.yMax){
            cursor.position.y = cursor.bounds.yMax;
        }
    }
    
    return cursor;
}
function Pointer(accel){
    this.position.x = stageWidth/2 + (accel.xTilt*(stageWidth/1.2));
    this.position.y = stageHeight/2 - (accel.yTilt*(stageHeight/1.2));
    this.updatePos();
}
function Smooth(accel){
    this.position.x += (accel.xTilt*(14));
    this.position.y -= (accel.yTilt*(14));
    this.checkBounds();
    this.updatePos();
}