# Task Context: TASK2
## Task Description
Modify `index.html` to add a new section for bilingual (Chinese and English) game instructions. The section should be placed appropriately within the existing HTML structure, likely after the main game container.

## Implementation Details
- A new `div` with class `game-instructions` was added to `index.html`.
- This `div` contains two child `div`s:
    - `div.instructions-en` for English instructions.
    - `div.instructions-zh` for Chinese instructions.
- Each language-specific `div` includes a heading (`h3`) and paragraphs/lists (`p`, `ul`, `li`) detailing game controls, button functions, and objectives.
- The new section was inserted after the `div.game-container` closing tag and before the script tags, maintaining the placement of the `<!-- UI 元素将在这里添加 -->` comment.
- The `edit_block` function was used with `expected_replacements: 1` for precise modification.

## File Changes
- Modified: `C:\codes\ai-tools\demo6\index.html`

## Notes
- The HTML structure is now ready for styling in TASK3.
- The instructions content was based on the draft from TASK1.

## Status Summary
- TASK2 is completed. `index.html` has been updated with the new instruction section.
- Next step is TASK3: Add CSS styles to `style.css` for the new elements.