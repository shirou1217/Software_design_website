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
import { Coward } from "./strategies/Coward";
import { Wanderer } from "./strategies/Wanderer";

const { ccclass, property } = cc._decorator;
/**
 * Mixes two vectors.
 * 
 * Example: `mixVec2(a, b, 0.25)` (Mathematically equivalent to a * 0.25 + b * 0.75)
 * @param mix A value between 0 and 1.
 * @returns The mixed result.
 */
function mixVec2(a: cc.Vec2, b: cc.Vec2, mix: number) {
    return a.mul(mix).add(b.mul(1.0 - mix))
}

@ccclass
export default class ShyAgent
    extends Agent
    implements IInputControls {
    /** The agent will move for this long before stopping to wait. */
    @property(cc.Float)
    moveDuration = 1.0;
    /** The agent will move at this speed. */
    @property(cc.Float)
    moveSpeed = 1.0;
    /** The agent will wait for this long before starting to move again. */
    @property(cc.Float)
    waitDuration = 0.5;
    /** The actual wait duration will be randomized by this factor, 
     *  such that the actual wait duration is a random number between
     *  waitDuration x (1 - waitRandomFactor) and 
     *  waitDuration x (1 + waitRandomFactor).
    */
    @property(cc.Float)
    waitRandomFactor = 0.1;
    @property(cc.Node)
    runAwayFrom: cc.Node = null;
    @property(cc.Float)
    safeDistance: number = 5.0;

    public get horizontalAxis() { return this._moveAxis2D.x }
    public get verticalAxis() { return this._moveAxis2D.y }
    attack: ButtonState = ButtonState.Rest;
    interact: ButtonState = ButtonState.Rest;

    private _moveAxis2D: cc.Vec2 = cc.Vec2.ZERO;
    private _wanderer: Wanderer = null;
    private _coward: Coward = null;
    private _isWaiting: Boolean = false;

    protected agentUpdate(dt: number): void {
        if (!this._wanderer || !this._coward) return;
        this._wanderer.update(dt);
        this._coward.update(dt);
        let wandererMove = cc.v2(this._wanderer.horizontalAxis, this._wanderer.verticalAxis);
        let cowardMove = cc.v2(this._coward.horizontalAxis, this._coward.verticalAxis);
        if (wandererMove.fuzzyEquals(cc.Vec2.ZERO, 0.01)) {
            // Wanderer has stopped. The agent should move the moment it is no longer stopped.
            this._isWaiting = true;
            this._moveAxis2D = wandererMove;
        }

        else if (this._isWaiting) {
            if (this._coward.distanceFromTarget < this.safeDistance) {
                this._moveAxis2D = mixVec2(wandererMove, cowardMove, 0.25);
            }
            else {
                this._moveAxis2D = wandererMove;
            }
            this._isWaiting = false;
        }
    }


    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this._wanderer = new Wanderer(
            this.moveDuration,
            this.waitDuration,
            this.waitRandomFactor
        );
        this._coward = new Coward(this, this.runAwayFrom);
    }

    start() {
        this._wanderer.start();
        this._coward.start();
    }

    // update (dt) {}
}
