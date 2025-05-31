# Task Context: TASK_I18N
## Task Description
Implement full interface internationalization (i18n) for the NeuroSnake game, supporting Chinese (zh-CN) and English (en). This involves creating a translation management system, updating UI elements to be translatable, and providing a language switching mechanism.

## I18N Strategy and Data Structure (TASK13_I18N_STRATEGY)

### 1. Translation Storage
- Translations will be stored in a JavaScript object named `translations` within `game.js`. This keeps things simple for a small project.
- The object will be structured with language codes (e.g., `en`, `zh`) as top-level keys.
- Each language will have an object containing key-value pairs, where the key is a unique identifier for a string (e.g., `startGameButton`) and the value is the translated text.

Example structure:
```javascript
const translations = {
  en: {
    scoreLabel: "Score: ",
    highScoreLabel: "High Score: ",
    startBtn: "Start",
    pauseBtn: "Pause",
    resumeBtn: "Resume",
    // ... more strings
  },
  zh: {
    scoreLabel: "分数: ",
    highScoreLabel: "最高分: ",
    startBtn: "开始",
    pauseBtn: "暂停",
    resumeBtn: "继续",
    // ... more strings
  }
};
```

### 2. Identifying Translatable Elements
- HTML elements that need translation will be identified using a `data-i18n-key` attribute. The value of this attribute will correspond to a key in the `translations` object.
  Example: `<button id="startBtn" data-i18n-key="startBtn">Start</button>`
- For dynamic text not directly in HTML (e.g., game over messages, alert content), JavaScript functions will retrieve translations.

### 3. JavaScript Logic
- **`currentLanguage` variable**: A global variable in `game.js` (e.g., `let currentLanguage = 'en';`) will store the active language. It can be initialized from `localStorage` to remember user preference.
- **`setLanguage(langCode)` function**:
    - Sets `currentLanguage` to `langCode`.
    - Stores `langCode` in `localStorage`.
    - Calls `updateUIText()` to refresh all translatable elements.
- **`translate(key)` function**:
    - Takes a `key` as input.
    - Returns the translated string from `translations[currentLanguage][key]`.
    - Includes a fallback to a default language (e.g., English) if a translation is missing for the current language.
- **`updateUIText()` function**:
    - Selects all elements with a `data-i18n-key` attribute.
    - Iterates through them and updates their `textContent` or relevant property (e.g., `value` for inputs, `innerHTML` if HTML content is needed) using `translate(element.dataset.i18nKey)`.
    - Handles specific cases like button text changes based on game state (e.g., Start/Pause/Resume).

### 4. Language Switching Mechanism
- A language switch button will be added to `index.html`.
- Clicking this button will toggle `currentLanguage` between 'en' and 'zh' and call `setLanguage()`.

## Implementation Details (Subsequent Tasks)
- **TASK14_I18N_UI**: Add language switch button to `index.html`. Add `data-i18n-key` attributes to all static text elements. [completed]
- **TASK15_I18N_JS**: Implement `translations` object, `currentLanguage`, `setLanguage`, `translate`, and `updateUIText` functions in `game.js`. Modify existing functions (e.g., `startGame`, `gameOver`, `updateScoreboard`) to use the `translate` function for dynamic text. [completed]
- **TASK16_I18N_INSTRUCTIONS**: Modify the game instructions display logic. Instead of two separate divs, use one div and dynamically set its content based on the selected language using the i18n system. [completed]
- **TASK17_I18N_CSS**: Style the new language switch button. [completed]
- **TASK18_I18N_TEST**: Test language switching for all UI elements and instructions. [completed]
- **TASK19_FEATURES_TEST**: Re-test difficulty and map size functionalities, ensuring their labels and options are also internationalized. [completed]
- **TASK20_FINAL_REVIEW**: Final review of all new features. [completed]

## File Changes
- `PROJECT_PLAN.md` (updated)
- `contexts/CONTEXT_TASK_DIFFICULTY_MAPSIZE.md` (updated to reflect i18n impact)
- `index.html` (to be modified for language switcher and data attributes)
- `game.js` (to be modified for i18n logic and translations)
- `style.css` (to be modified for language switcher styling)

## Status Summary
TASK20_FINAL_REVIEW: Final review completed. All I18N related tasks are finished.