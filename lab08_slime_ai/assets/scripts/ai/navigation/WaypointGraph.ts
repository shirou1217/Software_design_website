// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Waypoint from "./Waypoint";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WaypointGraph extends cc.Component {
    public adjacencyList: Waypoint[] = [];
    public addWaypoint(waypoint: Waypoint): void {
        this.adjacencyList.push(waypoint);
        this._shortestDistanceMatrix = null;
        this._shortestPathMatrix = null;
    }
    private _shortestDistanceMatrix: Map<string, number> = null;
    private _shortestPathMatrix: Map<string, Waypoint> = null;
    /** The shortest distance matrix of the graph. Query by concatenating the uuid of the two waypoints.
     * 
     * Example:
     * `waypointGraph.shortestDistanceMatrix.get(waypointA.uuid + waypointB.uuid)` returns
     * the shortest distance on the graph `waypointGraph` between `waypointA` and `waypointB`.
     */
    public get shortestDistanceMatrix(): Map<string, number> {
        if (!this._shortestDistanceMatrix) this.allPairsShortestPath();
        return this._shortestDistanceMatrix;
    }
    /** The shortest path matrix of the graph. Query by concatenating the uuid of the two waypoints.
     * 
     * Example:
     * `waypointGraph.shortestPathMatrix.get(waypointA.uuid + waypointB.uuid)` returns
     * the next waypoint on the shortest path between `waypointA` and `waypointB` on
     * the graph `waypointGraph`.
     */
    public get shortestPathMatrix(): Map<string, Waypoint> {
        if (!this._shortestPathMatrix) this.allPairsShortestPath();
        return this._shortestPathMatrix;
    }


    //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
    // TODO (2.1): Complete allPairsShortestPath using the Floyd-Warshall algorithm.
    // [SPECIFICATIONS]
    // - Implement the Floyd-Warshall algorithm.
    // - Index into the "matrices" by concatenating the uuid of the two waypoints.
    //   - Ex. 1: this._shortestPathMatrix.get(waypointA.uuid + waypointB.uuid)
    //   - Ex. 2: this._shortestDistanceMatrix.set(waypointA.uuid + waypointB.uuid, Infinity)
    //   - Do not worry about time complexity (for our purposes you can consider indexing 
    //     into a map as an operation that takes constant (O(1)) time)
    // - You can iterate through this.adjacencyList to get every Waypoint (vertex) on the graph.
    // - You can use the template below or follow your own understanding of the algorithm.
    //*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*\\
    /**
     * Computes all pairs shortest path for the waypoint graph, and cache the results
     * in the matrices _shortestDistanceMatrix and _shortestPathMatrix.
     */
    private allPairsShortestPath() {
        // Floyd-Warshall algorithm
        this._shortestDistanceMatrix = new Map<string, number>();
        this._shortestPathMatrix = new Map<string, Waypoint>();
        // Initialization
        // Hint: You can use a waypoint's adjacentWaypoints and distances to get
        // the waypoint's out-edges!
        // ie. waypointA.adjacentWaypoints[0]'s distance from waypointA is equal to
        // waypointA.distances[0].

        // BEGIN PSEUDOCODE
        // For each pair of waypoints (A, B) in the waypoint graph:
        // 	 If B is adjacent to A, set shortestDistanceMatrix(A, B) to the weight of edge (A, B),
        //   and shortestPathMatrix(A, B) to B.
        //   ex: this._shortestDistanceMatrix.set(A.uuid + B.uuid, A.distances[B.index]);
        //       this._shortestPathMatrix.set(A.uuid + B.uuid, B);
        //   Otherwise:
        //	   If A and B are the same, set shortestDistanceMatrix(A, B) to 0, and 
        //     shortestPathMatrix(A, B) to A.
        //	   Otherwise, set shortestDistanceMatrix(A, B) to Infinity, and
        //	   shortestPathMatrix(A, B) to null.
        // END PSEUDOCODE 
        // Initialization
        for (let i = 0; i < this.adjacencyList.length; i++) {
            const from = this.adjacencyList[i];
            for (let j = 0; j < this.adjacencyList.length; j++) {
                const to = this.adjacencyList[j];
                if (from === to) {
                    this._shortestDistanceMatrix.set(from.uuid + to.uuid, 0);
                    this._shortestPathMatrix.set(from.uuid + to.uuid, from);
                } else {
                    const distance = from.distances[j];
                    if (distance !== undefined) {
                        this._shortestDistanceMatrix.set(from.uuid + to.uuid, distance);
                        this._shortestPathMatrix.set(from.uuid + to.uuid, to);
                    } else {
                        this._shortestDistanceMatrix.set(from.uuid + to.uuid, Infinity);
                        this._shortestPathMatrix.set(from.uuid + to.uuid, null);
                    }
                }
            }
        }

        // Core algorithm
        // BEGIN PSEUDOCODE
        // For each waypoint C in the waypoint graph:
        //   For each pair of waypoints (A, B) in the waypoint graph:
        // 	   Denote the current shortest path between A and B as AB,
        //	   the current shortest path between A and C as AC,
        //	   and the current shortest path between C and B as CB.
        //     If length of AB is greater than length of AC and CB combined,
        //	   update AB such that shortestDistanceMatrix(A, B) is length of AC + CB,
        //	   and shortestPathMatrix(A, B) is C.
        // END PSEUDOCODE 
        // Core algorithm
        for (let k = 0; k < this.adjacencyList.length; k++) {
            const via = this.adjacencyList[k];
            for (let i = 0; i < this.adjacencyList.length; i++) {
                const from = this.adjacencyList[i];
                for (let j = 0; j < this.adjacencyList.length; j++) {
                    const to = this.adjacencyList[j];
                    const directDistance = this._shortestDistanceMatrix.get(from.uuid + to.uuid);
                    const viaDistance = this._shortestDistanceMatrix.get(from.uuid + via.uuid) + this._shortestDistanceMatrix.get(via.uuid + to.uuid);
                    if (viaDistance < directDistance) {
                        this._shortestDistanceMatrix.set(from.uuid + to.uuid, viaDistance);
                        this._shortestPathMatrix.set(from.uuid + to.uuid, this._shortestPathMatrix.get(from.uuid + via.uuid));
                    }
                }
            }
        }
}
    
    /**
     * Utility method. You can use this to double-check your allPairsShortestPath implementation.
     */
    private printShortestPathMatrix() {
        for (let from of this.adjacencyList) {
            for (let to of this.adjacencyList) {
                console.log(`${this.node.name}: Shortest path from ${from.name} to ${to.name} is through ${this.shortestPathMatrix.get(from.uuid + to.uuid).name}`);
            }
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.adjacencyList = this.node.getComponentsInChildren(Waypoint);
    }

    start() {


    }

}
