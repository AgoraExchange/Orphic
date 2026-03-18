(() => {
  "use strict";

  const STORAGE_KEY = "aster_vault_prop_app_v4";
  const LIVE_TICK_MS = 5000;

  const chartSeries = {
    LIVE: [14, 18, 17, 21, 24, 22, 28, 26, 31, 29, 35, 39],
    "1D": [12, 14, 13, 16, 18, 17, 20, 23, 22, 24, 27, 30],
    "1W": [8, 9, 10, 11, 14, 13, 16, 18, 20, 19, 22, 24],
    "1M": [10, 12, 15, 14, 16, 19, 18, 22, 24, 26, 28, 32],
    "3M": [5, 8, 10, 12, 15, 17, 16, 20, 23, 25, 29, 34],
    YTD: [3, 5, 7, 11, 13, 16, 18, 21, 25, 27, 31, 37]
  };

  const rangeMeta = {
    LIVE: { dollar: 842.22, percent: 0.74, label: "Live" },
    "1D": { dollar: 1284.92, percent: 1.16, label: "Today" },
    "1W": { dollar: 4218.38, percent: 3.44, label: "Past Week" },
    "1M": { dollar: 18240.18, percent: 8.72, label: "Past Month" },
    "3M": { dollar: 42110.22, percent: 17.58, label: "Past 3 Months" },
    YTD: { dollar: 68440.74, percent: 28.46, label: "Year to Date" }
  };

  const topMoversDefaults = [
    { symbol: "LTR", name: "Lighter", price: 18.42, move: 22.41 },
    { symbol: "W", name: "Wormhole", price: 0.91, move: 18.23 },
    { symbol: "EIGEN", name: "EigenLayer", price: 14.28, move: 16.88 },
    { symbol: "ZRO", name: "LayerZero", price: 6.41, move: 13.17 },
    { symbol: "DONK", name: "Donk", price: 0.0048, move: 11.62 }
  ];

  const exploreTradableDefaults = [
    { symbol: "ADA", name: "Cardano", price: 0.84, move: 3.12 },
    { symbol: "DOGE", name: "Dogecoin", price: 0.19, move: 4.82 },
    { symbol: "AVAX", name: "Avalanche", price: 41.22, move: 2.77 },
    { symbol: "LINK", name: "Chainlink", price: 18.91, move: 1.34 },
    { symbol: "DOT", name: "Polkadot", price: 7.42, move: -0.88 },
    { symbol: "MATIC", name: "Polygon", price: 1.08, move: 1.72 },
    { symbol: "PEPE", name: "Pepe", price: 0.000012, move: 8.51 },
    { symbol: "SHIB", name: "Shiba Inu", price: 0.000028, move: 3.08 },
    { symbol: "UNI", name: "Uniswap", price: 11.26, move: 2.14 }
  ];

  const exploreNonTradableDefaults = [
    { symbol: "XMR", name: "Monero", price: 142.34, move: 0.92 },
    { symbol: "KAS", name: "Kaspa", price: 0.16, move: 4.11 },
    { symbol: "TAO", name: "Bittensor", price: 482.22, move: 6.32 },
    { symbol: "FLR", name: "Flare", price: 0.028, move: 2.12 },
    { symbol: "INJ", name: "Injective", price: 36.84, move: 3.44 },
    { symbol: "SEI", name: "Sei", price: 0.72, move: 1.78 },
    { symbol: "SUI", name: "Sui", price: 1.91, move: 2.35 },
    { symbol: "APT", name: "Aptos", price: 12.22, move: -0.54 },
    { symbol: "ARB", name: "Arbitrum", price: 1.14, move: 1.06 }
  ];

  const historyDefaults = [
    { type: "buy", title: "Bought Bitcoin", subtitle: "Market buy • 0.182 BTC", amount: -18240.22, date: "Today • 2:14 PM" },
    { type: "buy", title: "Bought TSLA", subtitle: "Market buy • 4.2 shares", amount: -1045.13, date: "Today • 11:40 AM" },
    { type: "sell", title: "Sold Solana", subtitle: "Market sell • 20 SOL", amount: 4584.20, date: "Yesterday • 5:22 PM" },
    { type: "transfer", title: "Instant Deposit", subtitle: "Buying power increase", amount: 5000.00, date: "Yesterday • 9:02 AM" },
    { type: "buy", title: "Bought NVIDIA", subtitle: "Market buy • 2.0 shares", amount: -1824.36, date: "Mar 12 • 1:18 PM" },
    { type: "sell", title: "Sold XRP", subtitle: "Market sell • 2000 XRP", amount: 5280.00, date: "Mar 11 • 4:33 PM" }
  ];

  const defaultState = {
    selectedRange: "LIVE",
    exploreFilter: "tradable",
    liveBaseTotal: null,
    liveCurrentTotal: null,
    liveProfitDollar: 842.22,
    liveProfitPercent: 0.74,
    banners: {
      topInfoBanner: true
    },
    discoverCards: [
      {
        id: "disc1",
        title: "Build your watchlist",
        text: "Track leading movers, crypto names, and breakout sectors all in one place."
      },
      {
        id: "disc2",
        title: "Explore market themes",
        text: "Browse trending sectors and screeners investors are watching most this week."
      }
    ],
    topMovers: topMoversDefaults,
    exploreTradable: exploreTradableDefaults,
    exploreNonTradable: exploreNonTradableDefaults,
    historyItems: historyDefaults,
    user: {
      name: "Richie",
      email: "richie2broke@proton.me",
      loggedIn: false
    },
    wallet: {
      cash: 28450.22,
      available: 61200.0,
      dayChange: 4.82,
      buyingPower: 12000.0
    },
    crypto: [
      { id: "btc", name: "Bitcoin", symbol: "BTC", amount: 1.8421, price: 97820.24, move: 3.91 },
      { id: "eth", name: "Ethereum", symbol: "ETH", amount: 14.58, price: 5284.42, move: 2.47 },
      { id: "sol", name: "Solana", symbol: "SOL", amount: 322.11, price: 229.71, move: 6.35 },
      { id: "xrp", name: "XRP", symbol: "XRP", amount: 18420.5, price: 2.64, move: 5.12 }
    ],
    stocks: [
      { id: "tsla", name: "Tesla", symbol: "TSLA", shares: 42.381, price: 248.84, move: 2.83 },
      { id: "nvda", name: "NVIDIA", symbol: "NVDA", shares: 84.22, price: 912.18, move: 4.22 },
      { id: "spy", name: "SPDR S&P 500 ETF", symbol: "SPY", shares: 35.1, price: 512.44, move: 1.18 }
    ],
    predictionMarkets: [
      { id: "pm1", title: "College Basketball", subtitle: "Will a No. 1 seed win the championship?", volume: "$2.4M Vol." },
      { id: "pm2", title: "Illinois Elections", subtitle: "Which party will gain ground in the next cycle?", volume: "$840K Vol." },
      { id: "pm3", title: "Fed Rate Path", subtitle: "Will rates be cut by summer?", volume: "$1.7M Vol." }
    ],
    accounts: [
      { id: "a1", name: "Northline Reserve", balance: 82440.18, mask: "4082" },
      { id: "a2", name: "Atlas Premier", balance: 35420.4, mask: "1129" }
    ],
    activity: [
      { id: 1, title: "Portfolio Rebalance", subtitle: "Asset adjustment", amount: -12480.22, date: "Today • 11:24 AM" },
      { id: 2, title: "Reserve Transfer", subtitle: "Linked account", amount: 16000.0, date: "Today • 9:08 AM" },
      { id: 3, title: "Bitcoin Allocation", subtitle: "Position increase", amount: -8200.0, date: "Yesterday • 6:20 PM" },
      { id: 4, title: "Solana Trim", subtitle: "Position decrease", amount: 6840.18, date: "Yesterday • 1:42 PM" }
    ]
  };

  const $ = (id) => document.getElementById(id);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const el = {
    loginScreen: $("loginScreen"),
    mainScreen: $("mainScreen"),
    loginForm: $("loginForm"),
    loginEmail: $("loginEmail"),
    loginPassword: $("loginPassword"),

    headerName: $("headerName"),
    settingsName: $("settingsName"),
    settingsEmail: $("settingsEmail"),

    totalHoldings: $("totalHoldings"),
    buyingPowerAmount: $("buyingPowerAmount"),
    dayChangePill: $("dayChangePill"),
    profitValue: $("profitValue"),
    profitPercent: $("profitPercent"),

    cryptoList: $("cryptoList"),
    stocksList: $("stocksList"),
    marketsList: $("marketsList"),
    discoverList: $("discoverList"),

    accountsList: $("accountsList"),
    activityList: $("activityList"),

    chartLinePath: $("chartLinePath"),
    chartAreaPath: $("chartAreaPath"),
    topInfoBanner: $("topInfoBanner"),

    navBtns: $$(".nav-btn"),
    panels: $$(".tab-panel"),
    rangeBtns: $$(".range-btn"),

    manageModal: $("manageModal"),
    openManageTop: $("openManageTop"),
    openManageSettings: $("openManageSettings"),
    closeManage: $("closeManage"),
    manageForm: $("manageForm"),
    modalBackdrop: document.querySelector(".modal-backdrop"),

    manageName: $("manageName"),
    manageEmail: $("manageEmail"),
    manageCash: $("manageCash"),
    manageAvailable: $("manageAvailable"),
    manageChange: $("manageChange"),
    manageBuyingPower: $("manageBuyingPower"),

    btcAmount: $("btcAmount"),
    btcPrice: $("btcPrice"),
    ethAmount: $("ethAmount"),
    ethPrice: $("ethPrice"),
    solAmount: $("solAmount"),
    solPrice: $("solPrice"),
    xrpAmount: $("xrpAmount"),
    xrpPrice: $("xrpPrice"),

    tslaShares: $("tslaShares"),
    tslaPrice: $("tslaPrice"),
    nvdaShares: $("nvdaShares"),
    nvdaPrice: $("nvdaPrice"),
    spyShares: $("spyShares"),
    spyPrice: $("spyPrice"),

    acc1Name: $("acc1Name"),
    acc1Balance: $("acc1Balance"),
    acc2Name: $("acc2Name"),
    acc2Balance: $("acc2Balance"),

    resetBtn: $("resetBtn"),
    logoutBtn: $("logoutBtn"),

    assetsTotalHoldings: $("assetsTotalHoldings"),
    assetsProfitValue: $("assetsProfitValue"),
    assetsProfitPercent: $("assetsProfitPercent"),
    assetsDayChangePill: $("assetsDayChangePill"),
    assetsChartLinePath: $("assetsChartLinePath"),
    assetsChartAreaPath: $("assetsChartAreaPath"),
    assetRangeBtns: $$(".asset-range-btn"),
    topMoversList: $("topMoversList"),
    exploreCryptoList: $("exploreCryptoList"),
    historyList: $("historyList"),
    exploreFilterBtns: $$("[data-explore-filter]")
  };

  let state = loadState();
  let liveInterval = null;

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(defaultState);

      const parsed = JSON.parse(raw);
      return {
        ...clone(defaultState),
        ...parsed,
        banners: { ...defaultState.banners, ...(parsed.banners || {}) },
        user: { ...defaultState.user, ...(parsed.user || {}) },
        wallet: { ...defaultState.wallet, ...(parsed.wallet || {}) },
        crypto: Array.isArray(parsed.crypto) ? parsed.crypto : clone(defaultState.crypto),
        stocks: Array.isArray(parsed.stocks) ? parsed.stocks : clone(defaultState.stocks),
        predictionMarkets: Array.isArray(parsed.predictionMarkets) ? parsed.predictionMarkets : clone(defaultState.predictionMarkets),
        accounts: Array.isArray(parsed.accounts) ? parsed.accounts : clone(defaultState.accounts),
        activity: Array.isArray(parsed.activity) ? parsed.activity : clone(defaultState.activity),
        discoverCards: Array.isArray(parsed.discoverCards) ? parsed.discoverCards : clone(defaultState.discoverCards),
        topMovers: Array.isArray(parsed.topMovers) ? parsed.topMovers : clone(defaultState.topMovers),
        exploreTradable: Array.isArray(parsed.exploreTradable) ? parsed.exploreTradable : clone(defaultState.exploreTradable),
        exploreNonTradable: Array.isArray(parsed.exploreNonTradable) ? parsed.exploreNonTradable : clone(defaultState.exploreNonTradable),
        historyItems: Array.isArray(parsed.historyItems) ? parsed.historyItems : clone(defaultState.historyItems)
      };
    } catch {
      return clone(defaultState);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function money(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2
    }).format(Number(value) || 0);
  }

  function num(value, max = 6) {
    return Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: max
    });
  }

  function signedPercent(value) {
    const n = Number(value) || 0;
    return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
  }

  function signedMoney(value) {
    const n = Number(value) || 0;
    return `${n >= 0 ? "+" : "-"}${money(Math.abs(n))}`;
  }

  function totalCryptoValue() {
    return state.crypto.reduce((sum, a) => sum + (Number(a.amount) || 0) * (Number(a.price) || 0), 0);
  }

  function totalStockValue() {
    return state.stocks.reduce((sum, s) => sum + (Number(s.shares) || 0) * (Number(s.price) || 0), 0);
  }

  function baseTotalHoldingsValue() {
    return totalCryptoValue() + totalStockValue() + (Number(state.wallet.cash) || 0);
  }

  function currentDisplayedTotal() {
    if (state.selectedRange === "LIVE" && typeof state.liveCurrentTotal === "number") {
      return state.liveCurrentTotal;
    }
    return baseTotalHoldingsValue();
  }

  function showScreen(which) {
    if (el.loginScreen) el.loginScreen.classList.toggle("active", which === "login");
    if (el.mainScreen) el.mainScreen.classList.toggle("active", which === "main");
  }

  function setTab(tab) {
    el.navBtns.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === tab));
    el.panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.tab === tab));
  }

  function renderProfile() {
    if (el.headerName) el.headerName.textContent = state.user.name || "Operator";
    if (el.settingsName) el.settingsName.textContent = state.user.name || "Operator";
    if (el.settingsEmail) el.settingsEmail.textContent = state.user.email || "name@astervault.io";
  }

  function ensureLiveState() {
    const base = baseTotalHoldingsValue();
    if (typeof state.liveBaseTotal !== "number") state.liveBaseTotal = base;
    if (typeof state.liveCurrentTotal !== "number") state.liveCurrentTotal = base;
  }

  function resetLiveBaseFromPortfolio() {
    const base = baseTotalHoldingsValue();
    state.liveBaseTotal = base;
    state.liveCurrentTotal = base;
    state.liveProfitDollar = 0;
    state.liveProfitPercent = 0;
  }

  function nudgeLiveSeries() {
    const live = chartSeries.LIVE;
    const last = live[live.length - 1];
    const delta = Math.round((Math.random() * 4 - 2) * 10) / 10;
    const next = Math.max(8, Math.min(60, last + delta));
    live.shift();
    live.push(next);
  }

  function tickLiveData() {
    if (state.selectedRange !== "LIVE") return;

    ensureLiveState();

    const move = Math.round((Math.random() * 220 - 110) * 100) / 100;
    const nextTotal = Math.max(state.liveBaseTotal * 0.92, state.liveCurrentTotal + move);

    state.liveCurrentTotal = Math.round(nextTotal * 100) / 100;
    state.liveProfitDollar = Math.round((state.liveCurrentTotal - state.liveBaseTotal) * 100) / 100;
    state.liveProfitPercent = Number(((state.liveProfitDollar / state.liveBaseTotal) * 100).toFixed(2));

    nudgeLiveSeries();
    renderHomeTop();
    renderChart();
    renderAssetsTabHeader();
    saveState();
  }

  function startLiveTicker() {
    stopLiveTicker();
    if (state.selectedRange !== "LIVE") return;
    liveInterval = setInterval(tickLiveData, LIVE_TICK_MS);
  }

  function stopLiveTicker() {
    if (liveInterval) {
      clearInterval(liveInterval);
      liveInterval = null;
    }
  }

  function drawMiniChart(lineEl, areaEl, points) {
    if (!lineEl || !areaEl || !points?.length) return;

    const width = 320;
    const height = 120;
    const pad = 8;

    const min = Math.min(...points);
    const max = Math.max(...points);
    const span = max - min || 1;

    const coords = points.map((value, index) => {
      const x = (index / (points.length - 1)) * (width - pad * 2) + pad;
      const y = height - ((value - min) / span) * (height - pad * 2) - pad;
      return [x, y];
    });

    const line = coords
      .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
      .join(" ");

    const area =
      `${line} L ${coords[coords.length - 1][0].toFixed(2)} ${height - pad} ` +
      `L ${coords[0][0].toFixed(2)} ${height - pad} Z`;

    lineEl.setAttribute("d", line);
    areaEl.setAttribute("d", area);
  }

  function getSelectedMeta() {
    if (state.selectedRange === "LIVE") {
      ensureLiveState();
      return {
        dollar: state.liveProfitDollar,
        percent: state.liveProfitPercent,
        label: "Live"
      };
    }
    return rangeMeta[state.selectedRange] || rangeMeta.LIVE;
  }

  function renderChart() {
    const range = state.selectedRange || "LIVE";
    const points = chartSeries[range] || chartSeries.LIVE;
    drawMiniChart(el.chartLinePath, el.chartAreaPath, points);

    el.rangeBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.range === range);
    });

    const meta = getSelectedMeta();
    const positive = meta.dollar >= 0;

    if (el.profitValue) {
      el.profitValue.textContent = signedMoney(meta.dollar);
      el.profitValue.className = positive ? "green" : "red";
    }
    if (el.profitPercent) {
      el.profitPercent.textContent = `(${signedPercent(meta.percent)}) ${meta.label}`;
      el.profitPercent.className = positive ? "green" : "red";
    }
  }

  function renderHomeTop() {
    if (el.totalHoldings) el.totalHoldings.textContent = money(currentDisplayedTotal());
    if (el.buyingPowerAmount) el.buyingPowerAmount.textContent = money(state.wallet.buyingPower);

    const ch = Number(state.wallet.dayChange) || 0;
    if (el.dayChangePill) {
      el.dayChangePill.textContent = signedPercent(ch);
      el.dayChangePill.className = `pill ${ch >= 0 ? "up" : "down"}`;
    }
  }

  function renderHome() {
    renderHomeTop();
    renderChart();
    renderCrypto();
    renderStocks();
    renderMarkets();
    renderDiscover();
    if (el.topInfoBanner) {
      el.topInfoBanner.style.display = state.banners.topInfoBanner ? "flex" : "none";
    }
  }

  function renderCrypto() {
    if (!el.cryptoList) return;
    el.cryptoList.innerHTML = "";

    state.crypto.forEach((asset) => {
      const value = (Number(asset.amount) || 0) * (Number(asset.price) || 0);
      const card = document.createElement("div");
      card.className = "list-card";
      card.innerHTML = `
        <div class="list-row">
          <div class="list-left">
            <div class="list-icon ${asset.id}">${asset.symbol[0]}</div>
            <div class="list-text">
              <h4 class="list-title">${asset.name}</h4>
              <p class="list-sub">${num(asset.amount)} ${asset.symbol}</p>
            </div>
          </div>
          <div class="amount">
            <strong>${money(value)}</strong>
            <small class="${asset.move >= 0 ? "green" : "red"}">${signedPercent(asset.move)}</small>
          </div>
        </div>
      `;
      el.cryptoList.appendChild(card);
    });
  }

  function renderStocks() {
    if (!el.stocksList) return;
    el.stocksList.innerHTML = "";

    state.stocks.forEach((stock) => {
      const value = (Number(stock.shares) || 0) * (Number(stock.price) || 0);
      const card = document.createElement("div");
      card.className = "list-card";
      card.innerHTML = `
        <div class="list-row">
          <div class="list-left">
            <div class="list-icon stock">${stock.symbol[0]}</div>
            <div class="list-text">
              <h4 class="list-title">${stock.symbol}</h4>
              <p class="list-sub">${num(stock.shares, 4)} shares • ${stock.name}</p>
            </div>
          </div>
          <div class="amount">
            <strong>${money(value)}</strong>
            <small class="${stock.move >= 0 ? "green" : "red"}">${signedPercent(stock.move)}</small>
          </div>
        </div>
      `;
      el.stocksList.appendChild(card);
    });
  }

  function renderMarkets() {
    if (!el.marketsList) return;
    el.marketsList.innerHTML = "";

    state.predictionMarkets.forEach((market) => {
      const outer = document.createElement("button");
      outer.className = "market-card-button";
      outer.type = "button";
      outer.innerHTML = `
        <div class="list-card">
          <div class="list-row">
            <div class="list-left">
              <div class="list-icon market">◔</div>
              <div class="list-text">
                <h4 class="list-title">${market.title}</h4>
                <p class="list-sub">${market.subtitle}</p>
              </div>
            </div>
            <div class="market-amount">
              <strong>${market.volume}</strong>
              <small>Open market</small>
            </div>
          </div>
        </div>
      `;
      el.marketsList.appendChild(outer);
    });
  }

  function renderDiscover() {
    if (!el.discoverList) return;
    el.discoverList.innerHTML = "";

    state.discoverCards.forEach((cardInfo) => {
      const card = document.createElement("div");
      card.className = "list-card discover-card";
      card.innerHTML = `
        <button class="discover-close" data-discover-close="${cardInfo.id}">✕</button>
        <div class="list-row">
          <div class="list-left">
            <div class="list-icon discover">✦</div>
            <div class="list-text">
              <h4 class="list-title">${cardInfo.title}</h4>
              <p class="list-sub">${cardInfo.text}</p>
            </div>
          </div>
        </div>
      `;
      el.discoverList.appendChild(card);
    });
  }

  function renderAccounts() {
    if (!el.accountsList) return;
    el.accountsList.innerHTML = "";

    state.accounts.forEach((acc) => {
      const card = document.createElement("div");
      card.className = "list-card";
      card.innerHTML = `
        <div class="list-row">
          <div class="list-left">
            <div class="list-icon bank">🏦</div>
            <div class="list-text">
              <h4 class="list-title">${acc.name}</h4>
              <p class="list-sub">Linked •••• ${acc.mask || "0000"}</p>
            </div>
          </div>
          <div class="amount">
            <strong>${money(acc.balance)}</strong>
            <small>Available</small>
          </div>
        </div>
      `;
      el.accountsList.appendChild(card);
    });
  }

  function renderActivity() {
    if (!el.activityList) return;
    el.activityList.innerHTML = "";

    state.activity.forEach((item) => {
      const card = document.createElement("div");
      card.className = "list-card";
      card.innerHTML = `
        <div class="list-row">
          <div class="list-left">
            <div class="list-icon activity">${item.amount >= 0 ? "↑" : "↓"}</div>
            <div class="list-text">
              <h4 class="list-title">${item.title}</h4>
              <p class="list-sub">${item.subtitle}</p>
              <p class="list-sub">${item.date}</p>
            </div>
          </div>
          <div class="amount">
            <strong class="${item.amount >= 0 ? "green" : "red"}">${signedMoney(item.amount)}</strong>
            <small>${item.amount >= 0 ? "Completed" : "Processed"}</small>
          </div>
        </div>
      `;
      el.activityList.appendChild(card);
    });
  }

  function renderAssetsTabHeader() {
    if (!el.assetsTotalHoldings) return;

    el.assetsTotalHoldings.textContent = money(currentDisplayedTotal());

    const meta = getSelectedMeta();
    const positive = meta.dollar >= 0;

    if (el.assetsProfitValue) {
      el.assetsProfitValue.textContent = signedMoney(meta.dollar);
      el.assetsProfitValue.className = positive ? "green" : "red";
    }
    if (el.assetsProfitPercent) {
      el.assetsProfitPercent.textContent = `(${signedPercent(meta.percent)}) ${meta.label}`;
      el.assetsProfitPercent.className = positive ? "green" : "red";
    }

    const ch = Number(state.wallet.dayChange) || 0;
    if (el.assetsDayChangePill) {
      el.assetsDayChangePill.textContent = signedPercent(ch);
      el.assetsDayChangePill.className = `pill ${ch >= 0 ? "up" : "down"}`;
    }

    const points = chartSeries[state.selectedRange] || chartSeries.LIVE;
    drawMiniChart(el.assetsChartLinePath, el.assetsChartAreaPath, points);

    el.assetRangeBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.range === state.selectedRange);
    });
  }

  function renderTopMovers() {
    if (!el.topMoversList) return;
    el.topMoversList.innerHTML = "";

    state.topMovers.forEach((item) => {
      const card = document.createElement("div");
      card.className = "list-card";
      card.innerHTML = `
        <div class="list-row">
          <div class="list-left">
            <div class="list-icon stock">${item.symbol[0]}</div>
            <div class="list-text">
              <h4 class="list-title">${item.symbol}</h4>
              <p class="list-sub">${item.name}</p>
            </div>
          </div>
          <div class="amount">
            <strong>${money(item.price)}</strong>
            <small class="${item.move >= 0 ? "green" : "red"}">${signedPercent(item.move)}</small>
          </div>
        </div>
      `;
      el.topMoversList.appendChild(card);
    });
  }

  function renderExploreCrypto() {
    if (!el.exploreCryptoList) return;
    el.exploreCryptoList.innerHTML = "";

    const source = state.exploreFilter === "nontradable" ? state.exploreNonTradable : state.exploreTradable;

    source.forEach((item) => {
      const card = document.createElement("div");
      card.className = "list-card";
      card.innerHTML = `
        <div class="list-row">
          <div class="list-left">
            <div class="list-icon ${state.exploreFilter === "nontradable" ? "market" : "stock"}">${item.symbol[0]}</div>
            <div class="list-text">
              <h4 class="list-title">${item.symbol}</h4>
              <p class="list-sub">${item.name}</p>
            </div>
          </div>
          <div class="amount">
            <strong>${money(item.price)}</strong>
            <small class="${item.move >= 0 ? "green" : "red"}">${signedPercent(item.move)}</small>
          </div>
        </div>
      `;
      el.exploreCryptoList.appendChild(card);
    });

    el.exploreFilterBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.exploreFilter === state.exploreFilter);
    });
  }

  function renderHistory() {
    if (!el.historyList) return;
    el.historyList.innerHTML = "";

    state.historyItems.forEach((item) => {
      const badgeClass =
        item.type === "buy"
          ? "history-badge-buy"
          : item.type === "sell"
          ? "history-badge-sell"
          : "history-badge-transfer";

      const badgeText =
        item.type === "buy"
          ? "B"
          : item.type === "sell"
          ? "S"
          : "T";

      const card = document.createElement("div");
      card.className = "list-card";
      card.innerHTML = `
        <div class="list-row">
          <div class="list-left">
            <div class="list-icon ${badgeClass}">${badgeText}</div>
            <div class="list-text">
              <h4 class="list-title">${item.title}</h4>
              <p class="list-sub">${item.subtitle}</p>
              <p class="list-sub">${item.date}</p>
            </div>
          </div>
          <div class="amount">
            <strong class="${item.amount >= 0 ? "green" : "red"}">${signedMoney(item.amount)}</strong>
            <small>${item.amount >= 0 ? "Completed" : "Filled"}</small>
          </div>
        </div>
      `;
      el.historyList.appendChild(card);
    });
  }

  function renderEnhancedPortfolioPage() {
    renderAssetsTabHeader();
    renderTopMovers();
    renderExploreCrypto();
    renderHistory();
  }

  function renderAll() {
    renderProfile();
    renderHome();
    renderEnhancedPortfolioPage();
    renderAccounts();
    renderActivity();
  }

  function getCrypto(id) {
    return state.crypto.find((a) => a.id === id);
  }

  function getStock(id) {
    return state.stocks.find((s) => s.id === id);
  }

  function fillManageForm() {
    const btc = getCrypto("btc");
    const eth = getCrypto("eth");
    const sol = getCrypto("sol");
    const xrp = getCrypto("xrp");

    const tsla = getStock("tsla");
    const nvda = getStock("nvda");
    const spy = getStock("spy");

    if (el.manageName) el.manageName.value = state.user.name || "";
    if (el.manageEmail) el.manageEmail.value = state.user.email || "";
    if (el.manageCash) el.manageCash.value = state.wallet.cash ?? 0;
    if (el.manageAvailable) el.manageAvailable.value = state.wallet.available ?? 0;
    if (el.manageChange) el.manageChange.value = state.wallet.dayChange ?? 0;
    if (el.manageBuyingPower) el.manageBuyingPower.value = state.wallet.buyingPower ?? 0;

    if (el.btcAmount) el.btcAmount.value = btc?.amount ?? 0;
    if (el.btcPrice) el.btcPrice.value = btc?.price ?? 0;
    if (el.ethAmount) el.ethAmount.value = eth?.amount ?? 0;
    if (el.ethPrice) el.ethPrice.value = eth?.price ?? 0;
    if (el.solAmount) el.solAmount.value = sol?.amount ?? 0;
    if (el.solPrice) el.solPrice.value = sol?.price ?? 0;
    if (el.xrpAmount) el.xrpAmount.value = xrp?.amount ?? 0;
    if (el.xrpPrice) el.xrpPrice.value = xrp?.price ?? 0;

    if (el.tslaShares) el.tslaShares.value = tsla?.shares ?? 0;
    if (el.tslaPrice) el.tslaPrice.value = tsla?.price ?? 0;
    if (el.nvdaShares) el.nvdaShares.value = nvda?.shares ?? 0;
    if (el.nvdaPrice) el.nvdaPrice.value = nvda?.price ?? 0;
    if (el.spyShares) el.spyShares.value = spy?.shares ?? 0;
    if (el.spyPrice) el.spyPrice.value = spy?.price ?? 0;

    if (el.acc1Name) el.acc1Name.value = state.accounts[0]?.name ?? "";
    if (el.acc1Balance) el.acc1Balance.value = state.accounts[0]?.balance ?? 0;
    if (el.acc2Name) el.acc2Name.value = state.accounts[1]?.name ?? "";
    if (el.acc2Balance) el.acc2Balance.value = state.accounts[1]?.balance ?? 0;
  }

  function openManage() {
    fillManageForm();
    if (el.manageModal) el.manageModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeManage() {
    if (el.manageModal) el.manageModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function applyManage() {
    state.user.name = el.manageName?.value.trim() || "Operator";
    state.user.email = el.manageEmail?.value.trim() || "name@astervault.io";
    state.wallet.cash = Number(el.manageCash?.value) || 0;
    state.wallet.available = Number(el.manageAvailable?.value) || 0;
    state.wallet.dayChange = Number(el.manageChange?.value) || 0;
    state.wallet.buyingPower = Number(el.manageBuyingPower?.value) || 0;

    const btc = getCrypto("btc");
    const eth = getCrypto("eth");
    const sol = getCrypto("sol");
    const xrp = getCrypto("xrp");

    if (btc) {
      btc.amount = Number(el.btcAmount?.value) || 0;
      btc.price = Number(el.btcPrice?.value) || 0;
    }
    if (eth) {
      eth.amount = Number(el.ethAmount?.value) || 0;
      eth.price = Number(el.ethPrice?.value) || 0;
    }
    if (sol) {
      sol.amount = Number(el.solAmount?.value) || 0;
      sol.price = Number(el.solPrice?.value) || 0;
    }
    if (xrp) {
      xrp.amount = Number(el.xrpAmount?.value) || 0;
      xrp.price = Number(el.xrpPrice?.value) || 0;
    }

    const tsla = getStock("tsla");
    const nvda = getStock("nvda");
    const spy = getStock("spy");

    if (tsla) {
      tsla.shares = Number(el.tslaShares?.value) || 0;
      tsla.price = Number(el.tslaPrice?.value) || 0;
    }
    if (nvda) {
      nvda.shares = Number(el.nvdaShares?.value) || 0;
      nvda.price = Number(el.nvdaPrice?.value) || 0;
    }
    if (spy) {
      spy.shares = Number(el.spyShares?.value) || 0;
      spy.price = Number(el.spyPrice?.value) || 0;
    }

    if (!state.accounts[0]) state.accounts[0] = { id: "a1", name: "Northline Reserve", balance: 0, mask: "4082" };
    if (!state.accounts[1]) state.accounts[1] = { id: "a2", name: "Atlas Premier", balance: 0, mask: "1129" };

    state.accounts[0].name = el.acc1Name?.value.trim() || "Northline Reserve";
    state.accounts[0].balance = Number(el.acc1Balance?.value) || 0;
    state.accounts[1].name = el.acc2Name?.value.trim() || "Atlas Premier";
    state.accounts[1].balance = Number(el.acc2Balance?.value) || 0;

    resetLiveBaseFromPortfolio();
    saveState();
    renderAll();
  }

  function resetData() {
    const preservedUser = {
      name: state.user.name,
      email: state.user.email,
      loggedIn: state.user.loggedIn
    };

    state = clone(defaultState);
    state.user = preservedUser;

    resetLiveBaseFromPortfolio();
    saveState();
    renderAll();
    closeManage();
    startLiveTicker();
  }

  function handleLogin(e) {
    e.preventDefault();

    const email = el.loginEmail?.value.trim() || "";
    const password = el.loginPassword?.value.trim() || "";
    if (!email || !password) return;

    const guessed = email.split("@")[0].replace(/[._-]/g, " ");
    const formatted = guessed
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    state.user.email = email;
    if (!state.user.name || state.user.name === "Operator") {
      state.user.name = formatted || "Operator";
    }
    state.user.loggedIn = true;

    resetLiveBaseFromPortfolio();
    saveState();
    renderAll();
    showScreen("main");
    setTab("home");
    startLiveTicker();

    if (el.loginPassword) el.loginPassword.value = "";
  }

  function logout() {
    state.user.loggedIn = false;
    saveState();
    stopLiveTicker();
    showScreen("login");
  }

  function bindEvents() {
    if (el.loginForm) {
      el.loginForm.addEventListener("submit", handleLogin);
    }

    el.navBtns.forEach((btn) => {
      btn.addEventListener("click", () => setTab(btn.dataset.tab));
    });

    el.rangeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedRange = btn.dataset.range;
        if (state.selectedRange === "LIVE") {
          ensureLiveState();
          startLiveTicker();
        } else {
          stopLiveTicker();
        }
        saveState();
        renderHomeTop();
        renderChart();
        renderAssetsTabHeader();
      });
    });

    el.assetRangeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedRange = btn.dataset.range;
        if (state.selectedRange === "LIVE") {
          ensureLiveState();
          startLiveTicker();
        } else {
          stopLiveTicker();
        }
        saveState();
        renderHomeTop();
        renderChart();
        renderAssetsTabHeader();
      });
    });

    el.exploreFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.exploreFilter = btn.dataset.exploreFilter;
        saveState();
        renderExploreCrypto();
      });
    });

    if (el.openManageTop) el.openManageTop.addEventListener("click", openManage);
    if (el.openManageSettings) el.openManageSettings.addEventListener("click", openManage);
    if (el.closeManage) el.closeManage.addEventListener("click", closeManage);
    if (el.modalBackdrop) el.modalBackdrop.addEventListener("click", closeManage);

    if (el.manageForm) {
      el.manageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        applyManage();
        closeManage();
        startLiveTicker();
      });
    }

    if (el.resetBtn) el.resetBtn.addEventListener("click", resetData);
    if (el.logoutBtn) el.logoutBtn.addEventListener("click", logout);

    document.addEventListener("click", (e) => {
      const closeId = e.target.getAttribute("data-close");
      if (closeId && Object.prototype.hasOwnProperty.call(state.banners, closeId)) {
        state.banners[closeId] = false;
        saveState();
        renderHome();
      }

      const discoverId = e.target.getAttribute("data-discover-close");
      if (discoverId) {
        state.discoverCards = state.discoverCards.filter((card) => card.id !== discoverId);
        saveState();
        renderDiscover();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.manageModal && !el.manageModal.classList.contains("hidden")) {
        closeManage();
      }
    });
  }

  function init() {
    bindEvents();
    resetLiveBaseFromPortfolio();
    renderAll();

    if (state.user.loggedIn) {
      showScreen("main");
      setTab("home");
      startLiveTicker();
    } else {
      showScreen("login");
      stopLiveTicker();
    }
  }

  init();

  /* ===== PATCH: timed notification pop-up ===== */
