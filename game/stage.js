function TestStage(){
    var stage = new PIXI.DisplayObjectContainer();
    var ents = new PIXI.DisplayObjectContainer();
    var ui = new PIXI.DisplayObjectContainer();
    renderer.stage.addChild(stage);
    stage.addChild(ents);
    stage.addChild(ui);
    stage.ents = ents;
    stage.ui = ui;
    
    stageWidth = renderer.width;
    stageHeight = renderer.height;
    
    stage.scale = {x:0.5,y:0.5};
    
    // User cursor
//    var cursor = new PIXI.Sprite(PIXI.Texture.fromImage('/assets/sphere.png'));
//    cursor.anchor = {x:0.5,y:0.5};
//    cursor.width = 16;
//    cursor.height = 16;
//    cursor.tint = colors.teal;
//    setupInteractions(cursor);
//    cursors.push(cursor);
    //stage.ui.addChild(cursor);
    
    return stage;
}