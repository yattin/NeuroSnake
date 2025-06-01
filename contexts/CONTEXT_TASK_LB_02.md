# Task Context: TASK_LB_02
## Task Description
Implement logic in [`game.js`](game.js:1) to save scores to local storage upon game over.

## Implementation Details
- Added `leaderboardKey` and `MAX_LEADERBOARD_ENTRIES` constants.
- Created a new function `saveToLeaderboard(currentScore)`:
    - Takes the current score as input.
    - Constructs a new leaderboard entry object with `playerName` (default "Player"), `score`, `currentDifficulty`, `currentMapSize`, and current `date` (ISO string).
    - Retrieves the existing leaderboard from `localStorage` using `leaderboardKey`.
    - Parses the stored JSON or initializes an empty array if no data or parsing fails.
    - Adds the new entry to the leaderboard array.
    - Sorts the leaderboard by score in descending order.
    - Truncates the leaderboard to `MAX_LEADERBOARD_ENTRIES`.
    - Saves the updated leaderboard back to `localStorage` as a JSON string.
    - Includes `try-catch` blocks for `localStorage` operations to handle potential errors.
- Called `saveToLeaderboard(score)` at the end of the `gameOver()` function in [`game.js`](game.js:405).

## File Changes
- Modified [`game.js`](game.js:1):
    - Added constants `leaderboardKey` and `MAX_LEADERBOARD_ENTRIES` near line 11.
    - Added new function `saveToLeaderboard(currentScore)` after the `gameOver()` function (around line 407).
    - Called `saveToLeaderboard(score)` inside `gameOver()` (around line 405).

## Notes
- Player name is currently hardcoded as "Player". This can be enhanced later to allow user input.
- Error handling for `localStorage` operations is included.

## Status Summary
Logic for saving scores to local storage upon game over has been implemented in [`game.js`](game.js:1). Ready for `TASK_LB_03`.