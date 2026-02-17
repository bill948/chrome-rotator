let config = { enabled: true, delay: 30, fullscreen: false };
let rotationCount = 0;
let lastRotation = 0;

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

// Idle detection
chrome.idle.setDetectionInterval(15);

// Periodically sync fullscreen setting with actual window state
setInterval(async () => {
    if (!config.fullscreen) return;
    try {
        const win = await chrome.windows.getCurrent();
        if (win.state !== "fullscreen") {
            config.fullscreen = false;
            chrome.storage.local.set({ fullscreen: false });
        }
    } catch (e) {}
}, 2000);

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

    const safeDelay = Math.min(Math.max(config.delay, 15), 300);
    const delayMs = safeDelay * 1000;

    const idleState = await new Promise(res => chrome.idle.queryState(safeDelay, res));

    if (idleState === "active") return;
    if (Date.now() - lastRotation < delayMs) return;

    const tabs = await chrome.tabs.query({ currentWindow: true, windowType: 'normal' });
    if (tabs.length <= 1) return;

    const activeTabIndex = tabs.findIndex(t => t.active);
    if (activeTabIndex === -1) return;

    const nextIndex = (activeTabIndex + 1) % tabs.length;
    const nextTab = tabs[nextIndex];

    try {
        rotationCount++;
        await chrome.tabs.update(nextTab.id, { active: true });

        if (rotationCount >= 5) {
            await chrome.tabs.reload(nextTab.id);
            rotationCount = 0;
        }

        if (config.fullscreen) {
            const win = await chrome.windows.getCurrent();
            if (win.state !== "fullscreen") {
                await chrome.windows.update(win.id, { state: "fullscreen" });
            }
        }
        lastRotation = Date.now();
    } catch (err) {
        console.error("Rotation error:", err);
    }
}, 1000);