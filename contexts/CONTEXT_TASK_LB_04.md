# Task Context: TASK_LB_04
## Task Description
Implement logic in [`game.js`](game.js:1) to read and display leaderboard data from local storage.

## Implementation Details
- Added `leaderboardTitle` translations to the `translations` object for both 'en' and 'zh'.
- Created a new function `displayLeaderboard()`:
    - Gets the `leaderboardList` DOM element.
    - Clears any existing content from `leaderboardList`.
    - Retrieves and parses leaderboard data from `localStorage` (using `leaderboardKey`).
    - If the leaderboard is empty, displays a message (e.g., "No scores yet. Be the first!"). Added a placeholder `leaderboardEmpty` key for this message, which needs to be added to `translations`.
    - If leaderboard has entries, iterates through them:
        - Creates an `<li>` element for each entry.
        - Formats the text content to show rank, player name, score, difficulty, map size, and date.
        - Appends the `<li>` to `leaderboardList`.
    - Calls `updateUIText()` at the end to ensure the leaderboard title is translated.
- Called `displayLeaderboard()` in the `init()` function to show the leaderboard on page load.
- Called `displayLeaderboard()` in the `gameOver()` function to update the leaderboard after a game.

## File Changes
- Modified [`game.js`](game.js:1):
    - Added `leaderboardTitle` to `translations.en` (around line 55) and `translations.zh` (around line 88).
    - Added the `displayLeaderboard()` function (around line 661, before `window.onload`).
    - Called `displayLeaderboard()` at the end of `init()` (around line 464).
    - Called `displayLeaderboard()` at the end of `gameOver()` (around line 408).

## Notes
- A new translation key `leaderboardEmpty` was mentioned for the "No scores yet" message; this key needs to be added to the `translations` object in [`game.js`](game.js:23) for both languages.
- The date formatting uses `toLocaleDateString()`, which is locale-sensitive and generally good.

## Status Summary
Logic for reading and displaying leaderboard data has been implemented in [`game.js`](game.js:1). Ready for `TASK_LB_05`.