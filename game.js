// 游戏主逻辑
console.log("game.js loaded");

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreValueElement = document.getElementById('scoreValue');
const highScoreValueElement = document.getElementById('highScoreValue');
let score = 0;
let highScore = 0;
const highScoreKey = 'snakeHighScore'; // Key for localStorage

const modeSwitchBtn = document.getElementById('modeSwitchBtn');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const difficultySelect = document.getElementById('difficultySelect');
const mapSizeSelect = document.getElementById('mapSizeSelect');
const langSwitchBtn = document.getElementById('langSwitchBtn'); // Added

// --- I18N Start ---
const translations = {
  en: {
    pageTitle: "NeuroSnake",
    scoreLabel: "Score: ",
    highScoreLabel: "High Score: ",
    startBtn: "Start",
    pauseBtn: "Pause",
    resumeBtn: "Resume",
    modeSwitchBtnManual: "Switch to AI Mode",
    modeSwitchBtnAi: "Switch to Manual Mode",
    langSwitchBtnToEn: "English", // Text on button when current is ZH, to switch TO EN
    langSwitchBtnToZh: "中文",    // Text on button when current is EN, to switch TO ZH
    difficultyLabel: "Difficulty:",
    difficultyEasy: "Easy",
    difficultyMedium: "Medium",
    difficultyHard: "Hard",
    mapSizeLabel: "Map Size:",
    mapSizeSmall: "Small",
    mapSizeMedium: "Medium",
    mapSizeLarge: "Large",
    instructionsTitle: "Game Instructions",
    controlsLabel: "Controls:",
    controlsText: "Use Arrow Keys (↑ ↓ ← →) or WASD keys to move the snake.",
    buttonsSettingsLabel: "Buttons & Settings:",
    buttonStartPauseHelp: "\"Start / Pause / Resume\": To control game state.",
    buttonAiModeHelp: "\"Toggle AI Mode\": Switch between manual play and AI auto-play.",
    settingDifficultyHelp: "\"Difficulty\" dropdown: Select game difficulty (Easy, Medium, Hard). Affects game speed and potentially other factors. Changes apply on new game.",
    settingMapSizeHelp: "\"Map Size\" dropdown: Select game map size (Small, Medium, Large). Changes apply on new game or immediately if game is not running.",
    objectiveLabel: "Objective:",
    objectiveText: "Eat food to grow longer. Avoid hitting walls or the snake's own body.",
    gameOverText: "Game Over!",
    gameOverScore: "Your Score: {score}",
    gameOverMapChanged: "Map changed. Click Start."
  },
  zh: {
    pageTitle: "贪食蛇",
    scoreLabel: "分数: ",
    highScoreLabel: "最高分: ",
    startBtn: "开始",
    pauseBtn: "暂停",
    resumeBtn: "继续",
    modeSwitchBtnManual: "切换至 AI 模式",
    modeSwitchBtnAi: "切换至手动模式",
    langSwitchBtnToEn: "English",
    langSwitchBtnToZh: "中文",
    difficultyLabel: "难度:",
    difficultyEasy: "简单",
    difficultyMedium: "中等",
    difficultyHard: "困难",
    mapSizeLabel: "地图大小:",
    mapSizeSmall: "小",
    mapSizeMedium: "中",
    mapSizeLarge: "大",
    instructionsTitle: "游戏说明",
    controlsLabel: "控制:",
    controlsText: "使用方向键 (↑ ↓ ← →) 或 WASD 键来移动小蛇。",
    buttonsSettingsLabel: "按钮和设置:",
    buttonStartPauseHelp: "“开始 / 暂停 / 继续”：控制游戏状态。",
    buttonAiModeHelp: "“切换AI模式”：在手动操作和AI自动游戏之间切换。",
    settingDifficultyHelp: "“难度”下拉框：选择游戏难度（简单、中等、困难）。会影响游戏速度等参数。在新游戏开始时生效。",
    settingMapSizeHelp: "“地图大小”下拉框：选择游戏地图大小（小、中、大）。在新游戏开始时生效，或者在游戏未进行时立即生效。",
    objectiveLabel: "目标:",
    objectiveText: "吃掉食物使身体变长。避免撞到墙壁或蛇自己的身体。",
    gameOverText: "游戏结束!",
    gameOverScore: "你的得分: {score}",
    gameOverMapChanged: "地图已更改。点击开始。"
  }
};

