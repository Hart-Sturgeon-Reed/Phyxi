function Cursor(socketNum,brush){
    var cursor = new PIXI.Sprite(PIXI.Texture.fromImage('/assets/sphereLt.png'));
    var size = 18;
    cursor.anchor = {x:0.5,y:0.5};
    cursor.width = size;
    cursor.height = size;
    cursor.tint = colors.white;
    cursor.num = socketNum;
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
        cursor.enabled = !hideCursor;
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
    
    return cursor;
}