const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const ROUND_SECONDS = 30;
const MINIMUM_INCOME = 200;
const INACTIVITY_TIMEOUT = 120 * 1000;

const STAGE_META = [
  { eyebrow: "Этап 1 из 4", title: "Заработай: лови монеты" },
  { eyebrow: "Этап 2 из 4", title: "Собери корзину на неделю" },
  { eyebrow: "Этап 3 из 4", title: "Обязательные платежи" },
  { eyebrow: "Этап 4 из 4", title: "Сбережения и вложения" },
  { eyebrow: "Финансовый итог", title: "Твой маршрут" },
];

const BASE_PRODUCTS = [
  { id: "bread", name: "Хлеб", note: "1 буханка", price: 45, mark: "Х" },
  { id: "milk", name: "Молоко", note: "1 литр", price: 82, mark: "М" },
  { id: "vegetables", name: "Овощи", note: "Набор на неделю", price: 210, mark: "О" },
  { id: "chicken", name: "Мясо птицы", note: "Охлаждённое", price: 260, mark: "П" },
  { id: "grain", name: "Крупа", note: "Гречка, 900 г", price: 95, mark: "К" },
  { id: "eggs", name: "Яйца", note: "10 штук", price: 120, mark: "Я" },
  { id: "butter", name: "Масло", note: "Сливочное, 180 г", price: 170, mark: "М" },
  { id: "tea", name: "Чай", note: "25 пакетиков", price: 105, mark: "Ч" },
  { id: "sugar", name: "Сахар", note: "1 килограмм", price: 72, mark: "С" },
  { id: "apples", name: "Фрукты", note: "Яблоки, 1 кг", price: 150, mark: "Ф" },
  { id: "yogurt", name: "Йогурт", note: "2 упаковки", price: 68, mark: "Й" },
  { id: "soda", name: "Газировка", note: "1,5 литра", price: 110, mark: "Г", optional: true },
  { id: "chocolate", name: "Шоколадка", note: "Большая плитка", price: 130, mark: "Ш", optional: true },
  { id: "chips", name: "Чипсы", note: "Большая пачка", price: 145, mark: "Ч", optional: true },
  { id: "cookies", name: "Печенье", note: "Сладкое, 300 г", price: 120, mark: "П", optional: true },
];

const PAYMENTS = [
  {
    id: "utilities",
    title: "ЖКХ",
    mark: "Ж",
    amount: 260,
    auto: true,
    consequence: "При задержке начисляются пени.",
  },
  {
    id: "mobile",
    title: "Связь",
    mark: "С",
    amount: 80,
    auto: true,
    consequence: "Номер могут временно заблокировать.",
  },
  {
    id: "transport",
    title: "Транспорт",
    mark: "Т",
    amount: 120,
    auto: false,
    consequence: "Придётся искать деньги на каждую поездку.",
  },
  {
    id: "subscriptions",
    title: "Подписки",
    mark: "П",
    amount: 70,
    auto: false,
    consequence: "Доступ к сервисам остановится.",
  },
  {
    id: "internet",
    title: "Интернет",
    mark: "И",
    amount: 110,
    auto: false,
    consequence: "Провайдер приостановит услугу.",
  },
];

const ALLOCATION_KEYS = ["safety", "deposit", "investment"];
const ALLOCATION_LABELS = {
  safety: "Подушка безопасности",
  deposit: "Вклад",
  investment: "Инвестиции",
};
const ALLOCATION_COLORS = {
  safety: "#3ebb78",
  deposit: "#004c3d",
  investment: "#d9b352",
};

const app = document.getElementById("app");
const startPanel = document.getElementById("startPanel");
const startButton = document.getElementById("startButton");
const gameShell = document.getElementById("gameShell");
const stageEyebrow = document.getElementById("stageEyebrow");
const stageTitle = document.getElementById("stageTitle");
const stageProgress = document.getElementById("stageProgress");
const balanceCaption = document.getElementById("balanceCaption");
const balanceValue = document.getElementById("balanceValue");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const footerHint = document.getElementById("footerHint");
const footerTimer = document.getElementById("footerTimer");
const bottomBar = document.querySelector(".bottom-bar");
const caughtCount = document.getElementById("caughtCount");
const coinField = document.getElementById("coinField");
const coinLayer = document.getElementById("coinLayer");
const crosshair = document.getElementById("crosshair");
const productList = document.getElementById("productList");
const shoppingBudgetLabel = document.getElementById("shoppingBudgetLabel");
const budgetFill = document.getElementById("budgetFill");
const basketTotal = document.getElementById("basketTotal");
const basketMessage = document.getElementById("basketMessage");
const basketList = document.getElementById("basketList");
const paymentsGrid = document.getElementById("paymentsGrid");
const allocationBalance = document.getElementById("allocationBalance");
const percentTotal = document.getElementById("percentTotal");
const resultChart = document.getElementById("resultChart");
const chartLegend = document.getElementById("chartLegend");
const resultTitle = document.getElementById("resultTitle");
const resultBalance = document.getElementById("resultBalance");
const resultStats = document.getElementById("resultStats");
const resultAdvice = document.getElementById("resultAdvice");
const toast = document.getElementById("toast");
const toastMark = document.getElementById("toastMark");
const toastText = document.getElementById("toastText");
const devPanel = document.getElementById("devPanel");
const devClose = document.getElementById("devClose");
const devIncome = document.getElementById("devIncome");
const devApplyIncome = document.getElementById("devApplyIncome");
const devTimerToggle = document.getElementById("devTimerToggle");
const devSpawn = document.getElementById("devSpawn");
const devNext = document.getElementById("devNext");

