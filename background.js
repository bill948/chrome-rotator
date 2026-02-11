let lastActivity = Date.now();
let config = { enabled: true, delay: 30, fullscreen: false };
let rotationCount = 0; // Track number of rotations

// Initial Config Load
chrome.storage.local.get(['enabled', 'delay', 'fullscreen'], (data) => {
    Object.assign(config, data);
    updateBadge();
});

// Update settings in real-time
chrome.storage.onChanged.addListener((changes) => {
    for (let key in changes) {
        config[key] = changes[key].newValue;
    }
    updateBadge();
    handleWindowState();
});

// Activity message from content scripts
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "USER_ACTIVITY") lastActivity = Date.now();
});

// Global Idle detection backup
chrome.idle.setDetectionInterval(15);
chrome.idle.onStateChanged.addListener((state) => {
    if (state === "active") lastActivity = Date.now();
});

async function handleWindowState() {
    const win = await chrome.windows.getCurrent();
    const targetState = (config.enabled && config.fullscreen) ? "fullscreen" : "normal";
    if (win.state !== targetState) {
        chrome.windows.update(win.id, { state: targetState });
    }
}

function updateBadge() {
    const text = config.enabled ? "ON" : "OFF";
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color: config.enabled ? "#4CAF50" : "#F44336" });
}

// Main Logic Loop
setInterval(async () => {
    if (!config.enabled) return;

    const now = Date.now();
    const safeDelay = Math.min(Math.max(config.delay, 15), 300);
    const delayMs = safeDelay * 1000;

    const idleState = await new Promise(res => chrome.idle.queryState(15, res));

    if (idleState === "active" || (now - lastActivity) < delayMs) {
        return;
    }

    const tabs = await chrome.tabs.query({ currentWindow: true, windowType: 'normal' });
    if (tabs.length <= 1) return;

    const activeTabIndex = tabs.findIndex(t => t.active);
    if (activeTabIndex === -1) return;

    const nextIndex = (activeTabIndex + 1) % tabs.length;
    const nextTab = tabs[nextIndex];

    try {
        // Increment rotation count
        rotationCount++;

        // Switch to the next tab
        await chrome.tabs.update(nextTab.id, { active: true });

        // Check if it's the 5th rotation
        if (rotationCount >= 5) {
            await chrome.tabs.reload(nextTab.id);
            rotationCount = 0; // Reset counter
            console.log("5th rotation reached: Page refreshed.");
        }

        if (config.fullscreen) {
            const win = await chrome.windows.getCurrent();
            if (win.state !== "fullscreen") {
                await chrome.windows.update(win.id, { state: "fullscreen" });
            }
        }
    } catch (err) {
        console.error("Rotation error:", err);
    }

    lastActivity = Date.now();
}, 1000);