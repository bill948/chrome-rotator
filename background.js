let config = { enabled: true, delay: 30, fullscreen: false };

// Function to handle Fullscreen toggle
async function handleWindowState(enabled, useFullscreen) {
    const window = await chrome.windows.getCurrent();
    const newState = (enabled && useFullscreen) ? "fullscreen" : "normal";

    if (window.state !== newState) {
        chrome.windows.update(window.id, { state: newState });
    }
}

// Watch for setting changes
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) config.enabled = changes.enabled.newValue;
    if (changes.delay) config.delay = changes.delay.newValue;
    if (changes.fullscreen) config.fullscreen = changes.fullscreen.newValue;

    // Apply fullscreen logic immediately when settings change
    handleWindowState(config.enabled, config.fullscreen);
});

// In your existing setInterval loop, ensure the window stays fullscreen
// (in case the user manually exits fullscreen but the extension is still "ON")
setInterval(async () => {
    if (!config.enabled) return;

    const now = Date.now();
    const state = await new Promise(resolve => chrome.idle.queryState(15, resolve));

    if (state !== "active" && (now - lastActivity >= config.delay * 1000)) {
        // If fullscreen is set but user escaped it, put it back
        if (config.fullscreen) {
            const win = await chrome.windows.getCurrent();
            if (win.state !== "fullscreen") {
                chrome.windows.update(win.id, { state: "fullscreen" });
            }
        }

        const tabs = await chrome.tabs.query({ currentWindow: true, windowType: 'normal' });
        if (tabs.length <= 1) return;

        const activeTab = tabs.find(t => t.active);
        const nextIndex = (activeTab.index + 1) % tabs.length;

        await chrome.tabs.update(tabs[nextIndex].id, { active: true });
        lastActivity = Date.now();
    }
}, 1000);