# Chrome Web Store Listing — Kiosk Tab Rotator

Use this document as a reference when filling out the Chrome Web Store Developer Dashboard.

---

## Store Listing

### Name
Kiosk Tab Rotator

### Summary (132 characters max)
Automatically rotate through your open tabs when idle — perfect for dashboards, kiosks, and digital signage displays.

### Description (up to 16,000 characters)

**Kiosk Tab Rotator** automatically cycles through your open browser tabs after a period of inactivity — ideal for unattended dashboards, lobby displays, digital signage, monitoring screens, and kiosk setups.

**How It Works**
Open the tabs you want to display, configure the rotation delay, and walk away. When no mouse, keyboard, or touch activity is detected for the configured duration, the extension begins rotating through your tabs one by one. As soon as you interact with the browser, rotation pauses instantly so you can work uninterrupted.

**Key Features**

- Automatic tab rotation after a configurable idle period (15–300 seconds)
- Smart activity detection — mouse movement, keyboard input, clicks, and touch events all pause rotation immediately
- Fullscreen / kiosk mode — hides the browser UI for a clean, distraction-free display
- Automatic page refresh every 5th rotation to keep dashboard data up to date
- ON/OFF badge indicator so you always know the current state at a glance
- Lightweight — no background resource usage when disabled
- Simple one-click popup to configure all settings
- Works with any number of tabs in the current window
- Manifest V3 — modern, secure, and performant

**Perfect For**

- Office TV dashboards (Grafana, Datadog, Kibana, Google Analytics, etc.)
- Retail and lobby digital signage
- Conference room status displays
- NOC / SOC monitoring walls
- Trade show kiosk presentations
- Reception area information displays
- Classroom and training lab rotations

**How to Use**

1. Open all the tabs/dashboards you want to rotate through
2. Click the Kiosk Tab Rotator icon in the toolbar
3. Enable rotation, set your desired delay, and optionally turn on fullscreen mode
4. Click "Save & Apply" — the extension takes care of the rest

**Privacy First**
Kiosk Tab Rotator does not collect, transmit, or store any personal data. All settings are saved locally on your device using Chrome's built-in storage API. No analytics, no tracking, no external network requests.

---

## Category
Productivity

## Language
English

---

## Graphic Assets

### Extension Icon
- **128x128**: `kiosk_icon_128.png` (already included)
- **48x48**: Create a 48x48 version of the icon → save as `icon_48.png`
- **16x16**: Create a 16x16 version of the icon → save as `icon_16.png`

### Store Icon
- **128x128 PNG** — use `kiosk_icon_128.png`

### Promotional Images (optional but recommended)
- **Small promo tile**: 440x280 PNG — suggested content: icon + "Kiosk Tab Rotator" text + tagline on a clean background
- **Marquee promo tile**: 1400x560 PNG — wider banner version of the above

### Screenshots (required — 1 to 5)
Capture the following at **1280x800** or **640x400** resolution:

1. **Popup settings panel** — show the extension popup with rotation enabled, delay set, fullscreen toggled on
2. **Dashboard in fullscreen** — a real dashboard tab in fullscreen mode demonstrating the kiosk experience
3. **Badge indicator** — toolbar showing the green "ON" badge on the extension icon
4. **Multiple tabs open** — browser with several dashboard tabs visible, showing the use case
5. **Settings with rotation off** — popup showing the disabled state with the red "OFF" badge

---

## Additional Store Fields

### Website
_(Add your project URL or GitHub repository URL here)_

### Support URL
_(Add a link to your GitHub Issues page or support email)_

### Privacy Policy URL
Host `privacy-policy.html` (included in this project) at a public URL and paste it here.
This is **required** if you request any permissions.

---

## Justification for Permissions

When submitting, Chrome Web Store will ask you to justify each permission:

| Permission | Justification |
|---|---|
| `tabs` | Required to query open tabs in the current window and switch the active tab during rotation. |
| `storage` | Required to persist user settings (enabled state, delay, fullscreen preference) across browser sessions. |
| `idle` | Required to detect system-level idle state so rotation only occurs when the user is inactive. |
| `scripting` | Required to inject the activity-detection content script that listens for mouse, keyboard, and touch events. |
| `<all_urls>` (host permission) | Required so the content script can detect user activity on any webpage the user has open, regardless of domain. |
