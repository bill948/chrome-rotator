const elements = ['enabled', 'fullscreen', 'delay'];
const refs = {};
elements.forEach(id => refs[id] = document.getElementById(id));

// Load current settings
chrome.storage.local.get(elements, (data) => {
    refs.enabled.checked = data.enabled ?? true;
    refs.fullscreen.checked = data.fullscreen ?? false;
    refs.delay.value = data.delay ?? 30;
});

// Save settings and close popup
document.getElementById('save').addEventListener('click', () => {
    let delayValue = parseInt(refs.delay.value);

    // Clamp the value between 15 and 300
    if (isNaN(delayValue) || delayValue < 15) {
        delayValue = 15;
    } else if (delayValue > 300) {
        delayValue = 300;
    }

    refs.delay.value = delayValue; // Update UI to show the clamped value

    const settings = {
        enabled: refs.enabled.checked,
        fullscreen: refs.fullscreen.checked,
        delay: delayValue
    };

    chrome.storage.local.set(settings, () => {
        const btn = document.getElementById('save');
        btn.textContent = "Saved!";
        setTimeout(() => { window.close(); }, 250);
    });
});