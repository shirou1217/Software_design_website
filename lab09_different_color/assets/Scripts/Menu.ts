const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {
    
    // ===================== TODO =====================
    // 1. Add dynamic click event to StartButton to call this
    //    function
    start(){
        let StartBtn= new cc.Component.EventHandler();
        StartBtn.target=this.node;
        StartBtn.component="Menu";
        StartBtn.handler="loadGameScene";
        cc.find("Canvas/UI/StartButton").getComponent(cc.Button).clickEvents.push(StartBtn);

    }
    loadGameScene(){
        cc.director.loadScene("game");
    }
    // ================================================
}
