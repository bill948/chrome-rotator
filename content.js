let lastNotified = 0;

const notifyActivity = () => {
    const now = Date.now();
    if (now - lastNotified < 5000) return;
    lastNotified = now;
    chrome.runtime.sendMessage({ type: "USER_ACTIVITY" }).catch(() => {});
};

// Listen for mouse movement, clicks, or typing
window.addEventListener('mousemove', notifyActivity, { passive: true });
window.addEventListener('keydown', notifyActivity, { passive: true });
window.addEventListener('mousedown', notifyActivity, { passive: true });
window.addEventListener('touchstart', notifyActivity, { passive: true });
