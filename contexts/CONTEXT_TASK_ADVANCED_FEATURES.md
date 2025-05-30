# Task Context: TASK_ADVANCED_FEATURES
## Task Description
高级功能，包含以下子任务：
- TASK_ADVANCED_FEATURES_LEVEL_SYSTEM: 关卡系统（速度/障碍物递增） (level-system.js, game.js)
- TASK_ADVANCED_FEATURES_ITEM_SYSTEM: 道具系统（加速/减速/护盾） (game.js)
- TASK_ADVANCED_FEATURES_LOCAL_STORAGE: 本地分数存储 (game.js)

当前子任务是 **TASK_ADVANCED_FEATURES_LEVEL_SYSTEM**。

## Implementation Details for TASK_ADVANCED_FEATURES_LEVEL_SYSTEM
-  **目标**: 实现一个关卡系统，随着分数的提高，游戏难度增加（蛇的速度加快，可能出现障碍物）。
-  **文件**:
    -  在 [`level-system.js`](level-system.js:1) 中定义关卡数据和逻辑。
    -  在 [`game.js`](game.js:1) 中集成关卡系统。
-  **关卡逻辑 (`level-system.js`)**:
    -  定义关卡阈值（例如，每得 50 分升一级）。
    -  定义每个关卡对应的速度 (`snakeSpeed`)。
    -  （可选）定义每个关卡对应的障碍物布局或生成规则。
    -  提供函数来获取当前关卡、检查是否升级、获取当前关卡速度/障碍物设置。
-  **集成 (`game.js`)**:
    -  引入 `level-system.js` 的功能。
    -  在 `init` 和 `startGame` 中初始化关卡状态。
    -  在 `moveSnake` 中吃到食物后检查是否满足升级条件。
    -  如果升级：
        -  更新当前关卡。
        -  更新 `snakeSpeed`。
        -  （如果实现障碍物）生成或更新障碍物，并确保食物和蛇不生成在障碍物上。
        -  可能需要更新 UI 显示当前关卡。
    -  在 `checkCollision` 中增加对障碍物的碰撞检测。
    -  在 `drawGrid` 或单独的函数中绘制障碍物。
    -  A* 算法 (`ai-controller.js`) 未来如果添加障碍物，需要将障碍物也视为不可通行的区域。
    
    **TASK_ADVANCED_FEATURES_LEVEL_SYSTEM 已完成。** (仅速度递增)
    **TASK_ADVANCED_FEATURES_ITEM_SYSTEM 已完成。** (仅加速道具)
    **TASK_ADVANCED_FEATURES_LOCAL_STORAGE 已完成。**
    
    ## File Changes
    - `contexts/CONTEXT_TASK_ADVANCED_FEATURES.md` (updated)
    - `level-system.js` (updated with level definitions and functions)
    - `game.js` (updated to integrate level system, item system, and local storage: added high score variables/elements, `saveHighScore`, `loadHighScore` functions; integrated loading/saving/displaying high score logic into `init`, `gameOver`, `updateScoreboard`)
    - `index.html` (updated with high score display element)
    - `style.css` (updated with styles for high score display)
    
    ## Notes
    实现了基于分数的关卡系统（仅速度）。
    实现了一个加速道具 (`speedBoost`)。
    实现了最高分记录功能，使用 `localStorage` 在浏览器中持久化存储最高分。
    
    ## Status Summary
    所有 `TASK_ADVANCED_FEATURES` 下的子任务均已完成。所有计划任务均已完成。