let currentLanguage = localStorage.getItem('snakeGameLanguage') || 'zh';

function translate(key, replacements = {}) {
  let text = translations[currentLanguage]?.[key] || translations['en']?.[key] || key; // Fallback to English, then key itself
  for (const placeholder in replacements) {
    text = text.replace(`{${placeholder}}`, replacements[placeholder]);
  }
  return text;
}

function updateUIText() {
  document.querySelectorAll('[data-i18n-key]').forEach(element => {
    const key = element.dataset.i18nKey;
    element.textContent = translate(key);
  });
  document.querySelectorAll('[data-i18n-attr-lang]').forEach(element => {
    element.setAttribute('lang', currentLanguage);
  });

  // Special handling for buttons that change text based on state
  if (gameState === 'paused') {
    pauseBtn.textContent = translate('resumeBtn');
  } else {
    pauseBtn.textContent = translate('pauseBtn');
  }

  if (currentMode === 'manual') {
    modeSwitchBtn.textContent = translate('modeSwitchBtnManual');
  } else {
    modeSwitchBtn.textContent = translate('modeSwitchBtnAi');
  }
  
  langSwitchBtn.textContent = currentLanguage === 'zh' ? translate('langSwitchBtnToEn') : translate('langSwitchBtnToZh');
}

function setLanguage(langCode) {
  currentLanguage = langCode;
  localStorage.setItem('snakeGameLanguage', langCode);
  updateUIText();
  // If game over message is on screen, re-render it with new language
  if (gameState === 'gameOver') {
    // Clear the game over text specifically or re-call gameOver to redraw text
    // For simplicity, we'll just update the main UI text; gameOver text will update on next game over.
    // A more robust solution would specifically re-render dynamic canvas text.
  }
}
// --- I18N End ---

let currentMode = 'manual'; // 'manual' or 'ai'
let currentDifficulty = 'medium'; // 'easy', 'medium', 'hard'
let currentMapSize = 'medium'; // 'small', 'medium', 'large'
let gameState = 'initial'; // 'initial', 'running', 'paused', 'gameOver'
let gameLoopId; // To store the requestAnimationFrame ID

const gridSize = 20; // 每个格子的像素大小
let tileCount = 20; // 网格行列数 (canvas.width / gridSize) - Now let

const mapTileCounts = {
    'small': 15,
    'medium': 20,
    'large': 25
};

// 蛇的初始设置
let snake = [];
const initialSnakeLength = 3;
// let snakeSpeed = 150; // Speed is now managed by level system
let dx = 1; // 水平速度 (1: 右, -1: 左, 0: 不动)
let dy = 0; // 垂直速度 (1: 下, -1: 上, 0: 不动)
let changingDirection = false; // 防止快速连续改变方向导致bug

// 食物
let food = { x: -1, y: -1 };
const foodColor = '#FF5252';

// 道具系统
let powerUp = null; // { x, y, type: 'speedBoost' }
const powerUpColor = '#FFC107'; // Material Amber 500 for power-ups
const powerUpSpawnChance = 0.1; // 10% chance to spawn when food is eaten
let speedBoostActive = false;
let speedBoostTimer = null;
const speedBoostDuration = 5000; // 5 seconds
const boostMultiplier = 0.5; // Speed becomes 50% of normal (faster)

// canvas.width and canvas.height will be set by applyMapSettings

function applyMapSettings(sizeValue) {
    tileCount = mapTileCounts[sizeValue] || mapTileCounts['medium']; // Default to medium if invalid
    canvas.width = gridSize * tileCount;
    canvas.height = gridSize * tileCount;
    clearCanvas(); // Clear with new dimensions
    drawGrid();    // Redraw grid for new dimensions
    console.log(`Map settings applied: ${sizeValue} (${tileCount}x${tileCount})`);
}

