function Cursor(socketNum){
    var cursor = new PIXI.Sprite(PIXI.Texture.fromImage('/assets/sphereLt.png'));
    cursor.anchor = {x:0.5,y:0.5};
    cursor.width = 16;
    cursor.height = 16;
    cursor.tint = colors.teal;
    cursor.num = socketNum;
    cursor.enabled = true;
    cursor.brush = new particleBrush();
    cursor.pool = new ParticlePool(cursor.brush, 200, 60);
    
    
    cursor.primary = model.primary;

    cursor.secondary = model.secondary;
    
    
    cursor.disableEffect = function(){
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