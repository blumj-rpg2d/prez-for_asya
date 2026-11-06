// ========================================
// ЗАДАНИЕ В. АУДИТ ПЕРСОНАЛЬНЫХ ДАННЫХ
// ========================================


// Названия категорий
const PDN_CATEGORIES = {
    ordinary: 'Обычные персональные данные',
    special: 'Специальные персональные данные',
    biometric: 'Биометрические данные',
    children: 'Персональные данные детей',
    indirect: 'Косвенные идентификаторы',
    'non-pdn': 'Не является персональными данными'
  };
  
  
  // Получение элементов страницы
  function getPdnElements() {
    return {
      variantNumber: document.getElementById('v-variant-number'),
      fields: document.querySelectorAll('.v-field'),
      categories: document.querySelectorAll('.v-category'),
      anonymize: document.querySelectorAll('.v-anonymize'),
      fines: document.querySelectorAll('.v-fine'),
      calculate: document.getElementById('v-calc'),
      results: document.getElementById('v-results')
    };
  }
  
  
  // Загрузка варианта
  function loadTaskV(variant) {
    const elements = getPdnElements();
  
    if (!variant) {
      return;
    }
  
    elements.variantNumber.textContent =
      variant.pdn ?? 'Не указан';
  
    // Очищаем поля при смене варианта
    elements.fields.forEach(input => {
      input.value = '';
    });
  
    elements.categories.forEach(select => {
      select.value = '';
    });
  
    elements.anonymize.forEach(input => {
      input.value = '';
    });
  
    elements.fines.forEach(input => {
      input.value = '';
    });
  
    elements.results.innerHTML = `
      <h3>Результаты аудита</h3>
      <p>Заполните шесть строк и выполните проверку.</p>
    `;
  }
  
  
  // Проверка заполнения и анализ
  function calculateTaskV() {
    const elements = getPdnElements();
  
    const rows = [];
  
    let incomplete = false;
  
    for (let i = 0; i < 6; i++) {
      const field = elements.fields[i].value.trim();
      const category = elements.categories[i].value;
      const anonymize = elements.anonymize[i].value.trim();
      const fineValue = elements.fines[i].value.trim();
  
      if (!field || !category || !anonymize || fineValue === '') {
        incomplete = true;
      }
  
      const fine = Number(fineValue);
  
      if (fineValue !== '' && (!Number.isFinite(fine) || fine < 0)) {
        elements.results.innerHTML = `
          <h3>Ошибка заполнения</h3>
          <p class="pdn-error">
            Размер штрафа должен быть неотрицательным числом.
          </p>
        `;
        return;
      }
  
      rows.push({
        field,
        category,
        anonymize,
        fine: fineValue === '' ? null : fine
      });
    }
  
    if (incomplete) {
      elements.results.innerHTML = `
        <h3>Не все данные заполнены</h3>
        <p class="pdn-error">
          Заполните название поля, категорию, меру обезличивания
          и размер штрафа во всех шести строках.
        </p>
      `;
      return;
    }
  
  
    // Ищем максимальный указанный размер штрафа
    const highestFine = Math.max(...rows.map(row => row.fine));
  
    const highestFineRows = rows.filter(
      row => row.fine === highestFine
    );
  
  
    // Формируем список проверенных данных
    const report = rows.map((row, index) => `
      <div class="pdn-result-item">
        <h4>${index + 1}. ${escapePdnText(row.field)}</h4>
  
        <p>
          <strong>Категория:</strong>
          ${PDN_CATEGORIES[row.category]}
        </p>
  
        <p>
          <strong>Обезличивание:</strong>
          ${escapePdnText(row.anonymize)}
        </p>
  
        <p>
          <strong>Штраф из методички:</strong>
          ${formatPdnNumber(row.fine)}
        </p>
      </div>
    `).join('');
  
  
    // Итоговый отчёт
    elements.results.innerHTML = `
      <h3>Результаты аудита</h3>
  
      <div class="pdn-summary">
        <span>Проверено полей</span>
        <strong>6 / 6</strong>
      </div>
  
      <h4>Анализ полей</h4>
  
      ${report}
  
      <div class="pdn-highest">
        <h4>Наибольший указанный штраф</h4>
  
        <strong>${formatPdnNumber(highestFine)}</strong>
  
        <p>
          ${
            highestFineRows.map(row =>
              escapePdnText(row.field)
            ).join(', ')
          }
        </p>
  
        <small>
          Результат основан на суммах, которые вы внесли вручную
          из методички. Это сравнение значений, а не самостоятельное
          определение юридической ответственности.
        </small>
      </div>
    `;
  }
  
  
  // Форматирование суммы
  function formatPdnNumber(value) {
    return new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: 2
    }).format(value);
  }
  
  
  // Безопасный вывод пользовательского текста
  function escapePdnText(value) {
    return String(value).replace(/[&<>"']/g, char => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
  
      return entities[char];
    });
  }
  
  
  // Инициализация задания
  function initTaskV() {
    const elements = getPdnElements();
  
    elements.calculate.addEventListener('click', calculateTaskV);
  }