function drawGrid() {
    ctx.strokeStyle = '#ccc'; // 网格线颜色
    for (let i = 0; i <= tileCount; i++) {
        // 绘制垂直线
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        // 绘制水平线
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
}

// 在 game.js 中，根据当前模式决定下一步方向
function decideDirection() {
    if (currentMode === 'ai') {
         // 注意：这里假设 ai-controller.js 中的 getAiNextMove 在全局作用域中可用
        const nextMove = getAiNextMove(snake, food, tileCount, tileCount);
        if (nextMove) {
            // 防止 AI 试图立即 180 度转向
            const isOppositeDirection = (dx === -nextMove.nextDx && dx !== 0) || (dy === -nextMove.nextDy && dy !== 0);
            if (!isOppositeDirection) {
                dx = nextMove.nextDx;
                dy = nextMove.nextDy;
                 // 在 AI 模式下，我们不设置 changingDirection=true，因为 AI 的决策是即时的
            } else {
                console.warn("AI: Attempted 180 degree turn, maintaining direction.");
            }
        }
         // 如果 getAiNextMove 返回 null 或无效值，保持当前方向 (dx, dy 不变)
    }
    // 手动模式的方向由 changeDirection 事件监听器处理
}

function gameLoop() {
    if (gameState === 'running') {
        // 获取当前分数对应的基础速度
        let currentSpeed = getCurrentSpeed(score);
        // 如果速度提升道具激活，则应用倍率
        if (speedBoostActive) {
            currentSpeed *= boostMultiplier;
            console.log("Using boosted speed:", currentSpeed); // Optional: Log boosted speed
        }
        
        setTimeout(() => {
            if (gameState !== 'running') return;

            decideDirection();

            changingDirection = false;
            clearCanvas();
            // TODO: Optionally draw a visual indicator for speed boost?
            drawGrid();
            moveSnake();
            if (checkCollision()) {
                // Consider deactivating boost/timer on game over?
                // clearTimeout(speedBoostTimer);
                // speedBoostActive = false;
                gameOver();
                return;
            }
            drawFood();
            drawPowerUp();
            drawSnake();

            gameLoop();
        }, currentSpeed); // 使用最终计算出的速度
    }
}

function clearCanvas() {
    ctx.fillStyle = '#e0e0e0'; // 画布背景色
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function initializeSnake() {
    snake = [];
    const startX = Math.floor(tileCount / 2);
    const startY = Math.floor(tileCount / 2);
    for (let i = 0; i < initialSnakeLength; i++) {
        snake.push({ x: startX - i, y: startY });
    }
    dx = 1; // 初始向右移动
    dy = 0;
}

function createFood() {
    let newFoodPosition;
    do {
        newFoodPosition = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
    food = newFoodPosition;
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize -1, gridSize -1);
}

function createPowerUp() {
    // Only one power-up at a time
    if (powerUp !== null) return;

    // Check spawn chance
    if (Math.random() < powerUpSpawnChance) {
         let newPowerUpPosition;
         do {
             newPowerUpPosition = {
                 x: Math.floor(Math.random() * tileCount),
                 y: Math.floor(Math.random() * tileCount)
             };
         // Ensure power-up doesn't spawn on the snake or food
         } while (
             (food.x === newPowerUpPosition.x && food.y === newPowerUpPosition.y) ||
             snake.some(segment => segment.x === newPowerUpPosition.x && segment.y === newPowerUpPosition.y)
         );
        powerUp = { ...newPowerUpPosition, type: 'speedBoost' };
        console.log("Speed Boost spawned at:", powerUp.x, powerUp.y);
    }
}

function drawPowerUp() {
    if (powerUp) {
        ctx.fillStyle = powerUpColor;
        // Maybe draw slightly different shape? For now, same as food.
        ctx.fillRect(powerUp.x * gridSize, powerUp.y * gridSize, gridSize -1, gridSize -1);
    }
}


function moveSnake() {
    // Calculate the new head position based on current direction
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    // Add the new head to the beginning of the snake array
    snake.unshift(head);

    // Check if the new head position overlaps with the food position
    const ateFood = head.x === food.x && head.y === food.y;

    if (ateFood) {
        // If food is eaten:
        score += 10;
        updateScoreboard();
        // Check for level up AFTER updating score
        if (checkLevelUp(score)) {
            // Speed will be updated in the next gameLoop call via getCurrentSpeed
            console.log("Speed will increase!");
            // Optionally, update UI to show new level
        }
        createFood();
        // Maybe spawn a power-up after eating food
        createPowerUp();
                                
    } else {
        // If no food is eaten:
        snake.pop();
    }

     // Check for collision with power-up *after* moving head, before removing tail
     if (powerUp && head.x === powerUp.x && head.y === powerUp.y) {
         activatePowerUp(powerUp.type);
         powerUp = null; // Remove the power-up from the game
     }
}

function drawSnake() {
    ctx.fillStyle = '#2196F3'; // Material Blue 500 for snake
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize -1 , gridSize -1); // -1 for grid line visibility
    });
}

