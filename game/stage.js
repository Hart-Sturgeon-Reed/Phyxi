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
    
    return stage;
}