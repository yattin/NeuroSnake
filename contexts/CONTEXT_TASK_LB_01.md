# Task Context: TASK_LB_01
## Task Description
Design leaderboard data structure (player name, score, difficulty, map size, date).

## Implementation Details
The leaderboard will store an array of score entries. Each entry will be an object with the following properties:

- `playerName`: (string) The name of the player. Default to "Player" if not provided.
- `score`: (number) The score achieved by the player.
- `difficulty`: (string) The difficulty level at which the score was achieved (e.g., "Easy", "Medium", "Hard").
- `mapSize`: (string) The map size used for the game (e.g., "Small", "Medium", "Large").
- `date`: (string) The ISO 8601 timestamp of when the score was achieved (e.g., "2025-06-01T23:50:00Z").

The leaderboard itself will be an array of these score entry objects, sorted in descending order of `score`.
A maximum number of entries will be kept (e.g., top 10).

Example of a single entry:
```json
{
  "playerName": "Roo",
  "score": 1250,
  "difficulty": "Medium",
  "mapSize": "Medium",
  "date": "2025-06-01T23:50:00Z"
}
```

## File Changes
No direct file changes in this task. This design will inform subsequent tasks.

## Notes
- Consider allowing players to input their names. For now, a default or a simple prompt might suffice.
- The date will help in tracking when high scores were achieved.

## Status Summary
Leaderboard data structure design completed. Ready for implementation in `TASK_LB_02`.