function checkCollision() {
    const head = snake[0];

    // 检查是否撞墙
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        console.log("Collision with wall detected!");
        return true;
    }

    // 检查是否撞到自身 (从第二个片段开始检查)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            console.log("Collision with self detected!");
            return true;
        }
    }

    return false;
}

function gameOver() {
    console.log("Game Over!");
    gameState = 'gameOver';
    // 停止游戏循环 (setTimeout 会自动停止，因为 gameState 不再是 'running')
    // 可以在这里显示游戏结束信息或重置按钮
    startBtn.style.display = 'inline-block'; // 显示开始按钮以重新开始
    pauseBtn.style.display = 'none';

    difficultySelect.disabled = false;
    mapSizeSelect.disabled = false;
    
    // 可以在 Canvas 上绘制 "Game Over" 文字
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, canvas.height / 3, canvas.width, canvas.height / 3);
    ctx.font = '40px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(translate('gameOverText'), canvas.width / 2, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText(translate('gameOverScore', { score: score }), canvas.width / 2, canvas.height / 2 + 40);

}


// 初始化游戏
function init() {
    console.log("Initializing game...");
    loadHighScore(); // Load high score on init
    // updateScoreboard is called within setLanguage -> updateUIText
    setupEventListeners();
    setLanguage(currentLanguage); // Apply initial language

    currentDifficulty = difficultySelect.value; // Initialize from HTML state
    currentMapSize = mapSizeSelect.value; // Initialize from HTML state
    applyMapSettings(currentMapSize); // Apply initial map size

    difficultySelect.disabled = false;
    mapSizeSelect.disabled = false;

    resetLevel(); // This might need to be difficulty-aware later
    initializeSnake(); // Uses new tileCount
    createFood();    // Uses new tileCount
    powerUp = null;
    // drawGrid is called by applyMapSettings
    drawFood();
    drawSnake();
    // gameLoop();
}

function updateScoreboard() {
    scoreValueElement.textContent = score;
    highScoreValueElement.textContent = highScore; // Update high score display
}

function setupEventListeners() {
    modeSwitchBtn.addEventListener('click', toggleGameMode);
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePauseGame);
    document.addEventListener('keydown', changeDirection);
    difficultySelect.addEventListener('change', handleDifficultyChange);
    mapSizeSelect.addEventListener('change', handleMapSizeChange);
    langSwitchBtn.addEventListener('click', () => {
      setLanguage(currentLanguage === 'zh' ? 'en' : 'zh');
    });
}

function handleMapSizeChange() {
    currentMapSize = mapSizeSelect.value;
    console.log(`Map size set to: ${currentMapSize}`);
    // Apply changes immediately if game is not running, otherwise will apply on next game start
    if (gameState === 'initial' || gameState === 'gameOver') {
        applyMapSettings(currentMapSize);
        initializeSnake(); // Re-initialize snake for new map size
        createFood();    // Re-create food for new map size
        drawFood();
        drawSnake();
        resetLevel(); // Reset level progression
        score = 0; // Reset score
        updateScoreboard();
        // If game was 'gameOver', it remains 'gameOver', but visually reset.
        // If it was 'initial', it remains 'initial'.
        if (gameState === 'gameOver') { // Redraw game over screen if it was active
            // Simplified redraw, or call a specific function to redraw game over overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, canvas.height / 3, canvas.width, canvas.height / 3);
            ctx.font = '40px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(translate('gameOverText'), canvas.width / 2, canvas.height / 2);
            ctx.font = '20px Arial';
            ctx.fillText(translate('gameOverMapChanged'), canvas.width / 2, canvas.height / 2 + 40);
        }
    }
    updateUIText(); // Ensure dropdown labels are also updated if language changed before map size
}

function handleDifficultyChange() {
    currentDifficulty = difficultySelect.value;
    console.log(`Difficulty set to: ${currentDifficulty}`);
    // Difficulty change will take effect on the next game start.
    // Controls are disabled during an active game, so this typically fires when game is not running.
}

