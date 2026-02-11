const notifyActivity = () => {
    chrome.runtime.sendMessage({ type: "USER_ACTIVITY" });
};

// Listen for mouse movement, clicks, or typing
window.addEventListener('mousemove', notifyActivity, { passive: true });
window.addEventListener('keydown', notifyActivity, { passive: true });
window.addEventListener('mousedown', notifyActivity, { passive: true });
window.addEventListener('touchstart', notifyActivity, { passive: true });