import { ButtonState } from "../../input/IInputControls";
import Agent from "../Agent";
import { AI } from "./AgentStrategy";

/**
 * An AI strategy that describes a "wandering" behaviour.
 */
export class Wanderer extends AI.Strategy {
    /** The agent will move for this long before stopping to wait. */
    private _moveDuration = 1.0;
    /** The agent will wait for this long before starting to move again. */
    private _waitDuration = 0.5;
    /** The actual wait duration will be randomized by this factor, 
     *  such that the actual wait duration is a random number between
     *  waitDuration x (1 - waitRandomFactor) and 
     *  waitDuration x (1 + waitRandomFactor).
    */
    private _waitRandomFactor = 0.1;

    constructor(moveDuration: number, waitDuration: number, waitRandomFactor: number) {
        super();
        this._moveDuration = moveDuration;
        this._waitDuration = waitDuration;
        this._waitRandomFactor = waitRandomFactor;
    }

    /** The time point after which the agent should wait. */
    private _nextWaitTime = 0;
    /** The time point after which the agent should move again. */
    private _nextMoveTime = 0;
    /** The velocity (vector with magnitude) at which the agent should move. */
    private _wanderVelocity = cc.Vec2.ZERO;
    /** The agent's output to IInput. */
    private _moveAxis2D = cc.Vec2.ZERO;

    public get horizontalAxis(): number {
        return this._moveAxis2D.x;
    }
    public get verticalAxis(): number {
        return this._moveAxis2D.y;
    }
    public get attack(): ButtonState {
        throw new Error("Method not implemented.");
    }
    public get interact(): ButtonState {
        throw new Error("Method not implemented.");
    }

    public start() {
        this._nextMoveTime = cc.director.getTotalTime() / 1000.0;
        this._nextWaitTime = this._nextMoveTime - this._waitDuration;
    }
    public update(dt: number) {
        /** The current time in the game in seconds. */
        let currentTime = cc.director.getTotalTime() / 1000.0;

        if (currentTime >= this._nextMoveTime) {
            // Compute the next scheduled wait time.
            this._nextWaitTime = currentTime + this._moveDuration;
            // Compute the next scheduled move time.
            this._nextMoveTime = this._nextWaitTime
                + this._waitDuration // time spent waiting after moving (slightly randomized)
                * (1.0 + this._waitRandomFactor * (Math.random() * 2.0 - 1.0));

            // Set new move direction.
            this._wanderVelocity = randomPointOnUnitCircle();
        }

        this._moveAxis2D =
            (currentTime < this._nextWaitTime) ? this._wanderVelocity
                : cc.Vec2.ZERO;

        //#endregion
    }

}

function randomPointOnUnitCircle() {
    let angle = Math.random() * Math.PI * 2;
    return new cc.Vec2(Math.cos(angle), Math.sin(angle));
}