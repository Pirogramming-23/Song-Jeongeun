let startTime, interval;
let elapsed = 0;
let isRunning = false;

const timeEl = document.getElementById('time');
const recordList = document.getElementById('recordList');

function formatTime(ms) {
  const sec = String(Math.floor(ms / 1000)).padStart(2, '0');
  const msPart = String(Math.floor((ms % 1000) / 10)).padStart(2, '0'); // 0~99
  return `${sec}:${msPart}`;
}

function updateDisplay() {
  const now = Date.now();
  elapsed = now - startTime;
  timeEl.textContent = formatTime(elapsed);
}

document.getElementById('startBtn').onclick = () => {
  if (!isRunning) {
    startTime = Date.now() - elapsed;
    interval = setInterval(updateDisplay, 100);
    isRunning = true;
  }
};

document.getElementById('stopBtn').onclick = () => {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    addRecord(formatTime(elapsed));
  }
};

document.getElementById('resetBtn').onclick = () => {
  clearInterval(interval);
  isRunning = false;
  elapsed = 0;
  timeEl.textContent = '00:00';
};

function addRecord(text) {
  const li = document.createElement('li');
  li.innerHTML = `<input type="checkbox"> ${text}`;
  recordList.appendChild(li);
}

document.getElementById('deleteAllBtn').onclick = () => {
  recordList.innerHTML = '';
};

document.getElementById('selectAll').addEventListener('change', (e) => {
  const checkboxes = recordList.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = e.target.checked);
});
