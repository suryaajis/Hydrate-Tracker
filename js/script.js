/* ===== STATE ===== */
let dailyGoal = 0;
let consumed = 0;
let userName = '';
let hydrationLog = [];
let currentDrinkType = { label: 'Water', icon: '💧', factor: 1.0 };

const DRINK_ICONS = {
  water:  '💧',
  tea:    '🍵',
  juice:  '🍊',
  coffee: '☕',
  milk:   '🥛',
};

/* ===== INIT ===== */
window.onload = function () {
  loadFromStorage();
  renderLog();
  updateUI();
};

/* ===== GOAL CALCULATION ===== */
function calcDailyGoal(gender, age) {
  age = parseInt(age, 10);
  if (!age || age <= 0) return 0;
  if (age < 14) return 1300;
  return gender === 'Female' ? 2700 : 3700;
}

/* ===== SUBMIT USER INFO ===== */
function onSubmit() {
  const name   = document.getElementById('userName').value.trim();
  const gender = document.getElementById('gender-list').value;
  const age    = document.getElementById('umur').value;

  if (!name || !age) {
    showToast('Please fill in your name and age.', 'warn');
    return;
  }

  userName  = name;
  dailyGoal = calcDailyGoal(gender, age);
  consumed  = 0;
  hydrationLog = [];

  saveToStorage();
  renderLog();
  updateUI();

  document.getElementById('status').textContent =
    `Hello, ${userName}! Your daily goal is ${dailyGoal} ml.`;

  showToast(`Welcome, ${userName}! Goal set to ${dailyGoal} ml.`, 'info');
}

/* ===== DRINK TYPE SELECTOR ===== */
function selectDrinkType(btn) {
  document.querySelectorAll('.drink-type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const type = btn.dataset.type;
  currentDrinkType = {
    label:  btn.textContent.replace(/\d+%/, '').trim(),
    icon:   DRINK_ICONS[type] || '💧',
    factor: parseFloat(btn.dataset.factor),
  };
}

/* ===== ADD WATER ===== */
function updateProgressBar(rawMl) {
  rawMl = parseFloat(rawMl);
  if (!rawMl || rawMl <= 0) return;

  if (!dailyGoal) {
    showToast('Enter your name, gender, and age first.', 'warn');
    return;
  }

  const effective = Math.round(rawMl * currentDrinkType.factor);
  consumed += effective;

  hydrationLog.unshift({
    time:      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    rawMl:     rawMl,
    effective: effective,
    drinkType: currentDrinkType.label,
    icon:      currentDrinkType.icon,
  });

  saveToStorage();
  renderLog();
  updateUI();

  if (consumed >= dailyGoal) {
    showToast('You reached your daily hydration goal!', 'success');
  } else {
    showToast(`+${effective} ml added!`, 'info');
  }
}

function addCustom() {
  const input = document.getElementById('custom-input');
  const val = parseFloat(input.value);
  if (!val || val <= 0) {
    showToast('Enter a valid amount in ml.', 'warn');
    return;
  }
  updateProgressBar(val);
  input.value = '';
}

/* ===== RESET ===== */
function resetProgress() {
  if (!dailyGoal) {
    showToast('Set up your profile first.', 'warn');
    return;
  }
  consumed = 0;
  hydrationLog = [];
  saveToStorage();
  renderLog();
  updateUI();
  document.getElementById('status').textContent =
    `Hello, ${userName}! Your daily goal is ${dailyGoal} ml.`;
  showToast('Progress reset.', 'info');
}

function clearLog() {
  hydrationLog = [];
  saveToStorage();
  renderLog();
}

/* ===== UI UPDATE ===== */
function updateUI() {
  const pct = dailyGoal ? Math.min(Math.round((consumed / dailyGoal) * 100), 100) : 0;
  const remaining = Math.max(dailyGoal - consumed, 0);

  /* progress bar */
  const bar = document.getElementById('bar');
  bar.style.width = pct + '%';

  /* pct label */
  document.getElementById('progress-pct-label').textContent = pct + '%';

  /* stat cards */
  document.getElementById('stat-consumed').textContent  = consumed + ' ml';
  document.getElementById('stat-goal').textContent      = dailyGoal ? dailyGoal + ' ml' : '— ml';
  document.getElementById('stat-remaining').textContent = dailyGoal ? remaining + ' ml' : '— ml';
  document.getElementById('stat-percent').textContent   = pct + '%';

  /* hydration level */
  updateHydrationLevel(pct);
}

function updateHydrationLevel(pct) {
  const dot  = document.querySelector('.level-dot');
  const text = document.getElementById('level-text');

  if (!dailyGoal || pct === 0) {
    dot.style.background  = '#aaa';
    text.textContent      = 'Not started';
    text.style.color      = '#aaa';
  } else if (pct < 25) {
    dot.style.background  = '#F44336';
    text.textContent      = 'Dehydrated — drink water now!';
    text.style.color      = '#F44336';
  } else if (pct < 50) {
    dot.style.background  = '#FF9800';
    text.textContent      = 'Low — keep going!';
    text.style.color      = '#FF9800';
  } else if (pct < 75) {
    dot.style.background  = '#FFC107';
    text.textContent      = 'Moderate — halfway there!';
    text.style.color      = '#e6a700';
  } else if (pct < 100) {
    dot.style.background  = '#8BC34A';
    text.textContent      = 'Good — almost at your goal!';
    text.style.color      = '#558B2F';
  } else {
    dot.style.background  = '#4CAF50';
    text.textContent      = 'Goal reached! Well done!';
    text.style.color      = '#2E7D32';
  }
}

/* ===== RENDER LOG ===== */
function renderLog() {
  const container = document.getElementById('hydration-log');

  if (!hydrationLog.length) {
    container.innerHTML = '<p class="log-empty">No entries yet. Start tracking above!</p>';
    return;
  }

  const totalEntries = hydrationLog.length;
  container.innerHTML = hydrationLog.map((entry, i) => `
    <div class="log-item">
      <div class="log-drink-icon">${entry.icon}</div>
      <div class="log-info">
        <div class="log-amount">${entry.rawMl} ml <span class="log-badge">${entry.drinkType}</span></div>
        <div class="log-detail">Effective hydration: ${entry.effective} ml</div>
      </div>
      <div class="log-time">${entry.time}</div>
    </div>
  `).join('');
}

/* ===== TOAST ===== */
function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}

/* ===== LOCAL STORAGE ===== */
function saveToStorage() {
  localStorage.setItem('ht_consumed',  consumed);
  localStorage.setItem('ht_goal',      dailyGoal);
  localStorage.setItem('ht_user',      userName);
  localStorage.setItem('ht_log',       JSON.stringify(hydrationLog));
}

function loadFromStorage() {
  consumed     = parseFloat(localStorage.getItem('ht_consumed'))  || 0;
  dailyGoal    = parseFloat(localStorage.getItem('ht_goal'))      || 0;
  userName     = localStorage.getItem('ht_user')                  || '';
  hydrationLog = JSON.parse(localStorage.getItem('ht_log') || '[]');

  if (userName && dailyGoal) {
    document.getElementById('status').textContent =
      `Welcome back, ${userName}! Goal: ${dailyGoal} ml`;
  }
}