const timedBannerPool = [
  {
    title: "Did you know?",
    text: "Market screeners can help uncover strong momentum names before the crowd catches on.",
    cta: "Explore momentum picks"
  },
  {
    title: "Portfolio Insight",
    text: "Your watchlist can be used to track fast movers across crypto, equities, and ETFs.",
    cta: "View watchlist ideas"
  },
  {
    title: "Trending Now",
    text: "Some investors are rotating into high-beta names and digital assets with stronger recent volume.",
    cta: "Explore trending markets"
  },
  {
    title: "Analyst Update",
    text: "Consensus ratings can help you compare names receiving stronger institutional attention.",
    cta: "See analyst highlights"
  }
];

let timedBannerTimeout = null;

function getVisibleBannerElement() {
  if (!el.topInfoBanner) return null;
  const isHidden =
    el.topInfoBanner.style.display === "none" ||
    window.getComputedStyle(el.topInfoBanner).display === "none";
  return isHidden ? null : el.topInfoBanner;
}

function scheduleTimedBanner(delay = 60000) {
  if (!el.topInfoBanner) return;

  if (timedBannerTimeout) {
    clearTimeout(timedBannerTimeout);
    timedBannerTimeout = null;
  }

  timedBannerTimeout = setTimeout(() => {
    const visibleBanner = getVisibleBannerElement();

    if (visibleBanner) {
      scheduleTimedBanner(15000);
      return;
    }

    const nextBanner =
      timedBannerPool[Math.floor(Math.random() * timedBannerPool.length)];

    const titleEl = el.topInfoBanner.querySelector(".info-title");
    const textEl = el.topInfoBanner.querySelector(".info-text");
    const ctaEl = el.topInfoBanner.querySelector(".text-link");

    if (titleEl) titleEl.textContent = nextBanner.title;
    if (textEl) textEl.textContent = nextBanner.text;
    if (ctaEl) ctaEl.textContent = nextBanner.cta;

    state.banners.topInfoBanner = true;
    saveState();
    renderHome();

    scheduleTimedBanner(45000);
  }, delay);
}

document.addEventListener("click", (e) => {
  const closeId = e.target.getAttribute("data-close");
  if (closeId === "topInfoBanner") {
    scheduleTimedBanner(60000);
  }
});

scheduleTimedBanner(60000);
})();
