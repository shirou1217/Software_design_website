// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Agent from "../Agent";
import Waypoint from "../navigation/Waypoint";
import WaypointGraph from "../navigation/WaypointGraph";
import { AI } from "./AgentStrategy";

export abstract class Navigator extends AI.Strategy {

    protected waypointGraph: WaypointGraph = null;
    protected agent: Agent = null;
    protected currentWaypoint: Waypoint = null;
    //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
    // TODO (1.1): Implement closestWaypoint using this.waypointGraph.adjacencyList.
    // [SPECIFICATIONS]
    // - You need to iterate through this.waypointGraph.adjacencyList to find the
    //   waypoint that minimizes the distance between it and the agent's node.
    // - You can use Waypoint.distanceToNode defined in Waypoint.ts.
    //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
    /** The closest waypoint on the waypoint graph assigned to the Navigator. */
    protected get closestWaypoint(): Waypoint {
        let closestDistance = 1000000;
        let closestWaypoint: Waypoint = null;
         // Get an array of waypoint keys from the adjacency list
        const waypointKeys = Object.keys(this.waypointGraph.adjacencyList);
        // Iterate through each waypoint in the adjacency list
        for (const key of waypointKeys) {
            const waypoint = this.waypointGraph.adjacencyList[key];

            // Compute the distance between the agent's node and the current waypoint
            const distance =waypoint.distanceToNode(this.agent.node);
           // Print the distance for debugging purposes
            console.log(`Distance to waypoint ${key}: ${distance}`);
            // If the current waypoint is closer than the previously found closest waypoint
            if (distance < closestDistance) {
                closestDistance = distance;
                closestWaypoint = waypoint;
            }
        }
    
        return closestWaypoint;
    }
    protected abstract get nextWaypoint(): Waypoint;
    /** A unit 2D vector pointing from the agent's position 
     * to the next waypoint's position */
    protected get towardsNextWaypoint(): cc.Vec2 {
        return this.nextWaypoint.node.convertToWorldSpaceAR(cc.Vec2.ZERO).sub(this.agent.node.convertToWorldSpaceAR(cc.Vec2.ZERO)).normalize();
    }

    constructor(_agent: Agent, _waypointGraph: WaypointGraph) {
        super();
        this.agent = _agent;
        this.waypointGraph = _waypointGraph;
    }
    /**
     * Navigator will call this method when the agent has reached the next waypoint.
     */
    protected abstract onTransitionFinish(): void;

    /**
     * Navigator.ts's update method will check if the agent has reached past
     * the next waypoint and call onTransitionFinish() accordingly.
     * 
     * Exactly how the agent should move to the next waypoint should be 
     * implemented by the strategies that inherit Navigator.
     * @param dt 
     */
    public update(dt: number) {
        let dist = this.nextWaypoint.distanceToNode(this.agent.node);
        if (this.nextWaypoint.distanceToNode(this.agent.node) < 1.0) {
            // This indicates that the agent is moving past the next waypoint.
            // Therefore, the agent has reached the waypoint.
            this.currentWaypoint = this.nextWaypoint;
            this.onTransitionFinish();

        }
    }

}
