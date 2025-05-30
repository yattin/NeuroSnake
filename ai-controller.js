// AI 自动控制逻辑
console.log("ai-controller.js loaded");

// --- A* Pathfinding Algorithm Implementation ---

// Helper function to calculate Manhattan distance (heuristic)
function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Node representation for A*
class Node {
    constructor(x, y, g = 0, h = 0, parent = null) {
        this.x = x;         // x-coordinate on the grid
        this.y = y;         // y-coordinate on the grid
        this.g = g;         // Cost from start to this node
        this.h = h;         // Heuristic cost from this node to end
        this.f = g + h;     // Total cost (g + h)
        this.parent = parent; // Parent node for path reconstruction
    }

    // Helper to check if two nodes are the same location
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}

// A* Algorithm function
// Takes start coords (x, y), end coords (x, y), grid dimensions (width, height), and obstacles (array of {x, y})
function findPath(startX, startY, endX, endY, gridWidth, gridHeight, obstacles) {
    const startNode = new Node(startX, startY);
    const endNode = new Node(endX, endY);

    const openSet = [startNode]; // Nodes to be evaluated
    const closedSet = new Set(); // Nodes already evaluated (using a Set for efficient lookup by string key)

    startNode.h = heuristic(startNode, endNode);
    startNode.f = startNode.g + startNode.h;

    while (openSet.length > 0) {
        // Find the node in openSet with the lowest f score
        let lowestFIndex = 0;
        for (let i = 1; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestFIndex].f) {
                lowestFIndex = i;
            }
        }
        const currentNode = openSet[lowestFIndex];

        // --- Goal Check ---
        if (currentNode.equals(endNode)) {
            // Path found! Reconstruct path by backtracking
            const path = [];
            let temp = currentNode;
            while (temp !== null) {
                path.push({ x: temp.x, y: temp.y });
                temp = temp.parent;
            }
            return path.reverse(); // Return path from start to end
        }

        // --- Move current node from open to closed ---
        openSet.splice(lowestFIndex, 1); // Remove from openSet
        closedSet.add(`${currentNode.x},${currentNode.y}`); // Add to closedSet using string key

        // --- Explore Neighbors ---
        const neighbors = [];
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // Up, Down, Right, Left

        for (const [dx, dy] of directions) {
            const neighborX = currentNode.x + dx;
            const neighborY = currentNode.y + dy;

            // --- Neighbor Validation ---
            // Check bounds
            if (neighborX < 0 || neighborX >= gridWidth || neighborY < 0 || neighborY >= gridHeight) {
                continue;
            }

            // Check if obstacle
            if (obstacles.some(obstacle => obstacle.x === neighborX && obstacle.y === neighborY)) {
                continue; // Skip if it's an obstacle
            }

            // Check if already evaluated
            if (closedSet.has(`${neighborX},${neighborY}`)) {
                continue; // Skip if already in closed set
            }

            // --- Process Valid Neighbor ---
            const neighborNode = new Node(neighborX, neighborY);
            const tentativeG = currentNode.g + 1; // Assuming cost of 1 to move to neighbor

            let foundInOpenSet = false;
            for(let i=0; i<openSet.length; i++){
                if(openSet[i].equals(neighborNode)){
                    foundInOpenSet = true;
                    if(tentativeG < openSet[i].g){
                        // Found a better path to this neighbor
                        openSet[i].g = tentativeG;
                        openSet[i].h = heuristic(neighborNode, endNode);
                        openSet[i].f = openSet[i].g + openSet[i].h;
                        openSet[i].parent = currentNode;
                    }
                    break; // Stop searching openSet once found
                }
            }

            if (!foundInOpenSet) {
                 // Neighbor not in openSet, add it
                 neighborNode.g = tentativeG;
                 neighborNode.h = heuristic(neighborNode, endNode);
                 neighborNode.f = neighborNode.g + neighborNode.h;
                 neighborNode.parent = currentNode;
                 openSet.push(neighborNode);
            }
        }
    }

    // --- No path found ---
    console.log("A* search could not find a path.");
    return null; // Return null if openSet is empty and goal was not reached
}

// ---------------------------------------------

// --- AI Decision Logic ---

let currentAiPath = null; // Stores the path calculated by A*
let lastKnownFoodPosition = { x: -1, y: -1 }; // To detect if food has moved

// Function to determine the next move for the AI snake
// Needs snake object (esp. head), food object, grid dimensions
function getAiNextMove(snake, food, gridWidth, gridHeight) {
    const head = snake[0];
    const obstacles = snake.slice(0, -1); // The snake's body (excluding the potential tail tip if it moves there) acts as obstacles

    // --- Check if recalculation is needed ---
    let needsRecalculation = false;
    if (!currentAiPath || currentAiPath.length <= 1) { // No path or path is just the current head
        needsRecalculation = true;
        console.log("AI: No valid path, recalculating...");
    } else if (food.x !== lastKnownFoodPosition.x || food.y !== lastKnownFoodPosition.y) { // Food moved
        needsRecalculation = true;
        console.log("AI: Food moved, recalculating path...");
    }
    // Add more conditions later? e.g., path becomes invalid due to snake movement

    // --- Recalculate Path if Needed ---
    if (needsRecalculation) {
        currentAiPath = findPath(head.x, head.y, food.x, food.y, gridWidth, gridHeight, obstacles);
        lastKnownFoodPosition = { x: food.x, y: food.y }; // Update known food position
         if (currentAiPath && currentAiPath.length > 0) {
             // Remove the current head position from the path as we only need the next steps
             currentAiPath.shift();
         }
    }

    // --- Determine Next Direction from Path ---
    if (currentAiPath && currentAiPath.length > 0) {
        const nextStep = currentAiPath[0]; // Get the next coordinate in the path
        currentAiPath.shift(); // Consume this step from the path

        const nextDx = nextStep.x - head.x;
        const nextDy = nextStep.y - head.y;

        console.log(`AI: Moving towards ${nextStep.x},${nextStep.y} (dx:${nextDx}, dy:${nextDy})`);
        return { nextDx, nextDy };

    } else {
        // --- Fallback Strategy (if no path found or path empty) ---
        console.warn("AI: Path not found or empty. Implementing basic fallback.");
        // Basic fallback: Try to not hit obstacles immediately adjacent
        const possibleMoves = [];
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // Down, Up, Right, Left
        
        for(const [dx, dy] of directions) {
            const nextX = head.x + dx;
            const nextY = head.y + dy;

            // Check bounds
            if (nextX < 0 || nextX >= gridWidth || nextY < 0 || nextY >= gridHeight) continue;
            // Check obstacles (snake body)
             if (obstacles.some(obstacle => obstacle.x === nextX && obstacle.y === nextY)) continue;

             possibleMoves.push({nextDx: dx, nextDy: dy});
        }

        if(possibleMoves.length > 0) {
            // Choose a random valid move
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            console.log(`AI Fallback: Random valid move (dx:${randomMove.nextDx}, dy:${randomMove.nextDy})`);
            return randomMove;
        } else {
             // No valid moves - doomed! Just return current direction (will likely cause crash)
             console.error("AI Fallback: No valid moves found!");
             // Find current dx, dy (needed if we didn't store it globally for AI)
             let currentDx = 0;
             let currentDy = 0;
             if (snake.length > 1) {
                 currentDx = head.x - snake[1].x;
                 currentDy = head.y - snake[1].y;
             }
             return { nextDx: currentDx, nextDy: currentDy};
         }
    }
}

// ------------------------