function changeDirection(event) {
    // 仅在手动模式下, 且不在本轮循环中改变方向时处理
    if (currentMode !== 'manual' || changingDirection) return;

    const keyPressed = event.key;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if ((keyPressed === 'ArrowLeft' || keyPressed.toLowerCase() === 'a') && !goingRight) {
        dx = -1; dy = 0; changingDirection = true;
    } else if ((keyPressed === 'ArrowUp' || keyPressed.toLowerCase() === 'w') && !goingDown) {
        dx = 0; dy = -1; changingDirection = true;
    } else if ((keyPressed === 'ArrowRight' || keyPressed.toLowerCase() === 'd') && !goingLeft) {
        dx = 1; dy = 0; changingDirection = true;
    } else if ((keyPressed === 'ArrowDown' || keyPressed.toLowerCase() === 's') && !goingUp) {
        dx = 0; dy = 1; changingDirection = true;
    }
}


function startGame() {
    if (gameState === 'initial' || gameState === 'gameOver') {
        console.log("Starting game...");
        gameState = 'running';
        score = 0;
        updateScoreboard();

        // TODO: Inform level-system.js about the currentDifficulty,
        // e.g., by calling a function like setLevelDifficulty(currentDifficulty);
        // This function would adjust parameters in level-system.js.
        
        applyMapSettings(currentMapSize); // Apply selected map size settings
        resetLevel(); // This function in level-system.js might need to be adapted for difficulty

        initializeSnake(); // Uses new tileCount from applyMapSettings
        createFood();    // Uses new tileCount from applyMapSettings
        powerUp = null; // Reset power-up on new game
        
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        // pauseBtn.textContent is handled by updateUIText

        difficultySelect.disabled = true;
        mapSizeSelect.disabled = true;
        
        gameLoop();
    } else if (gameState === 'paused') {
        resumeGame();
    }
}

function togglePauseGame() {
    if (gameState === 'running') {
        pauseGame();
    } else if (gameState === 'paused') {
        resumeGame();
    }
}

function pauseGame() {
    if (gameState === 'running') {
        gameState = 'paused';
        // pauseBtn.textContent is handled by updateUIText
        updateUIText(); // Update button text
        console.log("Game paused");
        if (gameLoopId) {
            cancelAnimationFrame(gameLoopId);
        }
    }
}

function activatePowerUp(type) {
     console.log("Activating power-up:", type);
     if (type === 'speedBoost') {
        if (speedBoostTimer) {
            clearTimeout(speedBoostTimer); // Clear existing timer if any
        }
        speedBoostActive = true;
        console.log("Speed Boost ACTIVE!");
        // Set a timer to deactivate the boost
        speedBoostTimer = setTimeout(() => {
            speedBoostActive = false;
            speedBoostTimer = null;
            console.log("Speed Boost EXPIRED.");
        }, speedBoostDuration);
     }
     // Add other power-up types here later (e.g., shield)
}

function resumeGame() {
    if (gameState === 'paused') {
        gameState = 'running';
        // pauseBtn.textContent is handled by updateUIText
        updateUIText(); // Update button text
        console.log("Game resumed");
        gameLoop(); // 继续游戏循环
    }
}

function toggleGameMode() {
    if (currentMode === 'manual') {
        currentMode = 'ai';
        // modeSwitchBtn.textContent is handled by updateUIText
        console.log("Switched to AI mode");
    } else {
        currentMode = 'manual';
        // modeSwitchBtn.textContent is handled by updateUIText
        console.log("Switched to Manual mode");
        currentAiPath = null; // 清除 AI 路径缓存
    }
    updateUIText(); // Update button text
}

// --- Local Storage Functions ---
function saveHighScore() {
    try {
        localStorage.setItem(highScoreKey, highScore.toString());
    } catch (e) {
        console.error("Failed to save high score to localStorage:", e);
    }
}

function loadHighScore() {
    try {
        const storedScore = localStorage.getItem(highScoreKey);
        if (storedScore !== null) {
            highScore = parseInt(storedScore, 10) || 0; // Ensure it's a number
        } else {
            highScore = 0; // Default if nothing is stored
        }
        console.log("Loaded high score:", highScore);
    } catch (e) {
        console.error("Failed to load high score from localStorage:", e);
        highScore = 0; // Default on error
    }
}

window.onload = init;

// 更多游戏逻辑将在这里添加
// 示例：增加分数的函数 (将在后续任务中实际使用)
// function increaseScore(points) {
//     score += points;
//     updateScoreboard();
// }