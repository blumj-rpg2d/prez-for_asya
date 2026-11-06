// ===== Задание А. Оценка паролей =====

// Размеры алфавитов из методички
const ALPHABET_SIZE = { lower: 26, upper: 26, digits: 10, symbols: 32 };

// Ступени надёжности: индекс = «ступень»
const LEVELS = ['слабый', 'средний', 'сильный', 'очень сильный'];

// Частые пароли, которые подбираются по словарю
const COMMON_PASSWORDS = [
  'qwerty123', '12345678', 'password1', 'iloveyou1', 'qazwsx123',
  'admin2024', 'letmein1', 'monkey123', 'dragon777', 'football1'
];

// Замены букв цифрами и знаками (leetspeak)
const LEET = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's' };

// ---------- Шаги 1–3: длина, классы, биты, формальная категория ----------
function getClasses(pw) {
  return {
    lower:   /[a-z]/.test(pw),
    upper:   /[A-Z]/.test(pw),
    digits:  /[0-9]/.test(pw),
    symbols: /[^A-Za-z0-9]/.test(pw)
  };
}

function classNames(c) {
  const names = [];
  if (c.lower)   names.push('строчные');
  if (c.upper)   names.push('прописные');
  if (c.digits)  names.push('цифры');
  if (c.symbols) names.push('знаки');
  return names.join(', ');
}

function alphabetSize(c) {
  let n = 0;
  if (c.lower)   n += ALPHABET_SIZE.lower;
  if (c.upper)   n += ALPHABET_SIZE.upper;
  if (c.digits)  n += ALPHABET_SIZE.digits;
  if (c.symbols) n += ALPHABET_SIZE.symbols;
  return n;
}

function formalLevel(bits) {
  if (bits < 40) return 0;   // слабый
  if (bits < 60) return 1;   // средний
  if (bits < 80) return 2;   // сильный
  return 3;                  // очень сильный
}

// ---------- Шаг 4: поиск «схемы» в пароле ----------
// Возвращает { penalty: на сколько ступеней понизить, reason: почему }
function detectScheme(pw) {
  const low = pw.toLowerCase();

  // 1) фраза из 3+ слов через дефис: sprint-kumys-elechek-21  (минус две ступени)
  if (/^[a-z]+(-[a-z]+){2,}(-\d{1,4})?$/.test(low)) {
    return { penalty: 2, reason: 'фраза из реальных слов: атака перебирает слова, а не символы' };
  }

  // 2) частый пароль из списка (минус одна ступень)
  if (COMMON_PASSWORDS.includes(low)) {
    return { penalty: 1, reason: 'частый пароль из словаря' };
  }

  // 3) слово (возможно с заменами букв) + знак + год/цифры в конце (минус одна ступень)
  const m = pw.match(/^(.*?)([!._-]?\d{2,4})$/);
  if (m) {
    const body = m[1];
    const plain = body.toLowerCase().replace(/[013457@$]/g, ch => LEET[ch]);
    if (/^[a-z]{2,}(-[a-z]{2,})?$/.test(plain)) {   // слово или слово-слово (ak-keme)
      const hasLeet = plain !== body.toLowerCase();
      return {
        penalty: 1,
        reason: hasLeet
          ? 'словарная схема: слово + замена букв + год/цифры'
          : 'словарная схема: слово + год/цифры'
      };
    }
  }

  return { penalty: 0, reason: 'случайный набор без схемы' };
}

// ---------- Главная функция: анализ одного пароля ----------
function analyzePassword(pw) {
  const length  = pw.length;
  const classes = getClasses(pw);
  const n       = alphabetSize(classes);
  const bits    = length * Math.log2(n);

  const formal = formalLevel(bits);
  const scheme = detectScheme(pw);

  let final = Math.max(0, formal - scheme.penalty);   // не ниже «слабого»
  let reason = scheme.reason;

  if (length < 12 && final > 2) {                     // короче 12 — выше «сильного» нельзя
    final = 2;
    reason += '; короче 12 символов — не выше «сильного»';
  }

  return {
    password: pw, length, classes: classNames(classes), alphabet: n,
    bits, formal, final, reason
  };
}

