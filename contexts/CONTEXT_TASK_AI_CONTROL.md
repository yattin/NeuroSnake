# Task Context: TASK_AI_CONTROL
## Task Description
AI 控制系统，包含以下子任务：
- TASK_AI_CONTROL_ASTAR: A*寻路算法实现 (ai-controller.js)
- TASK_AI_CONTROL_PATH_OPTIMIZATION: 路径优化决策逻辑 (ai-controller.js)
- TASK_AI_CONTROL_MODE_SWITCH: 手动/AI模式切换 (game.js, ai-controller.js)

当前子任务是 **TASK_AI_CONTROL_ASTAR**。

## Implementation Details for TASK_AI_CONTROL_ASTAR
- **目标**: 在 [`ai-controller.js`](ai-controller.js:1) 中实现 A* 算法，用于计算从蛇头到食物的最短路径。
- **输入**: 算法需要蛇的当前位置 (特别是蛇头)、食物位置和游戏网格 (用于避开障碍物，即蛇的身体)。
- **输出**: 返回一个从蛇头到食物的路径坐标序列 (例如 `[{x: 10, y: 10}, {x: 11, y: 10}, ...]`)，或者如果找不到路径则返回 null/空数组。
- **A* 核心**:
    - **节点**: 网格中的每个单元格可以看作一个节点，包含 `x`, `y` 坐标, `g` (从起点到该节点的实际代价), `h` (从该节点到终点的估算代价，通常使用曼哈顿距离), `f` (总代价, `f = g + h`), 以及 `parent` (用于回溯路径)。
    - **Open Set**: 存储待评估的节点。
    - **Closed Set**: 存储已评估过的节点。
    - **算法流程**:
        1. 将起点加入 Open Set。
        2. 当 Open Set 不为空时：
           a. 从 Open Set 中找到 `f` 值最低的节点 (当前节点)。
           b. 将当前节点从 Open Set 移到 Closed Set。
           c. 如果当前节点是终点，则回溯父节点构建路径并返回。
           d. 遍历当前节点的邻居：
              i. 如果邻居是障碍物 (蛇身) 或在 Closed Set 中，则跳过。
              ii. 计算到邻居的 `g` 值。
              iii. 如果邻居不在 Open Set 中，或新的路径到邻居更优 (`g` 值更小)：
                  - 更新邻居的 `g`, `h`, `f` 值和 `parent`。
                  - 如果邻居不在 Open Set 中，则将其加入。
- **集成**: 已创建 `findPath(startX, startY, endX, endY, gridWidth, gridHeight, obstacles)` 函数。

**TASK_AI_CONTROL_ASTAR 已完成。**
**TASK_AI_CONTROL_PATH_OPTIMIZATION 已完成。**
**TASK_AI_CONTROL_MODE_SWITCH 已完成。**

## File Changes
- `contexts/CONTEXT_TASK_AI_CONTROL.md` (updated)
- `ai-controller.js` (updated with `Node` class, `heuristic` function, `findPath` A* implementation, and `getAiNextMove` decision logic function)
- `game.js` (updated to integrate AI control: added `decideDirection` function, modified `gameLoop` to call it, restricted `changeDirection` to manual mode, updated `toggleGameMode` to clear AI path)

## Notes
AI 控制系统现已集成到游戏循环中。
- 游戏在 AI 模式下会调用 `getAiNextMove` 来控制蛇的方向。
- 手动输入在 AI 模式下会被忽略。
- 切换回手动模式会清除 AI 缓存。

## Status Summary
所有 `TASK_AI_CONTROL` 下的子任务均已完成。下一个主要任务是 `TASK_ADVANCED_FEATURES`。