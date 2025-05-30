# Task Context: TASK_CORE_LOGIC
## Task Description
核心游戏逻辑，包含以下子任务：
- TASK_CORE_LOGIC_SNAKE_MOVEMENT: 蛇移动与生长算法 (game.js)
- TASK_CORE_LOGIC_FOOD_GENERATION: 随机食物生成机制 (game.js)
- TASK_CORE_LOGIC_COLLISION_DETECTION: 碰撞检测系统（墙/自身） (game.js)
- TASK_CORE_LOGIC_SCORING: 基础计分系统 (game.js)

当前子任务是 **TASK_CORE_LOGIC_SNAKE_MOVEMENT**。

## Implementation Details for TASK_CORE_LOGIC_SNAKE_MOVEMENT
- **蛇的数据结构**: 使用一个对象数组表示蛇身，每个对象包含 `x` 和 `y` 坐标（网格单位）。例如 `[{x: 10, y: 10}, {x: 9, y: 10}]`，数组第一个元素是蛇头。
- **初始状态**: 蛇初始长度为2-3格，位于画布中央。
- **移动逻辑**:
    - 记录当前移动方向 (上, 下, 左, 右)。
    - 每次游戏循环更新时，根据方向计算蛇头的新位置。
    - 将新蛇头添加到蛇身数组的开头。
    - 如果蛇没有吃到食物，移除蛇尾。
- **生长逻辑**: 当蛇吃到食物时，不移除蛇尾，从而实现生长。
- **键盘控制**: 监听键盘方向键事件，更新蛇的移动方向。确保不能直接反向移动（例如，蛇向右时不能直接向左）。
- **绘制蛇**: 在 `gameLoop` 中，遍历蛇身数组，在 Canvas 上绘制每个蛇身部分。
- **游戏速度**: 使用 `setTimeout` 控制游戏循环的速率。

**TASK_CORE_LOGIC_SNAKE_MOVEMENT 已完成。**
**TASK_CORE_LOGIC_FOOD_GENERATION 已完成。**
**TASK_CORE_LOGIC_COLLISION_DETECTION 已完成。**
**TASK_CORE_LOGIC_SCORING 已完成。** (基础计分逻辑已包含在食物生成任务中)

## File Changes
- `contexts/CONTEXT_TASK_CORE_LOGIC.md` (updated)
- `game.js` (updated with `checkCollision` and `gameOver` functions, integrated collision check into `gameLoop`. Scoring logic was previously implemented.)

## Notes
游戏现在可以检测蛇头与墙壁或蛇身的碰撞。
发生碰撞时，游戏状态变为 'gameOver'，游戏循环停止，并显示结束画面和最终分数。
基础计分系统（吃食物得分）已按预期工作。

## Status Summary
所有 `TASK_CORE_LOGIC` 下的子任务均已完成。下一个主要任务是 `TASK_AI_CONTROL`。