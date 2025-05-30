// 关卡管理系统
console.log("level-system.js loaded");

const levels = [
    { scoreThreshold: 0, speed: 150, level: 1 },     // Level 1
    { scoreThreshold: 50, speed: 125, level: 2 },    // Level 2
    { scoreThreshold: 100, speed: 100, level: 3 },   // Level 3
    { scoreThreshold: 150, speed: 85, level: 4 },    // Level 4
    { scoreThreshold: 200, speed: 70, level: 5 },    // Level 5
    // 可以根据需要添加更多关卡
];

let currentLevel = 1;
const maxLevel = levels.length;

function resetLevel() {
    currentLevel = 1;
    console.log("Level reset to 1");
}

function getCurrentLevelData() {
    // Find the highest level whose score threshold is met or exceeded.
    // Iterate backwards for efficiency.
    for (let i = levels.length - 1; i >= 0; i--) {
        if (score >= levels[i].scoreThreshold) { // 'score' needs to be accessible, maybe pass it in?
             return levels[i];
        }
    }
    return levels[0]; // Should not happen if level 1 has threshold 0
}


function checkLevelUp(currentScore) {
    const currentLevelData = getCurrentLevelDataByScore(currentScore);
    if(currentLevelData.level > currentLevel) {
        currentLevel = currentLevelData.level;
        console.log(`Level Up! Reached Level ${currentLevel}`);
        return true; // Indicate level up occurred
    }
    return false; // No level up
}

// Helper needed by getCurrentLevelData to access score without global dependency
function getCurrentLevelDataByScore(scoreToCheck) {
     for (let i = levels.length - 1; i >= 0; i--) {
         if (scoreToCheck >= levels[i].scoreThreshold) {
             return levels[i];
         }
     }
     return levels[0];
}

function getCurrentSpeed(scoreToCheck) {
    return getCurrentLevelDataByScore(scoreToCheck).speed;
}

function getCurrentLevelNumber(scoreToCheck) {
     return getCurrentLevelDataByScore(scoreToCheck).level;
 }

// 障碍物逻辑可以后续添加
// let obstacles = [];
// function generateObstaclesForLevel(levelNumber) { ... }
// function getObstacles() { return obstacles; }