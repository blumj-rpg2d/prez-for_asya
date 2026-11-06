// ========================================
// ЗАДАНИЕ Г. РЕЗЕРВНОЕ КОПИРОВАНИЕ
// ========================================


// Форматирование чисел
function formatBackupNumber(value) {
    return new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: 2
    }).format(value);
  }
  
  
  // Получение элементов страницы
  function getBackupElements() {
    return {
      volume: document.getElementById('g-volume'),
      growth: document.getElementById('g-growth'),
      disk: document.getElementById('g-disk'),
      rpo: document.getElementById('g-rpo'),
      rto: document.getElementById('g-rto'),
      speed: document.getElementById('g-speed'),
      calculate: document.getElementById('g-calc'),
      results: document.getElementById('g-results')
    };
  }
  
  
  // Подстановка параметров выбранного варианта
  function loadTaskG(variant) {
    const elements = getBackupElements();
  
    if (!variant || !variant.backup) {
      elements.results.textContent = 'Данные резервного копирования не найдены.';
      return;
    }
  
    const backup = variant.backup;
  
    elements.volume.textContent = formatBackupNumber(backup.volume);
    elements.growth.textContent = formatBackupNumber(backup.growth);
    elements.disk.textContent = formatBackupNumber(backup.disk);
    elements.rpo.textContent = formatBackupNumber(backup.rpo);
    elements.rto.textContent = formatBackupNumber(backup.rto);
  
    calculateTaskG(variant);
  }
  
  
  // Основные расчёты
  function calculateTaskG(variant) {
    const elements = getBackupElements();
  
    if (!variant || !variant.backup) {
      return;
    }
  
    const backup = variant.backup;
  
    const V = Number(backup.volume);
    const delta = Number(backup.growth);
    const disk = Number(backup.disk);
    const RPO = Number(backup.rpo);
    const RTO = Number(backup.rto);
    const speed = Number(elements.speed.value);
  
    // Проверка исходных данных
    if (
      !Number.isFinite(V) || V <= 0 ||
      !Number.isFinite(delta) || delta < 0 ||
      !Number.isFinite(disk) || disk <= 0 ||
      !Number.isFinite(RPO) || RPO <= 0 ||
      !Number.isFinite(RTO) || RTO <= 0
    ) {
      elements.results.innerHTML = `
        <h3>Ошибка исходных данных</h3>
        <p class="backup-bad">
          Проверьте параметры резервного копирования.
        </p>
      `;
      return;
    }
  
    if (!Number.isFinite(speed) || speed <= 0) {
      elements.results.innerHTML = `
        <h3>Ошибка скорости</h3>
        <p class="backup-bad">
          Скорость восстановления должна быть больше нуля.
        </p>
      `;
      return;
    }
  
  
    // 1. Расчёт необходимого объёма хранилища
    // H = 4V + 24Δ
  
    const H = 4 * V + 24 * delta;
  
    const diskEnough = disk >= H;
    const freeSpace = disk - H;
  
  
    // 2. Расчёт времени восстановления
    // T = V * 8192 / (скорость * 3600)
  
    const T = (V * 8192) / (speed * 3600);
  
    const timeEnough = T <= RTO;
  
  
    // 3. Рекомендуемая частота резервного копирования
    // Интервал между копиями не должен превышать RPO.
  
    const backupInterval = RPO;
  
  
    // 4. Формирование результатов
  
    const diskStatus = diskEnough
      ? 'Дискового пространства достаточно.'
      : 'Дискового пространства недостаточно.';
  
    const timeStatus = timeEnough
      ? 'Восстановление укладывается в RTO.'
      : 'Восстановление превышает допустимое время RTO.';
  
  
    // Вывод результатов на страницу
  
    elements.results.innerHTML = `
      <h3>Результаты расчёта</h3>
  
      <div class="backup-result-item">
        <h4>1. Необходимый объём хранилища</h4>
  
        <p class="backup-formula">
          H = 4 × ${formatBackupNumber(V)}
          + 24 × ${formatBackupNumber(delta)}
        </p>
  
        <strong>${formatBackupNumber(H)} ГБ</strong>
  
        <p class="${diskEnough ? 'backup-good' : 'backup-bad'}">
          ${diskStatus}
        </p>
  
        <p>
          Доступно: ${formatBackupNumber(disk)} ГБ.
          ${
            diskEnough
              ? 'Свободный остаток: ' + formatBackupNumber(freeSpace) + ' ГБ.'
              : 'Не хватает: ' + formatBackupNumber(Math.abs(freeSpace)) + ' ГБ.'
          }
        </p>
      </div>
  
      <div class="backup-result-item">
        <h4>2. Время восстановления</h4>
  
        <p class="backup-formula">
          T = (${formatBackupNumber(V)} × 8192)
          / (${formatBackupNumber(speed)} × 3600)
        </p>
  
        <strong>${formatBackupNumber(T)} часа</strong>
  
        <p class="${timeEnough ? 'backup-good' : 'backup-bad'}">
          ${timeStatus}
        </p>
  
        <p>
          Допустимое время RTO:
          ${formatBackupNumber(RTO)} часов.
        </p>
      </div>
  
      <div class="backup-result-item">
        <h4>3. Частота резервного копирования</h4>
  
        <strong>Не реже одного раза в ${formatBackupNumber(backupInterval)} ч.</strong>
  
        <p>
          Значение RPO показывает максимально допустимый период потери
          данных. Интервал между резервными копиями не должен превышать
          это значение.
        </p>
      </div>
  
      <div class="backup-conclusion">
        <h4>Общий вывод</h4>
  
        <p>
          ${
            diskEnough && timeEnough
              ? 'Параметры хранилища и восстановления соответствуют заданным ограничениям.'
              : 'Обнаружены параметры, которые требуют улучшения.'
          }
        </p>
      </div>
    `;
  }
  
  
  // Подключение кнопки
  function initTaskG(getCurrentVariant) {
    const elements = getBackupElements();
  
    elements.calculate.addEventListener('click', () => {
      calculateTaskG(getCurrentVariant());
    });
  
    elements.speed.addEventListener('input', () => {
      calculateTaskG(getCurrentVariant());
    });
  }