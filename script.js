// ---------- 1. Заполняем список вариантов числами 1..30 ----------
const variantSelect = document.getElementById('variant');

for (let i = 1; i <= 30; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  variantSelect.appendChild(option);
}

// Запоминаем выбранный вариант между запусками страницы
try {
  const saved = localStorage.getItem('variant');
  if (saved && VARIANTS[saved]) variantSelect.value = saved;
} catch (e) { /* localStorage может быть недоступен — не страшно */ }

// ---------- 2. Переключение вкладок ----------
const tabs   = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// ---------- 3. Текущий вариант и загрузка заданий ----------
function getCurrentVariant() {
  return VARIANTS[variantSelect.value];
}

function loadVariant() {
  const v = getCurrentVariant();
  loadTaskA(v);          // задание А
  loadTaskG(v);          // задание Г
  loadTaskB(v);          // задание Б
  loadTaskV(v);          // задание В
  // сюда позже добавим loadTaskB(v), loadTaskV(v), loadTaskG(v)
  try { localStorage.setItem('variant', variantSelect.value); } catch (e) {}
}

variantSelect.addEventListener('change', loadVariant);

// ---------- 4. Запуск ----------
initTaskA(getCurrentVariant);   // подключаем кнопки задания А
initTaskG(getCurrentVariant);   // подключаем кнопки задания Г
initTaskB();   // подключаем кнопки задания Б
initTaskV();   // подключаем кнопки задания В
loadVariant();                  // первый расчёт при открытии страницы
