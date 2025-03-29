// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { ButtonState, IInputControls } from "../input/IInputControls";
import Agent from "./Agent";
import WaypointGraph from "./navigation/WaypointGraph";
import { NavWanderer } from "./strategies/NavWanderer";

const { ccclass, property } = cc._decorator;

//*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
// TODO (1.3): Complete NavWanderAgent's behaviour using NavWanderer.
// [SPECIFICATIONS]
// - Check out the other agents to figure out what's missing, and connect
//   everything together!
//*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\

@ccclass
export default class NavWanderAgent
    extends Agent
    implements IInputControls {
    
    public get horizontalAxis(): number {
        //#region [YOUR IMPLEMENTATION HERE]
        return this._navWanderer.horizontalAxis;
        //#endregion
    }
    public get verticalAxis(): number {
        //#region [YOUR IMPLEMENTATION HERE]
        return this._navWanderer.verticalAxis;
        //#endregion
    }
    attack: ButtonState = ButtonState.Rest;
    interact: ButtonState = ButtonState.Rest;
    @property(WaypointGraph)
    waypointGraph: WaypointGraph = null;

    private _navWanderer: NavWanderer = null;
    protected agentUpdate(dt: number): void {
        //#region [YOUR IMPLEMENTATION HERE]
        this._navWanderer.update(dt);
        //#endregion
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //#region [YOUR IMPLEMENTATION HERE]
        // Create a new instance of NavWanderer and pass agent and waypointGraph to it
        this._navWanderer = new NavWanderer(this, this.waypointGraph);
        //#endregion
    }

    start() {
        //#region [YOUR IMPLEMENTATION HERE]
        // Initialize NavWanderer
        this._navWanderer.start();
        //#endregion
    }

    // update (dt) {}
}