const stageElements = [
  document.getElementById("earnStage"),
  document.getElementById("shoppingStage"),
  document.getElementById("paymentsStage"),
  document.getElementById("allocationStage"),
  document.getElementById("resultStage"),
];

const rangeElements = {
  safety: document.getElementById("safetyRange"),
  deposit: document.getElementById("depositRange"),
  investment: document.getElementById("investmentRange"),
};

const allocationValueElements = {
  safety: document.getElementById("safetyValue"),
  deposit: document.getElementById("depositValue"),
  investment: document.getElementById("investmentValue"),
};

const allocationAmountElements = {
  safety: document.getElementById("safetyAmount"),
  deposit: document.getElementById("depositAmount"),
  investment: document.getElementById("investmentAmount"),
};

let state = createInitialState();
let coins = [];
let coinSequence = 0;
let roundRunning = false;
let lastFrameTime = 0;
let spawnAccumulator = 0;
let toastTimer = 0;
let inactivityTimer = 0;
let crosshairPosition = { x: 700, y: 400 };

function createInitialState() {
  return {
    stage: 0,
    earned: 0,
    caught: 0,
    remainingTime: ROUND_SECONDS,
    timerEnabled: true,
    bonusSpawned: false,
    bonusCaught: false,
    shoppingBudget: 0,
    budgetFactor: [0.4, 0.5, 0.6][Math.floor(Math.random() * 3)],
    saleIds: pickRandom(BASE_PRODUCTS.map((product) => product.id), 3),
    basket: [],
    paymentStates: {},
    paymentsInitialized: false,
    allocations: { safety: 40, deposit: 35, investment: 25 },
    investmentRate: 0,
    finalAmounts: null,
  };
}

function pickRandom(values, count) {
  return [...values].sort(() => Math.random() - 0.5).slice(0, count);
}

