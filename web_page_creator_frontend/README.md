# Ocean Page Builder (LightningJS + Blits)

Modern web page creator UI following the Ocean Professional theme.

## Features
- Top bar, left sidebar (Tools + Templates), central canvas, right properties panel
- Add blocks: Text, Button, Image, Section
- Select and move blocks with arrow keys (8px nudge)
- Edit properties from the Properties panel:
  - Text: content, size, color, alignment (toggle with Enter)
  - Button: label, size, colors (toggle primary/secondary with Enter)
  - Section/Image: size adjustments with Up/Down
- Keyboard shortcuts:
  - Delete/Backspace: remove selected element
  - Arrow keys: nudge selected element
  - Enter: cycle a primary property (align for text, colors for button)
  - Cmd/Ctrl+Z: undo (basic)
- Session persistence using localStorage
- Sample templates: Hero and Two-column
- Env placeholders via import.meta.env (no backend dependency)

## Getting started
```bash
npm install
npm run dev # runs Vite dev server on port 3000
```
Open the preview URL (port 3000) to use the builder.

## Usage
- Use Sidebar > Tools to add elements to the Canvas.
- Use Sidebar > Templates to load sample layouts.
- Select a block on Canvas with Enter, then:
  - Arrow keys to move
  - Delete/Backspace to remove
  - Enter to cycle an important property (align/color)
  - Up/Down to adjust size (font size for text/button; dimensions for image/section)
- Properties Panel shows the current selection and live values.

## Environment variables (optional)
We read these if present, otherwise ignore:
- VITE_API_BASE
- VITE_BACKEND_URL
- VITE_FRONTEND_URL
- VITE_WS_URL
- VITE_NODE_ENV
- VITE_FEATURE_FLAGS
- VITE_EXPERIMENTS_ENABLED

Do not commit real secrets. For reference only.

## Tech
- Lightning 3 + Blits
- Vite dev server

## Notes
- This is the initial version. Drag-and-drop and richer editing will be added later.
