# NeuroSnake 🧠🐍

一个经典的贪食蛇游戏，但加入了 AI 模式！看着 AI 使用 A\* 算法智能地寻找食物吧。

## ✨ 功能

*   **经典贪食蛇玩法**: 控制小蛇吃食物，不断变长，挑战自己的最高分。
*   **AI 模式**: 切换到 AI 模式，观察使用 A\* 寻路算法的 AI 如何自动游戏。
*   **Material Design UI**: 简洁美观的界面元素。
*   **关卡系统**: 随着分数的提高，游戏速度会加快，增加挑战性。
*   **道具系统**: 随机出现加速道具，拾取后短时间内速度翻倍！
*   **最高分记录**: 使用浏览器 `localStorage` 自动保存并显示你的最高分。

## 🚀 如何运行

1.  克隆或下载此仓库。
2.  直接在现代浏览器中打开 [`index.html`](index.html:1) 文件即可开始游戏。

## 🎮 控制

*   **方向键 (↑ ↓ ← →) 或 WASD**: 控制蛇的移动方向。
*   **开始/暂停/继续 按钮**: 控制游戏的开始、暂停和恢复。
*   **切换模式 按钮**: 在手动模式和 AI 模式之间切换。

## 🛠️ 技术栈

*   HTML5
*   CSS3 (Material Design 风格)
*   JavaScript (ES6+)
*   A\* 寻路算法 (AI 控制)

## 💡 未来可能的改进

*   **更多道具**: 例如减速、穿墙、分数翻倍等。
*   **障碍物**: 在某些关卡添加静态或动态障碍物。
*   **更智能的 AI**:
    *   考虑更长远的路径规划（例如，避免将自己困住）。
    *   实现更安全的路径选择，而不仅仅是最短路径。
    *   优化 A\* 算法性能。
*   **触摸屏支持**: 添加移动端触摸控制。
*   **UI 改进**: 例如，显示当前关卡、道具效果倒计时等。
*   **代码重构**: 例如，将不同模块（UI、游戏逻辑、AI）进一步解耦。

## 🙏 致谢

本项目设计灵感来源于经典的贪食蛇游戏。