function formatMoney(value) {
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

function pluralCoins(value) {
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod10 === 1 && mod100 !== 11) return `${value} монета`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${value} монеты`;
  return `${value} монет`;
}

function fitApp() {
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
  app.style.transform = `scale(${scale})`;
  app.style.marginLeft = `${(window.innerWidth - DESIGN_WIDTH * scale) / 2}px`;
  app.style.marginTop = `${(window.innerHeight - DESIGN_HEIGHT * scale) / 2}px`;
  resetViewportPosition();
}

function resetViewportPosition() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.scrollTo(0, 0);
}

function requestFullscreenMode() {
  // Полноэкранный режим задаёт музейная оболочка, а не первое касание посетителя.
}

function blockBrowserShortcuts(event) {
  const key = event.key.toLowerCase();
  if ((event.ctrlKey || event.metaKey) && key === "d") {
    event.preventDefault();
    toggleDeveloperPanel();
    return;
  }

  const blockedKeys = ["F5", "F11", "F12"];
  const blockedCombo =
    (event.ctrlKey || event.metaKey) && ["a", "c", "p", "r", "s", "u", "+", "-", "0"].includes(key);

  if (blockedKeys.includes(event.key) || blockedCombo) event.preventDefault();
}

function resetInactivityTimer() {
  window.clearTimeout(inactivityTimer);
  if (!startPanel.hidden) return;
  inactivityTimer = window.setTimeout(returnToStart, INACTIVITY_TIMEOUT);
}

function startGame() {
  requestFullscreenMode();
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  state = createInitialState();
  clearCoins();
  startPanel.hidden = true;
  gameShell.hidden = false;
  showStage(0);
  startCoinRound(false);
  resetViewportPosition();
  window.setTimeout(resetViewportPosition, 0);
  resetInactivityTimer();
}

function returnToStart() {
  startGame();
  toast.hidden = true;
}

function showStage(index) {
  state.stage = index;
  stageElements.forEach((element, elementIndex) => {
    element.hidden = elementIndex !== index;
    element.classList.toggle("is-active", elementIndex === index);
  });

  stageEyebrow.textContent = STAGE_META[index].eyebrow;
  stageTitle.textContent = STAGE_META[index].title;
  renderStageProgress();

  if (index === 1) {
    prepareShoppingStage();
    renderShopping();
  }
  if (index === 2) {
    initializePayments();
    renderPayments();
  }
  if (index === 3) renderAllocations();
  if (index === 4) renderResult();

  updateStageControls();
  resetViewportPosition();
  resetInactivityTimer();
}

function renderStageProgress() {
  const steps = stageProgress.querySelectorAll("span");
  steps.forEach((step, index) => {
    step.classList.toggle("is-active", state.stage === index);
    step.classList.toggle("is-complete", state.stage > index || state.stage === 4);
  });
}

function updateStageControls() {
  bottomBar.classList.toggle("result-mode", state.stage === 4);
  backButton.disabled = state.stage === 0;
  backButton.hidden = state.stage === 4;
  nextButton.disabled = false;

  if (state.stage === 0) {
    balanceCaption.textContent = "Заработано";
    balanceValue.textContent = formatMoney(state.earned);
    caughtCount.textContent = pluralCoins(state.caught);
    footerTimer.textContent = state.timerEnabled ? formatTime(state.remainingTime) : "∞";

    if (roundRunning && state.timerEnabled) {
      footerHint.textContent = "Лови монеты, пока идёт время";
      nextButton.textContent = "Идёт раунд";
      nextButton.disabled = true;
    } else if (state.earned >= MINIMUM_INCOME) {
      footerHint.textContent = "Доход готов — переходи к планированию";
      nextButton.textContent = "К покупкам";
    } else {
      footerHint.textContent = `Для покупок заработай ещё ${formatMoney(MINIMUM_INCOME - state.earned)}`;
      nextButton.textContent = "Ещё раунд";
    }
    return;
  }

  if (state.stage === 1) {
    const total = getBasketTotal();
    balanceCaption.textContent = "Заработано";
    balanceValue.textContent = formatMoney(state.earned);
    footerHint.textContent = total > state.shoppingBudget
      ? "Корзина дороже лимита — убери или замени товар"
      : "Собери разумную корзину и не превышай лимит";
    footerTimer.textContent = `${state.basket.length} шт.`;
    nextButton.textContent = "К платежам";
    nextButton.disabled = state.basket.length === 0 || total > state.shoppingBudget;
    return;
  }

  if (state.stage === 2) {
    const decided = PAYMENTS.filter((payment) => state.paymentStates[payment.id] !== "idle").length;
    balanceCaption.textContent = "Свободно";
    balanceValue.textContent = formatMoney(getAvailableAfterPayments());
    footerHint.textContent = decided === PAYMENTS.length
      ? "Все платежи разобраны"
      : `Прими решение ещё по ${PAYMENTS.length - decided} платежам`;
    footerTimer.textContent = `${decided} / ${PAYMENTS.length}`;
    nextButton.textContent = "К сбережениям";
    nextButton.disabled = decided !== PAYMENTS.length;
    return;
  }

  if (state.stage === 3) {
    const total = ALLOCATION_KEYS.reduce((sum, key) => sum + state.allocations[key], 0);
    balanceCaption.textContent = "Для распределения";
    balanceValue.textContent = formatMoney(getAvailableAfterPayments());
    footerHint.textContent = "Меняя один ползунок, ты сохраняешь общую сумму 100%";
    footerTimer.textContent = `${total}%`;
    nextButton.textContent = "Распределить";
    nextButton.disabled = total !== 100;
    return;
  }

  balanceCaption.textContent = "Финальный баланс";
  balanceValue.textContent = formatMoney(state.finalAmounts?.total ?? 0);
  footerHint.textContent = "Новый раунд изменит акции, лимит и результат инвестиций";
  footerTimer.textContent = "Готово";
  nextButton.textContent = "Повторить";
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.ceil(seconds));
  return `00:${String(safeSeconds).padStart(2, "0")}`;
}

function startCoinRound(keepIncome) {
  if (!keepIncome) {
    state.earned = 0;
    state.caught = 0;
  }
  state.remainingTime = ROUND_SECONDS;
  state.bonusSpawned = false;
  state.bonusCaught = false;
  roundRunning = true;
  spawnAccumulator = 0;
  clearCoins();
  for (let index = 0; index < 5; index += 1) spawnCoin(false);
  updateStageControls();
}

function endCoinRound() {
  roundRunning = false;
  state.remainingTime = 0;
  updateStageControls();
  showToast(
    state.earned >= MINIMUM_INCOME
      ? `Раунд завершён. Ты заработал ${formatMoney(state.earned)}.`
      : "Доход пока слишком мал для следующего этапа. Запусти ещё один раунд — сумма сохранится.",
    state.earned < MINIMUM_INCOME,
  );
}

function spawnCoin(forceBonus = false) {
  if (state.stage !== 0 || !roundRunning) return;
  if (coins.length >= 11 && !forceBonus) return;

  const bonus = forceBonus || (!state.bonusSpawned && state.remainingTime <= 20 && state.remainingTime > 8);
  if (bonus) state.bonusSpawned = true;

  const roll = Math.random();
  const value = roll < 0.38 ? 10 : roll < 0.78 ? 50 : 100;
  const size = bonus ? 142 : value === 100 ? 126 : 112;
  const width = coinLayer.clientWidth || 1360;
  const height = coinLayer.clientHeight || 800;
  const speed = bonus ? 115 : 90 + Math.random() * 90;
  const angle = Math.random() * Math.PI * 2;
  const element = document.createElement("div");
  element.className = `flying-coin${bonus ? " bonus" : ` value-${value}`}`;
  element.innerHTML = bonus ? "БОНУС<br>+20%" : `${value} ₽`;

  const coin = {
    id: ++coinSequence,
    element,
    value,
    bonus,
    size,
    x: 22 + Math.random() * Math.max(1, width - size - 44),
    y: 112 + Math.random() * Math.max(1, height - size - 178),
    vx: Math.cos(angle) * speed || speed,
    vy: Math.sin(angle) * speed || speed * 0.7,
  };

  coinLayer.append(element);
  coins.push(coin);
  placeCoin(coin);
}

function placeCoin(coin) {
  coin.element.style.transform = `translate3d(${coin.x}px, ${coin.y}px, 0)`;
}

function updateCoins(deltaSeconds) {
  const width = coinLayer.clientWidth;
  const height = coinLayer.clientHeight;

  coins.forEach((coin) => {
    coin.x += coin.vx * deltaSeconds;
    coin.y += coin.vy * deltaSeconds;

    if (coin.x <= 10 || coin.x + coin.size >= width - 10) {
      coin.x = Math.max(10, Math.min(coin.x, width - coin.size - 10));
      coin.vx *= -1;
    }
    if (coin.y <= 102 || coin.y + coin.size >= height - 36) {
      coin.y = Math.max(102, Math.min(coin.y, height - coin.size - 36));
      coin.vy *= -1;
    }
    placeCoin(coin);
  });
}

function animationLoop(timestamp) {
  const delta = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 1000, 0.05) : 0;
  lastFrameTime = timestamp;

  if (roundRunning && state.stage === 0) {
    updateCoins(delta);
    spawnAccumulator += delta;

    if (spawnAccumulator >= 0.95) {
      spawnAccumulator = 0;
      spawnCoin(false);
    }

    if (state.timerEnabled) {
      state.remainingTime = Math.max(0, state.remainingTime - delta);
      footerTimer.textContent = formatTime(state.remainingTime);
      if (state.remainingTime <= 0) endCoinRound();
    }
  }

  window.requestAnimationFrame(animationLoop);
}

function catchCoin(coin) {
  if (!roundRunning || !coins.includes(coin)) return;
  let gain = coin.value;
  if (coin.bonus) {
    gain = Math.max(100, Math.round((state.earned * 0.2) / 10) * 10);
    state.bonusCaught = true;
  }

  state.earned += gain;
  state.caught += 1;
  createCatchFlash(coin, gain);
  coin.element.remove();
  coins = coins.filter((candidate) => candidate !== coin);
  updateStageControls();
}

function createCatchFlash(coin, gain) {
  const flash = document.createElement("div");
  flash.className = "catch-flash";
  flash.textContent = `+${gain}`;
  flash.style.left = `${coin.x + coin.size / 2 - 45}px`;
  flash.style.top = `${coin.y + coin.size / 2 - 45}px`;
  coinLayer.append(flash);
  window.setTimeout(() => flash.remove(), 520);
}

function clearCoins() {
  coins.forEach((coin) => coin.element.remove());
  coins = [];
  coinLayer.querySelectorAll(".catch-flash").forEach((flash) => flash.remove());
}

function handleCoinPointer(event) {
  if (!roundRunning || state.stage !== 0) return;
  event.preventDefault();

  let nearest = null;
  let nearestDistance = Infinity;
  coins.forEach((coin) => {
    const rect = coin.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
    const hitRadius = Math.max(rect.width, rect.height) / 2 + 14;
    if (distance <= hitRadius && distance < nearestDistance) {
      nearest = coin;
      nearestDistance = distance;
    }
  });

  if (nearest) catchCoin(nearest);
}

function handleKeyboardAim(event) {
  if (state.stage !== 0 || !roundRunning) return;
  const moveKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
  if (!moveKeys.includes(event.key) && event.code !== "Space") return;
  event.preventDefault();
  crosshair.hidden = false;

  const step = event.shiftKey ? 70 : 35;
  if (event.key === "ArrowLeft") crosshairPosition.x -= step;
  if (event.key === "ArrowRight") crosshairPosition.x += step;
  if (event.key === "ArrowUp") crosshairPosition.y -= step;
  if (event.key === "ArrowDown") crosshairPosition.y += step;
  crosshairPosition.x = Math.max(46, Math.min(coinLayer.clientWidth - 46, crosshairPosition.x));
  crosshairPosition.y = Math.max(120, Math.min(coinLayer.clientHeight - 46, crosshairPosition.y));
  crosshair.style.left = `${crosshairPosition.x - 46}px`;
  crosshair.style.top = `${crosshairPosition.y - 46}px`;

  if (event.code === "Space") {
    let nearest = null;
    let distance = 140;
    coins.forEach((coin) => {
      const candidateDistance = Math.hypot(
        crosshairPosition.x - (coin.x + coin.size / 2),
        crosshairPosition.y - (coin.y + coin.size / 2),
      );
      if (candidateDistance < distance) {
        nearest = coin;
        distance = candidateDistance;
      }
    });
    if (nearest) catchCoin(nearest);
  }
}

function prepareShoppingStage() {
  if (state.shoppingBudget > 0) return;
  const rounded = Math.round((state.earned * state.budgetFactor) / 100) * 100;
  state.shoppingBudget = Math.max(100, Math.min(state.earned, rounded));
}

function getProductPrice(product) {
  return state.saleIds.includes(product.id) ? Math.round(product.price * 0.9) : product.price;
}

function getBasketTotal() {
  return state.basket.reduce((sum, productId) => {
    const product = BASE_PRODUCTS.find((item) => item.id === productId);
    return sum + (product ? getProductPrice(product) : 0);
  }, 0);
}

function toggleProduct(productId) {
  if (state.basket.includes(productId)) {
    state.basket = state.basket.filter((id) => id !== productId);
  } else {
    state.basket.push(productId);
  }
  resetDownstreamChoices();
  renderShopping();
  resetViewportPosition();
  resetInactivityTimer();
}

function resetDownstreamChoices() {
  state.paymentStates = {};
  state.paymentsInitialized = false;
  state.finalAmounts = null;
}

function renderShopping() {
  shoppingBudgetLabel.textContent = formatMoney(state.shoppingBudget);
  productList.innerHTML = BASE_PRODUCTS.map((product) => {
    const selected = state.basket.includes(product.id);
    const sale = state.saleIds.includes(product.id);
    const price = getProductPrice(product);
    return `
      <article class="product-card${selected ? " is-selected" : ""}" data-product="${product.id}">
        <button class="product-badge" type="button" role="checkbox" aria-checked="${selected}" aria-label="${selected ? "Убрать" : "Добавить"} ${product.name}">${product.mark}</button>
        <div class="product-copy">
          <h3>${product.name}${sale ? '<span class="sale-label">Акция −10%</span>' : ""}</h3>
          <p>${product.note}</p>
        </div>
        <div class="product-price">${sale ? `<s>${formatMoney(product.price)}</s>` : ""}${formatMoney(price)}</div>
        <button class="product-action" type="button" aria-pressed="${selected}">${selected ? "Убрать" : "В корзину"}</button>
      </article>
    `;
  }).join("");

  productList.querySelectorAll(".product-card").forEach((card) => {
    const productId = card.dataset.product;
    card.querySelector(".product-badge").addEventListener("click", () => toggleProduct(productId));
    card.querySelector(".product-action").addEventListener("click", () => toggleProduct(productId));
  });

  const total = getBasketTotal();
  const ratio = state.shoppingBudget > 0 ? total / state.shoppingBudget : 0;
  budgetFill.style.width = `${Math.min(ratio * 100, 100)}%`;
  budgetFill.classList.toggle("is-over", total > state.shoppingBudget);
  basketTotal.textContent = formatMoney(total);

  if (state.basket.length === 0) {
    basketMessage.textContent = "Добавь продукты, которые действительно нужны на неделю.";
    basketMessage.classList.remove("is-warning");
  } else if (total > state.shoppingBudget) {
    const priciest = state.basket
      .map((id) => BASE_PRODUCTS.find((product) => product.id === id))
      .filter(Boolean)
      .sort((a, b) => getProductPrice(b) - getProductPrice(a))[0];
    basketMessage.textContent = `Лимит превышен на ${formatMoney(total - state.shoppingBudget)}. Попробуй убрать «${priciest.name}» или выбрать товары по акции.`;
    basketMessage.classList.add("is-warning");
  } else {
    basketMessage.textContent = `В лимите осталось ${formatMoney(state.shoppingBudget - total)}. Акционные товары уже учтены со скидкой.`;
    basketMessage.classList.remove("is-warning");
  }

  basketList.innerHTML = state.basket.length
    ? state.basket.map((productId) => {
        const product = BASE_PRODUCTS.find((item) => item.id === productId);
        return `
          <div class="basket-line">
            <span>${product.name}</span>
            <strong>${formatMoney(getProductPrice(product))}</strong>
            <button class="basket-remove" type="button" data-remove="${product.id}" aria-label="Убрать ${product.name}">×</button>
          </div>
        `;
      }).join("")
    : "";

  basketList.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => toggleProduct(button.dataset.remove));
  });
  updateStageControls();
}

function initializePayments() {
  if (state.paymentsInitialized) return;
  PAYMENTS.forEach((payment) => {
    state.paymentStates[payment.id] = "idle";
  });

  PAYMENTS.filter((payment) => payment.auto).forEach((payment) => {
    state.paymentStates[payment.id] = getAvailableAfterPayments() >= payment.amount ? "paid" : "insufficient";
  });
  state.paymentsInitialized = true;
}

function getPaidTotal() {
  return PAYMENTS.reduce(
    (sum, payment) => sum + (state.paymentStates[payment.id] === "paid" ? payment.amount : 0),
    0,
  );
}

function getAvailableAfterPayments() {
  return Math.max(0, state.earned - getBasketTotal() - getPaidTotal());
}

function setPaymentStatus(paymentId, requestedStatus) {
  const payment = PAYMENTS.find((item) => item.id === paymentId);
  if (!payment) return;
  const current = state.paymentStates[paymentId];

  if (requestedStatus === "paid") {
    if (current === "paid") return;
    if (getAvailableAfterPayments() < payment.amount) {
      state.paymentStates[paymentId] = "insufficient";
      showToast(`На «${payment.title}» не хватает денег. ${payment.consequence} Можно вернуться и пересобрать корзину.`, true);
    } else {
      state.paymentStates[paymentId] = "paid";
    }
  } else {
    state.paymentStates[paymentId] = "deferred";
    showToast(`Платёж «${payment.title}» отложен. ${payment.consequence}`, true);
  }

  state.finalAmounts = null;
  renderPayments();
  resetViewportPosition();
  resetInactivityTimer();
}

function paymentStatusText(status, auto) {
  if (status === "paid") return auto ? "Оплачено автоматически" : "Оплачено";
  if (status === "deferred") return "Отложено";
  if (status === "insufficient") return "Недостаточно средств";
  return "Ждёт решения";
}

function renderPayments() {
  paymentsGrid.innerHTML = PAYMENTS.map((payment) => {
    const status = state.paymentStates[payment.id] ?? "idle";
    return `
      <article class="payment-card is-${status}" data-payment="${payment.id}">
        <div class="payment-main">
          <div class="payment-icon" aria-hidden="true">${payment.mark}</div>
          <div class="payment-copy">
            <h3>${payment.title}</h3>
            <p>${status === "deferred" || status === "insufficient" ? payment.consequence : payment.auto ? "Регулярный автоплатёж" : "Запланированный расход"}</p>
            <span class="payment-status">${paymentStatusText(status, payment.auto)}</span>
          </div>
          <strong class="payment-price">${formatMoney(payment.amount)}</strong>
        </div>
        <div class="payment-actions">
          <button class="payment-action pay${status === "paid" ? " is-selected" : ""}" type="button" data-action="paid">${status === "paid" ? "Оплачено" : "Оплатить"}</button>
          <button class="payment-action defer${status === "deferred" ? " is-selected" : ""}" type="button" data-action="deferred">Отложить</button>
        </div>
      </article>
    `;
  }).join("");

  paymentsGrid.querySelectorAll(".payment-card").forEach((card) => {
    card.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => setPaymentStatus(card.dataset.payment, button.dataset.action));
    });
  });
  updateStageControls();
}

function setAllocation(activeKey, rawValue) {
  const value = Math.max(0, Math.min(100, Number(rawValue)));
  const otherKeys = ALLOCATION_KEYS.filter((key) => key !== activeKey);
  const remaining = 100 - value;
  const oldOtherTotal = state.allocations[otherKeys[0]] + state.allocations[otherKeys[1]];
  const firstShare = oldOtherTotal > 0 ? state.allocations[otherKeys[0]] / oldOtherTotal : 0.5;
  const firstValue = Math.round(remaining * firstShare);

  state.allocations[activeKey] = value;
  state.allocations[otherKeys[0]] = firstValue;
  state.allocations[otherKeys[1]] = remaining - firstValue;
  state.finalAmounts = null;
  renderAllocations();
}

function renderAllocations() {
  const available = getAvailableAfterPayments();
  allocationBalance.textContent = formatMoney(available);
  const total = ALLOCATION_KEYS.reduce((sum, key) => sum + state.allocations[key], 0);
  percentTotal.textContent = `${total}%`;

  ALLOCATION_KEYS.forEach((key) => {
    const percent = state.allocations[key];
    rangeElements[key].value = percent;
    rangeElements[key].style.setProperty("--value", `${percent}%`);
    allocationValueElements[key].textContent = `${percent}%`;
    allocationAmountElements[key].textContent = formatMoney((available * percent) / 100);
  });
  updateStageControls();
}

function finalizeAllocation() {
  const available = getAvailableAfterPayments();
  const rateOptions = [-0.1, 0, 0.1];
  state.investmentRate = rateOptions[Math.floor(Math.random() * rateOptions.length)];
  const safetyBase = (available * state.allocations.safety) / 100;
  const depositBase = (available * state.allocations.deposit) / 100;
  const investmentBase = (available * state.allocations.investment) / 100;
  const safety = Math.round(safetyBase);
  const deposit = Math.round(depositBase * 1.05);
  const investment = Math.round(investmentBase * (1 + state.investmentRate));

  state.finalAmounts = {
    safety,
    deposit,
    investment,
    total: safety + deposit + investment,
  };
  showStage(4);
}

function renderResult() {
  if (!state.finalAmounts) return;
  const available = getAvailableAfterPayments();
  const deferred = PAYMENTS.filter((payment) => state.paymentStates[payment.id] !== "paid").length;
  const paid = PAYMENTS.length - deferred;
  const investmentSign = state.investmentRate > 0 ? "+" : state.investmentRate < 0 ? "−" : "";
  const investmentPercent = `${investmentSign}${Math.abs(state.investmentRate * 100)}%`;

  resultTitle.textContent = deferred === 0 ? "Все важные решения приняты" : "Баланс собран — есть что улучшить";
  resultBalance.textContent = formatMoney(state.finalAmounts.total);
  resultStats.innerHTML = `
    <div class="result-stat"><span>Продукты</span><strong>${formatMoney(getBasketTotal())}</strong></div>
    <div class="result-stat"><span>Платежи</span><strong>${paid} из ${PAYMENTS.length}</strong></div>
    <div class="result-stat"><span>Инвестиции</span><strong>${investmentPercent}</strong></div>
  `;

  const advice = [];
  const optionalProducts = state.basket
    .map((productId) => BASE_PRODUCTS.find((product) => product.id === productId))
    .filter((product) => product?.optional);
  if (optionalProducts.length > 0) {
    const names = optionalProducts.map((product) => product.name.toLowerCase()).join(", ");
    advice.push(`В корзине есть необязательные покупки: ${names}. Они уменьшают сумму, которую можно сохранить.`);
  } else {
    advice.push("В корзине нет лишних сладостей и снеков — больше денег осталось на важное и сбережения.");
  }
  if (state.allocations.safety >= 20) {
    advice.push(`Ты направил ${state.allocations.safety}% в подушку безопасности — это хороший старт.`);
  } else {
    advice.push("Подушка меньше 20%: попробуй оставить больше денег на непредвиденные расходы.");
  }
  if (deferred > 0) {
    advice.push(`Отложено или не оплачено: ${deferred}. Обязательные счета лучше планировать заранее.`);
  } else {
    advice.push("Все платежи закрыты вовремя — это защищает от пеней и отключения услуг.");
  }
  advice.push(
    state.investmentRate < 0
      ? "Инвестиции снизились на 10%: возможный доход всегда связан с риском."
      : "Вклад дал стабильные 5%, а результат инвестиций показал влияние риска.",
  );
  resultAdvice.innerHTML = advice.map((line) => `<div class="advice-line">${line}</div>`).join("");

  renderResultChart(available);
}

function renderResultChart(available) {
  const radius = 150;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const circles = ALLOCATION_KEYS.map((key) => {
    const percent = state.allocations[key];
    const length = (circumference * percent) / 100;
    const circle = `<circle cx="200" cy="200" r="${radius}" fill="none" stroke="${ALLOCATION_COLORS[key]}" stroke-width="76" stroke-dasharray="${length} ${circumference - length}" stroke-dashoffset="${-offset}" transform="rotate(-90 200 200)" />`;
    offset += length;
    return circle;
  }).join("");

  resultChart.innerHTML = `
    <svg viewBox="0 0 400 400" role="img" aria-label="Круговая диаграмма распределения средств">
      <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(5,20,10,.12)" stroke-width="76" />
      ${circles}
      <circle cx="200" cy="200" r="103" fill="#9aa89b" />
      <text x="200" y="183" text-anchor="middle" fill="#004c3d" font-family="Start Text, Arial" font-size="23">Распределено</text>
      <text x="200" y="226" text-anchor="middle" fill="#004c3d" font-family="Start Headings, Georgia" font-size="39" font-weight="700">${formatMoney(available)}</text>
    </svg>
  `;

  chartLegend.innerHTML = ALLOCATION_KEYS.map((key) => `
    <div class="legend-line">
      <i style="background:${ALLOCATION_COLORS[key]}"></i>
      <span>${ALLOCATION_LABELS[key]}</span>
      <strong>${state.allocations[key]}% · ${formatMoney(state.finalAmounts[key])}</strong>
    </div>
  `).join("");
}

function goNext() {
  if (nextButton.disabled) return;
  if (state.stage === 0) {
    if (roundRunning && !state.timerEnabled) roundRunning = false;
    if (state.earned < MINIMUM_INCOME) {
      startCoinRound(true);
      return;
    }
    showStage(1);
    return;
  }
  if (state.stage === 1) {
    showStage(2);
    return;
  }
  if (state.stage === 2) {
    showStage(3);
    return;
  }
  if (state.stage === 3) {
    finalizeAllocation();
    return;
  }
  startGame();
}

function goBack() {
  if (state.stage <= 0) return;
  showStage(state.stage - 1);
}

function showToast(message, warning = false) {
  window.clearTimeout(toastTimer);
  toastText.textContent = message;
  toastMark.textContent = warning ? "!" : "✓";
  toast.classList.toggle("is-warning", warning);
  toast.hidden = false;
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 4200);
}

function toggleDeveloperPanel(force) {
  const shouldShow = typeof force === "boolean" ? force : devPanel.hidden;
  devPanel.hidden = !shouldShow;
}

function applyDeveloperIncome() {
  state.earned = Math.max(0, Number(devIncome.value) || 0);
  state.shoppingBudget = 0;
  state.basket = [];
  resetDownstreamChoices();
  if (state.stage >= 1) prepareShoppingStage();
  if (state.stage === 1) renderShopping();
  if (state.stage === 2) {
    initializePayments();
    renderPayments();
  }
  if (state.stage === 3) renderAllocations();
  updateStageControls();
  showToast(`Тестовая сумма: ${formatMoney(state.earned)}.`);
}

function toggleDeveloperTimer() {
  state.timerEnabled = !state.timerEnabled;
  devTimerToggle.textContent = state.timerEnabled ? "Выключить таймер" : "Включить таймер";
  updateStageControls();
}

function developerAdvance() {
  if (!startPanel.hidden === true) startGame();

  if (state.stage === 0) {
    state.earned = Math.max(state.earned, Number(devIncome.value) || 1400);
    roundRunning = false;
    state.remainingTime = 0;
    showStage(1);
    return;
  }

  if (state.stage === 1) {
    if (state.basket.length === 0) {
      const selected = BASE_PRODUCTS
        .filter((product) => ["bread", "milk", "vegetables"].includes(product.id))
        .filter((product, index, list) => {
          const subtotal = list.slice(0, index + 1).reduce((sum, item) => sum + getProductPrice(item), 0);
          return subtotal <= state.shoppingBudget;
        });
      state.basket = selected.length ? selected.map((product) => product.id) : ["bread"];
    }
    showStage(2);
    return;
  }

  if (state.stage === 2) {
    PAYMENTS.forEach((payment) => {
      if (state.paymentStates[payment.id] === "idle") state.paymentStates[payment.id] = "deferred";
    });
    showStage(3);
    return;
  }

  if (state.stage === 3) {
    finalizeAllocation();
    return;
  }

  startGame();
}

function handleProductKeyboard(event) {
  if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
  const buttons = [...productList.querySelectorAll(".product-action")];
  const currentIndex = buttons.indexOf(document.activeElement);
  if (currentIndex < 0) return;
  event.preventDefault();
  const direction = event.key === "ArrowDown" ? 1 : -1;
  const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
  buttons[nextIndex].focus();
  buttons[nextIndex].scrollIntoView({ block: "nearest" });
}

startButton.addEventListener("click", startGame);
backButton.addEventListener("click", goBack);
nextButton.addEventListener("click", goNext);
coinField.addEventListener("pointerdown", handleCoinPointer);
productList.addEventListener("keydown", handleProductKeyboard);

ALLOCATION_KEYS.forEach((key) => {
  rangeElements[key].addEventListener("input", (event) => setAllocation(key, event.target.value));
});

devClose.addEventListener("click", () => toggleDeveloperPanel(false));
devApplyIncome.addEventListener("click", applyDeveloperIncome);
devTimerToggle.addEventListener("click", toggleDeveloperTimer);
devSpawn.addEventListener("click", () => {
  if (state.stage !== 0) showStage(0);
  if (!roundRunning) roundRunning = true;
  spawnCoin(false);
  updateStageControls();
});
devNext.addEventListener("click", developerAdvance);

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("selectstart", (event) => event.preventDefault());
document.addEventListener("dragstart", (event) => event.preventDefault());
document.addEventListener("keydown", blockBrowserShortcuts);
document.addEventListener("keydown", handleKeyboardAim);
document.addEventListener("pointerdown", resetInactivityTimer);
document.addEventListener("pointerup", () => window.setTimeout(resetViewportPosition, 0));
document.addEventListener("keydown", resetInactivityTimer);
window.addEventListener("resize", fitApp);
document.addEventListener("fullscreenchange", () => {
  resetViewportPosition();
  if (!document.fullscreenElement && startPanel.hidden) window.setTimeout(requestFullscreenMode, 200);
});

fitApp();
window.requestAnimationFrame(animationLoop);
if (new URLSearchParams(window.location.search).has("dev")) toggleDeveloperPanel(true);
startPanel.hidden = true;
startPanel.remove();
startGame();
window.ExhibitUI?.mount({ timeout: INACTIVITY_TIMEOUT, reset: startGame });
