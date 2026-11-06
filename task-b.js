// ========================================
// ЗАДАНИЕ Б. АНАЛИЗ ФИШИНГОВОГО ПИСЬМА
// ========================================


// Описание семи признаков фишинга
const PHISHING_FLAGS = {
    urgency: {
      title: 'Срочность и давление',
      description: 'Письмо оказывает давление и требует немедленных действий.'
    },
  
    domain: {
      title: 'Подозрительный домен',
      description: 'Адрес отправителя может не принадлежать официальной организации.'
    },
  
    greeting: {
      title: 'Общее обращение',
      description: 'Используется стандартное обращение без имени получателя.'
    },
  
    code: {
      title: 'Запрос пароля или кода',
      description: 'Запрашиваются конфиденциальные данные для входа.'
    },
  
    attachment: {
      title: 'Опасное вложение',
      description: 'В письме присутствует потенциально опасный файл.'
    },
  
    link: {
      title: 'Поддельная ссылка',
      description: 'Ссылка может вести на сторонний или поддельный сайт.'
    },
  
    channel: {
      title: 'Неправильный канал связи',
      description: 'Используется неподтверждённый канал коммуникации.'
    }
  };
  
  
  // Получение элементов страницы
  function getPhishingElements() {
    return {
      letterNumber: document.getElementById('b-letter-number'),
      email: document.getElementById('b-email-text'),
      flags: document.querySelectorAll('.b-flag'),
      calculate: document.getElementById('b-calc'),
      results: document.getElementById('b-results')
    };
  }
  
  
  // Загрузка номера письма выбранного варианта
  function loadTaskB(variant) {
    const elements = getPhishingElements();
  
    if (!variant) {
      return;
    }
  
    elements.letterNumber.textContent =
      variant.letter ?? 'Не указан';
  
    // Сбрасываем предыдущий анализ
    elements.email.value = '';
  
    elements.flags.forEach(flag => {
      flag.checked = false;
    });
  
    elements.results.innerHTML = `
      <h3>Результат проверки</h3>
      <p>
        Вставьте текст письма, отметьте подозрительные признаки
        и нажмите «Проверить письмо».
      </p>
    `;
  }
  
  
  // Анализ выбранных признаков
  function calculateTaskB() {
    const elements = getPhishingElements();
  
    const emailText = elements.email.value.trim();
  
    if (!emailText) {
      elements.results.innerHTML = `
        <h3>Необходимо добавить письмо</h3>
        <p class="phishing-warning">
          Сначала вставьте текст письма для анализа.
        </p>
      `;
      return;
    }
  
    // Получаем отмеченные признаки
    const selectedFlags = Array.from(elements.flags)
      .filter(flag => flag.checked)
      .map(flag => flag.value);
  
    const count = selectedFlags.length;
  
    // Формируем список найденных признаков
    let flagList = '';
  
    if (count > 0) {
      flagList = selectedFlags.map(key => `
        <li>
          <strong>${PHISHING_FLAGS[key].title}</strong>
          <p>${PHISHING_FLAGS[key].description}</p>
        </li>
      `).join('');
    } else {
      flagList = '<li>Отмеченные признаки не обнаружены.</li>';
    }
  
    // Выводим результат
    elements.results.innerHTML = `
      <h3>Результат проверки</h3>
  
      <div class="phishing-score">
        <span>Отмечено признаков</span>
        <strong>${count} / 7</strong>
      </div>
  
      <h4>Обнаруженные признаки:</h4>
  
      <ul class="phishing-found">
        ${flagList}
      </ul>
  
      <div class="phishing-verdict">
        <strong>
          ${
            count >= 3
              ? 'Обнаружено несколько признаков фишинга.'
              : count > 0
                ? 'Обнаружены отдельные подозрительные признаки.'
                : 'Подозрительные признаки не отмечены.'
          }
        </strong>
  
        <p>
          ${
            count > 0
              ? 'Не выполняйте указания из письма, пока его подлинность не будет проверена.'
              : 'Отсутствие отмеченных признаков не гарантирует безопасность письма.'
          }
        </p>
      </div>
    `;
  }
  
  
  // Инициализация задания
  function initTaskB() {
    const elements = getPhishingElements();
  
    elements.calculate.addEventListener('click', calculateTaskB);
  }