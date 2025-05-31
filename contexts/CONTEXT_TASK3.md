# Task Context: TASK3
## Task Description
Add CSS rules to `style.css` to style the new game instruction section (`.game-instructions` and its children) added in TASK2. The styling should be consistent with the existing Material Design theme of the game.

## Implementation Details
- New CSS rules were added to `style.css` for the following selectors:
  - `.game-instructions`: Overall container for the instructions. Styled with background, padding, border-radius, shadow, max-width, and centered alignment to match `.game-container`.
  - `.game-instructions h3`: Headings for English and Chinese sections. Styled with font size, color (Material Blue), bottom border.
  - `.game-instructions p, .game-instructions li`: Paragraphs and list items. Styled for font size, line height, color.
  - `.game-instructions strong`: Bolded text. Styled for font weight and color.
  - `.game-instructions ul`: Unordered lists. Styled for list style and padding.
  - Specific rules for spacing between `.instructions-en` and `.instructions-zh` and for the last child to remove bottom margin.
- The styles were inserted before the `/* 更多样式将在这里添加 */` comment in `style.css`.
- The `edit_block` function was used for precise modification.

## File Changes
- Modified: `C:\codes\ai-tools\demo6\style.css`

## Notes
- The styling aims to integrate the instruction section seamlessly with the existing UI.
- With HTML and CSS changes complete, the next step is to review the visual output and verify functionality (though no new functionality was added, only display elements).

## Status Summary
- TASK3 is completed. `style.css` has been updated with styles for the game instructions.
- Next step is TASK4: Review and verify the changes.