// Самый надёжный: сначала категория, потом биты, потом длина
function pickBest(results) {
  return results.reduce((best, r) => {
    if (r.final !== best.final) return r.final > best.final ? r : best;
    if (r.bits  !== best.bits)  return r.bits  > best.bits  ? r : best;
    return r.length > best.length ? r : best;
  });
}

// Формат числа: 78.65 -> "78,7"
function fmt(x) { return x.toFixed(1).replace('.', ','); }

// ---------- Работа со страницей ----------
function getInputs() {
  return Array.from(document.querySelectorAll('.pw-input'));
}

function fillTaskAInputs(passwords) {
  getInputs().forEach((input, i) => { input.value = passwords[i] || ''; });
}

function makeCell(text, className) {
  const td = document.createElement('td');
  td.textContent = text;              // textContent — безопасно для символов < > &
  if (className) td.className = className;
  return td;
}

function calculateTaskA() {
  const passwords = getInputs().map(i => i.value.trim()).filter(p => p !== '');
  const tbody = document.querySelector('#a-table tbody');
  const summary = document.getElementById('a-summary');
  tbody.innerHTML = '';
  summary.innerHTML = '';

  if (passwords.length === 0) {
    summary.textContent = 'Введите хотя бы один пароль.';
    return;
  }

  const results = passwords.map(analyzePassword);

  results.forEach((r, i) => {
    const tr = document.createElement('tr');
    tr.appendChild(makeCell(i + 1));
    tr.appendChild(makeCell(r.password, 'mono'));
    tr.appendChild(makeCell(r.length));
    tr.appendChild(makeCell(r.classes));
    tr.appendChild(makeCell(r.alphabet));
    tr.appendChild(makeCell(fmt(r.bits)));
    tr.appendChild(makeCell(LEVELS[r.formal], 'badge lvl-' + r.formal));
    tr.appendChild(makeCell(LEVELS[r.final],  'badge lvl-' + r.final));
    tr.appendChild(makeCell(r.reason));
    tbody.appendChild(tr);
  });

  // Вывод (шаг 5)
  const weakest = results.reduce((w, r) => {
    if (r.final !== w.final) return r.final < w.final ? r : w;
    if (r.bits  !== w.bits)  return r.bits  < w.bits  ? r : w;
    return r.length < w.length ? r : w;
  });
  const best = pickBest(results);
  const weakList = results.filter(r => r.final === 0).map(r => r.password);

  const lines = [
    ['Слабые (нельзя оставлять): ', weakList.length ? weakList.join(', ') : 'нет'],
    ['Самый слабый пароль: ', weakest.password],
    ['Самый надёжный пароль: ', best.password + ' — ' + fmt(best.bits) + ' бит, ' + LEVELS[best.final]],
    ['Что сделать с остальными: ', 'заменить слабые и средние пароли случайными строками от 12 символов; включить двухфакторную аутентификацию (2FA) и не использовать один пароль в разных сервисах.']
  ];
  lines.forEach(([title, text]) => {
    const p = document.createElement('p');
    const b = document.createElement('strong');
    b.textContent = title;
    p.appendChild(b);
    p.appendChild(document.createTextNode(text));
    summary.appendChild(p);
  });
}

// Вызывается из script.js при смене варианта
function loadTaskA(variant) {
  fillTaskAInputs(variant.passwords);
  calculateTaskA();
}

// Вешает обработчики на кнопки (один раз при запуске)
function initTaskA(getCurrentVariant) {
  document.getElementById('a-calc').addEventListener('click', calculateTaskA);
  document.getElementById('a-fill').addEventListener('click', () => loadTaskA(getCurrentVariant()));
  getInputs().forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') calculateTaskA(); }));
}
