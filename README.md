# Kiosk Tab Rotator

Chrome extension that automatically rotates through your open tabs after a period of inactivity — built for dashboards, kiosks, and digital signage.

## Features

- **Auto tab rotation** — cycles through open tabs when no user activity is detected
- **Activity detection** — mouse, keyboard, click, and touch events instantly pause rotation
- **Fullscreen mode** — hides browser UI for a clean kiosk display
- **Auto refresh** — reloads the page every 5th rotation to keep data current
- **Configurable delay** — 15 to 300 seconds of idle time before rotation starts
- **Badge indicator** — green ON / red OFF badge on the toolbar icon

## Installation

### From Chrome Web Store

_(Coming soon)_

### Manual / Developer Install

1. Clone or download this repository
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked** and select the project folder
5. The extension icon will appear in the toolbar

## Usage

1. Open the tabs you want to rotate through
2. Click the **Kiosk Tab Rotator** icon in the toolbar
3. Configure your settings:
   - **Enable Rotation** — turn auto-rotation on/off
   - **Fullscreen Mode** — enter fullscreen when rotation is active
   - **Delay** — seconds of inactivity before the next tab switch (15–300)
4. Click **Save & Apply**

Walk away and the extension takes over. Interact with the browser at any time to pause rotation.

## How It Works

```
User idle for [delay] seconds
        │
        ▼
  Switch to next tab ──► Every 5th rotation, reload the page
        │
        ▼
  User activity detected ──► Pause rotation, reset timer
```

| Component | File | Role |
|---|---|---|
| Background service worker | `background.js` | Main rotation loop, idle detection, window state management |
| Popup UI | `popup.html` / `popup.js` | Settings panel for enable, delay, and fullscreen |
| Content script | `content.js` | Detects mouse, keyboard, and touch activity on pages |

## Permissions

| Permission | Why |
|---|---|
| `tabs` | Query and switch active tabs |
| `storage` | Persist settings locally |
| `idle` | Detect system-level idle state |
| `scripting` | Inject activity detection into pages |
| `<all_urls>` | Activity detection works on any domain |

No data is collected or transmitted. All settings are stored locally via `chrome.storage.local`.

## Project Structure

```
chrome-rotator/
├── manifest.json          # Extension manifest (v3)
├── background.js          # Service worker — rotation logic
├── content.js             # Content script — activity detection
├── popup.html             # Settings popup UI
├── popup.js               # Settings popup logic
├── kiosk_icon_128.png     # Extension icon (128x128)
├── icon_48.png            # Extension icon (48x48)
├── icon_16.png            # Extension icon (16x16)
├── privacy-policy.html    # Privacy policy for Chrome Web Store
├── store-listing.md       # Chrome Web Store listing content
└── generate-assets.html   # Promotional tile & icon generator
```

## Building Store Assets

Open `generate-assets.html` in Chrome to generate:
- Small promotional tile (440x280)
- Marquee promotional tile (1400x560)
- Resized icons (48x48, 16x16)

## License

MIT
