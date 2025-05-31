# Task Context: TASK6_OPTIMIZE_CSS
## Task Description
Update `style.css` to implement the new side-by-side layout for the game canvas and instructions panel, and to visually optimize the instructions panel based on user feedback (screenshot).

## Implementation Details
- **Layout Changes**:
  - Added new CSS rules for `.game-main-area` (created in TASK5):
    - `display: flex` to enable side-by-side layout of its children (canvas and instructions).
    - `gap: 20px` for spacing between canvas and instructions.
    - `align-items: flex-start` to align them to the top.
    - `width: 100%` and `margin-top: 15px`.
- **Canvas Styling**:
  - Ensured `#gameCanvas` has `flex-shrink: 0` to prevent it from shrinking in the flex container.
- **Instructions Panel Styling (`.game-instructions`)**:
  - The entire block of styles for `.game-instructions` and its children was replaced.
  - `width: 320px` (fixed width).
  - `flex-shrink: 0`.
  - Adjusted `padding`, `background-color` (kept white), `border-radius`, `box-shadow`.
  - Text styles (font sizes for `h3`, `p`, `li`; line heights; colors) were fine-tuned for better readability and to fit the new panel size.
  - Spacing between English and Chinese sections adjusted.
- The `edit_block` function was used to replace the old instruction styles with the new comprehensive set of styles for layout and appearance.

## File Changes
- Modified: `C:\codes\ai-tools\demo6\style.css`

## Notes
- The CSS changes are intended to match the layout shown in the user's screenshot, where instructions are to the right of the canvas.
- The `.game-container` might need its `width` or `max-width` adjusted if it's too narrow to comfortably fit the canvas and the 320px wide instruction panel side-by-side plus padding and gap. This was not explicitly handled in this step but should be considered during review (TASK7).

## Status Summary
- TASK6 is completed. `style.css` has been updated.
- Next step is TASK7: Review and verify the optimization changes.