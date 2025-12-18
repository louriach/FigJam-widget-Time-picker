# FigJam Date Display Widget

A customizable date display widget for FigJam that shows today's date with extensive formatting options. Fully themeable with color coordination and a settings panel.

## Features

### 📅 Date display
- Always shows today's date (automatically updates)
- 6 date format options:
  - MM/DD/YYYY (e.g., 12/18/2025)
  - DD/MM/YYYY (e.g., 18/12/2025)
  - YYYY-MM-DD (e.g., 2025-12-18)
  - Month DD, YYYY (e.g., December 18, 2025)
  - DD Month YYYY (e.g., 18 December 2025)
  - MMM DD, YYYY (e.g., Dec 18, 2025)

### 📆 Day display
- 4 day format options:
  - **Hidden** - No day shown
  - **Short** - Single letter (T, W, F)
  - **Medium** - Three letters (Tue, Wed, Fri)
  - **Long** - Full name (Tuesday, Wednesday, Friday)

### 🎨 Theme customization
- 10 color themes with coordinated backgrounds, borders, and text
- Each color theme includes:
  - Custom background color
  - Matching border color
  - High-contrast text color for readability
- Color options: White, Gray, Coral, Peach, Yellow, Green, Teal, Blue, Purple, Pink

### ✨ User experience
- **Expandable settings panel** - Clean two-column layout for date and day formats
- **Live previews** - See exactly how each format will look before selecting
- **Color swatches** - Visual grid of all color options (2 rows × 5 colors)
- **Synced state** - All settings sync across collaborators in real-time
- **Dynamic sizing** - Compact when closed, expands to 400px when open
- **Minimize button** - Themed button to collapse settings

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/FigJam-widget-Time-picker.git
cd FigJam-widget-Time-picker
```

2. Install dependencies:
```bash
npm install
```

3. Build the widget:
```bash
npm run build
```

4. Load the widget in Figma:
   - Open Figma Desktop App
   - Go to Menu → Widgets → Development → Import widget from manifest
   - Select the `manifest.json` file from this directory

## Development

To watch for changes during development:
```bash
npm run watch
```

## Usage

1. **Insert the widget**: Open a FigJam file and insert via Menu → Widgets → Development → Date Display
2. **View the date**: The widget displays today's date with the current theme
3. **Open settings**: Click anywhere on the widget to open the settings panel
4. **Customize format**: 
   - Choose a date format from the left column
   - Choose a day format from the right column
   - Select a color theme from the grid below
5. **Minimize**: Click the "Minimize widget" button to close settings

The widget automatically updates to show today's date and can be moved, duplicated, and positioned like any FigJam element!

## Technical Details

### Built With
- TypeScript
- Figma Widget API
- React-like JSX syntax

### Files Structure
- `manifest.json` - Widget configuration
- `code.tsx` - Main widget logic (TypeScript + Widget API)
- `ui.html` - Not used (widgets use inline UI)
- `package.json` - Node.js dependencies
- `tsconfig.json` - TypeScript configuration

### State Management
All widget state is synced using `useSyncedState`:
- `dateFormat` - Selected date format
- `dayFormat` - Selected day display format  
- `widgetColor` - Selected background color
- `isMenuOpen` - Settings panel visibility

## License

MIT