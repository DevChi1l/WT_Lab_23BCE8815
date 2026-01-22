
const activities = [];
const warningElement = document.getElementById('warning');
const logElement = document.getElementById('log');

const thresholds = {
    clicks: 10,
    keys: 20,
    total: 25
};

let counts = { clicks: 0, keys: 0 };

function logActivity(type, target, value = '') {
    const time = new Date().toLocaleTimeString();
    const activity = { type, target, value, time };
    activities.push(activity);
    
    if (type === 'click') counts.clicks++;
    if (type === 'keypress') counts.keys++;
    
    updateDisplay();
    checkThresholds();
}

function updateDisplay() {
    logElement.innerHTML = '';
    activities.slice(-10).reverse().forEach(activity => {
        const div = document.createElement('div');
        div.textContent = `${activity.time} - ${activity.type} on ${activity.target}: ${activity.value}`;
        div.style.padding = '5px';
        div.style.borderBottom = '1px solid #ccc';
        logElement.prepend(div);
    });
}

function checkThresholds() {
    const total = counts.clicks + counts.keys;
    if (counts.clicks > thresholds.clicks || 
        counts.keys > thresholds.keys || 
        total > thresholds.total) {
        warningElement.style.display = 'block';
        warningElement.textContent = `⚠️ High activity! Clicks: ${counts.clicks}, Keys: ${counts.keys}`;
    }
}

function clearLog() {
    activities.length = 0;
    counts = { clicks: 0, keys: 0 };
    warningElement.style.display = 'none';
    updateDisplay();
}

function exportLog() {
    let exportText = 'Activity Log\n============\n';
    activities.forEach(act => {
        exportText += `${act.time} - ${act.type} on ${act.target}: ${act.value}\n`;
    });
    
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity_log.txt';
    a.click();
}

document.addEventListener('click', function(e) {
    logActivity('click', e.target.tagName, e.target.textContent.substring(0, 20));
}, true);

document.addEventListener('keypress', function(e) {
    logActivity('keypress', e.target.id || e.target.tagName, e.key);
});

document.addEventListener('focus', function(e) {
    logActivity('focus', e.target.id || e.target.tagName, 'focused');
}, true);

document.addEventListener('blur', function(e) {
    logActivity('blur', e.target.id || e.target.tagName, 'lost focus');
}, true);

updateDisplay();
