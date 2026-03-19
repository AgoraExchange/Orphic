(() => {
  "use strict";

  const STORAGE_KEY = "aster_vault_prop_app_v8";
  const LIVE_TICK_MS = 3000;
  const ACTIVITY_MARKET_TICK_MS = 2000;

  const $ = (id) => document.getElementById(id);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const chartSeries = {
    LIVE: [14, 18, 17, 21, 24, 22, 28, 26, 31, 29, 35, 39],
    "1D": [12, 14, 13, 16, 18, 17, 20, 23, 22, 24, 27, 30],
    "1W": [8, 9, 10, 11, 14, 13, 16, 18, 20, 19, 22, 24],
    "1M": [10, 12, 15, 14, 16, 19, 18, 22, 24, 26, 28, 32],
    "3M": [5, 8, 10, 12, 15, 17, 16, 20, 23, 25, 29, 34],
    YTD: [3, 5, 7, 11, 13, 16, 18, 21, 25, 27, 31, 37]
  };

  const rangeMeta = {
    LIVE: { dollar: 12842.37, percent: 0.76, label: "Live" },
    "1D": { dollar: 18492.22, percent: 1.10, label: "Today" },
    "1W": { dollar: 44218.38, percent: 2.61, label: "Past Week" },
    "1M": { dollar: 98240.18, percent: 6.14, label: "Past Month" },
    "3M": { dollar: 182110.22, percent: 11.72, label: "Past 3 Months" },
    YTD: { dollar: 284440.74, percent: 18.44, label: "Year to Date" }
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
    { type: "transfer", title: "Instant Deposit", subtitle: "Buying power increase", amount: 5000.0, date: "Yesterday • 9:02 AM" },
    { type: "buy", title: "Bought NVIDIA", subtitle: "Market buy • 2.0 shares", amount: -1824.36, date: "Mar 12 • 1:18 PM" },
    { type: "sell", title: "Sold XRP", subtitle: "Market sell • 2000 XRP", amount: 5280.0, date: "Mar 11 • 4:33 PM" }
  ];

  const activityCryptoDefaults = [
    { id: "btc", name: "Bitcoin", symbol: "BTC", price: 97820.24, move: 3.91, points: [18, 19, 21, 20, 23, 25, 24, 27, 29, 31] },
    { id: "xrp", name: "XRP", symbol: "XRP", price: 2.64, move: 5.12, points: [11, 12, 11, 13, 15, 14, 16, 18, 17, 19] },
    { id: "eth", name: "Ethereum", symbol: "ETH", price: 5284.42, move: 2.47, points: [14, 15, 16, 15, 17, 18, 19, 20, 19, 22] },
    { id: "doge", name: "Dogecoin", symbol: "DOGE", price: 0.19, move: 4.82, points: [10, 9, 11, 12, 13, 12, 14, 15, 14, 16] },
    { id: "sol", name: "Solana", symbol: "SOL", price: 229.71, move: 6.35, points: [13, 14, 16, 15, 17, 19, 18, 21, 23, 24] }
  ];

  const activityTopMoversDefaults = [
    { symbol: "VG", name: "Venture Global", price: 18.42, move: 12.51 },
    { symbol: "NEXT", name: "NextDecade", price: 7.91, move: 8.24 },
    { symbol: "SAIL", name: "SailPoint", price: 19.84, move: -3.18 },
    { symbol: "GEMI", name: "Gemini Labs", price: 4.28, move: 15.04 },
    { symbol: "ORLA", name: "Orla Mining", price: 5.61, move: 6.82 },
    { symbol: "WSHP", name: "Wishpond", price: 1.42, move: -2.44 }
  ];

  const activityNewsDefaults = [
    { source: "The Motley Fool", age: "15m", title: "Here’s my top AI stock pick during this market pullback." },
    { source: "MarketWatch", age: "28m", title: "Crypto traders watch Bitcoin levels as momentum stocks rebound." },
    { source: "Barron's", age: "41m", title: "Why growth investors are rotating back into select tech names." },
    { source: "InvestorPlace", age: "1h", title: "3 digital assets traders are watching into the afternoon session." }
  ];

  const extraActivityDefaults = [
    { id: 1001, type: "notification", title: "Price Alert", subtitle: "Bitcoin crossed above your watch level.", amount: 0, date: "Today • 3:22 PM" },
    { id: 1002, type: "buy", title: "Bought Ethereum", subtitle: "Recurring buy • 1.2 ETH", amount: -6341.30, date: "Today • 2:58 PM" },
    { id: 1003, type: "notification", title: "Analyst Note", subtitle: "3 stocks in your watchlist saw rating updates.", amount: 0, date: "Today • 2:11 PM" },
    { id: 1004, type: "sell", title: "Sold DOGE", subtitle: "Market sell • 4,500 DOGE", amount: 853.44, date: "Today • 1:43 PM" },
    { id: 1005, type: "transfer", title: "Buying Power Increased", subtitle: "Funds are now available to trade.", amount: 2500.0, date: "Today • 1:05 PM" },
    { id: 1006, type: "notification", title: "Market News", subtitle: "Tech and crypto names are leading mid-day volume.", amount: 0, date: "Today • 12:46 PM" },
    { id: 1007, type: "buy", title: "Bought XRP", subtitle: "Market buy • 1,800 XRP", amount: -4752.0, date: "Today • 11:31 AM" },
    { id: 1008, type: "notification", title: "Watchlist Update", subtitle: "TSLA and NVDA are among your strongest movers today.", amount: 0, date: "Today • 10:14 AM" },
    { id: 1009, type: "sell", title: "Sold TSLA", subtitle: "Limit sell • 2.0 shares", amount: 497.68, date: "Yesterday • 4:40 PM" },
    { id: 1010, type: "notification", title: "Did you know?", subtitle: "Screeners can help uncover names with unusual momentum.", amount: 0, date: "Yesterday • 2:52 PM" }
  ];

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

  const defaultState = {
    selectedRange: "LIVE",
    exploreFilter: "tradable",
    liveBaseTotal: null,
    liveCurrentTotal: null,
    liveProfitDollar: 12842.37,
    liveProfitPercent: 0.76,
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
    activityMarketCoins: activityCryptoDefaults,
    activityTopMoversData: activityTopMoversDefaults,
    activityNewsItems: activityNewsDefaults,
    accountUi: {
      expandedId: null
    },
    settingsUi: {
      favorites: true,
      liveMotion: true,
      notifications: true,
      charts: true
    },
    portfolioUi: {
      activeId: "p1",
      items: [
        { id: "p1", name: "Richie" },
        { id: "p2", name: "Long Term" },
        { id: "p3", name: "Trading Wallet" }
      ]
    },
    user: {
      name: "Richie",
      email: "richie2broke@proton.me",
      loggedIn: false
    },
    wallet: {
      cash: 186420.55,
      available: 248000.0,
      dayChange: 2.84,
      buyingPower: 120000.0
    },
    crypto: [
      { id: "btc", name: "Bitcoin", symbol: "BTC", amount: 8.8421, price: 71050.31, move: 3.91 },
      { id: "eth", name: "Ethereum", symbol: "ETH", amount: 74.58, price: 2193.10, move: 2.47 },
      { id: "sol", name: "Solana", symbol: "SOL", amount: 1622.11, price: 90.05, move: 6.35 },
      { id: "xrp", name: "XRP", symbol: "XRP", amount: 84205.5, price: 1.40, move: 5.12 }
    ],
    stocks: [
      { id: "tsla", name: "Tesla", symbol: "TSLA", shares: 420.381, price: 392.78, move: 2.83 },
      { id: "nvda", name: "NVIDIA", symbol: "NVDA", shares: 384.22, price: 180.40, move: 4.22 },
      { id: "spy", name: "SPDR S&P 500 ETF", symbol: "SPY", shares: 210.1, price: 661.43, move: 1.18 }
    ],
    predictionMarkets: [
      { id: "pm1", title: "College Basketball", subtitle: "Will a No. 1 seed win the championship?", volume: "$2.4M Vol." },
      { id: "pm2", title: "Illinois Elections", subtitle: "Which party will gain ground in the next cycle?", volume: "$840K Vol." },
      { id: "pm3", title: "Fed Rate Path", subtitle: "Will rates be cut by summer?", volume: "$1.7M Vol." }
    ],
    accounts: [
      {
        id: "a1",
        name: "Northline Reserve",
        balance: 82440.18,
        mask: "4082",
        routing: "2110000••",
        accountNumber: "1049••••82",
        transactions: [
          { title: "Payroll Deposit", date: "Today • 8:12 AM", amount: 4200.0 },
          { title: "ACH Transfer", date: "Yesterday • 4:15 PM", amount: -1250.0 },
          { title: "Card Purchase", date: "Yesterday • 11:48 AM", amount: -84.22 }
        ]
      },
      {
        id: "a2",
        name: "Atlas Premier",
        balance: 35420.4,
        mask: "1129",
        routing: "0311001••",
        accountNumber: "8831••••29",
        transactions: [
          { title: "Wire Transfer", date: "Today • 1:02 PM", amount: 2400.0 },
          { title: "ATM Withdrawal", date: "Yesterday • 7:42 PM", amount: -300.0 },
          { title: "Subscription Charge", date: "Yesterday • 9:11 AM", amount: -14.99 }
        ]
      },
      {
        id: "a3",
        name: "Chase Platinum Checking",
        balance: 19872.66,
        mask: "5901",
        routing: "3222716••",
        accountNumber: "5520••••01",
        transactions: [
          { title: "Zelle Received", date: "Today • 3:28 PM", amount: 680.0 },
          { title: "Online Transfer", date: "Today • 10:03 AM", amount: -500.0 },
          { title: "Debit Card Purchase", date: "Yesterday • 6:44 PM", amount: -63.18 }
        ]
      }
    ],
    activity: [...extraActivityDefaults]
  };

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

    manageModal: $("manageModal"),
    openManageTop: $("openManageTop"),
    openManageSettings: $("openManageSettings"),
    closeManage: $("closeManage"),
    manageForm: $("manageForm"),
    modalBackdrop: document.querySelector("#manageModal .modal-backdrop"),

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
    topMoversList: $("topMoversList"),
    exploreCryptoList: $("exploreCryptoList"),
    historyList: $("historyList"),

    activityCryptoMarket: $("activityCryptoMarket"),
    activityTopMovers: $("activityTopMovers"),
    activityNewsList: $("activityNewsList"),

    portfolioSwitcherBtn: $("portfolioSwitcherBtn"),
    portfolioDropdown: $("portfolioDropdown"),
    portfolioDropdownList: $("portfolioDropdownList"),
    addPortfolioBtn: $("addPortfolioBtn"),

    newPortfolioModal: $("newPortfolioModal"),
    closeNewPortfolio: $("closeNewPortfolio"),
    newPortfolioForm: $("newPortfolioForm"),
    newPortfolioName: $("newPortfolioName"),

    portfolioAvatarWrap: document.querySelector(".portfolio-avatar-wrap"),
    portfolioAvatar: document.querySelector(".portfolio-avatar"),
    logoPreviewModal: $("logoPreviewModal"),
    logoPreviewBackdrop: document.querySelector("[data-close-logo-preview='true']"),
    logoPreviewContent: document.querySelector(".logo-preview-content"),
    logoPreviewImage: document.querySelector(".logo-preview-image")
  };

  let state = loadState();
  let liveInterval = null;
  let activityMarketInterval = null;
  let timedBannerTimeout = null;
  let accountEventsBound = false;
  let settingsEventsBound = false;
  let portfolioEventsBound = false;
  let logoPreviewEventsBound = false;

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function migrateState(parsed) {
    const merged = {
      ...clone(defaultState),
      ...parsed,
      banners: { ...defaultState.banners, ...(parsed.banners || {}) },
      accountUi: { ...defaultState.accountUi, ...(parsed.accountUi || {}) },
      settingsUi: { ...defaultState.settingsUi, ...(parsed.settingsUi || {}) },
      portfolioUi: {
        ...defaultState.portfolioUi,
        ...(parsed.portfolioUi || {}),
        items: Array.isArray(parsed.portfolioUi?.items) ? parsed.portfolioUi.items : clone(defaultState.portfolioUi.items)
      },
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
      historyItems: Array.isArray(parsed.historyItems) ? parsed.historyItems : clone(defaultState.historyItems),
      activityMarketCoins: Array.isArray(parsed.activityMarketCoins) ? parsed.activityMarketCoins : clone(defaultState.activityMarketCoins),
      activityTopMoversData: Array.isArray(parsed.activityTopMoversData) ? parsed.activityTopMoversData : clone(defaultState.activityTopMoversData),
      activityNewsItems: Array.isArray(parsed.activityNewsItems) ? parsed.activityNewsItems : clone(defaultState.activityNewsItems)
    };

    if (!Array.isArray(merged.accounts) || merged.accounts.length < 3) {
      merged.accounts = clone(defaultState.accounts);
    }

    if (!Array.isArray(merged.activity) || merged.activity.length < 10) {
      const existing = Array.isArray(merged.activity) ? merged.activity : [];
      merged.activity = [...clone(extraActivityDefaults), ...existing].slice(0, 20);
    }

    if (!merged.exploreFilter) merged.exploreFilter = "tradable";

    if (!Array.isArray(merged.portfolioUi.items) || !merged.portfolioUi.items.length) {
      merged.portfolioUi.items = clone(defaultState.portfolioUi.items);
    }

    if (!merged.portfolioUi.activeId) {
      merged.portfolioUi.activeId = merged.portfolioUi.items[0]?.id || "p1";
    }

    return merged;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(defaultState);
      return migrateState(JSON.parse(raw));
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

  function amountClass(value) {
    return Number(value) >= 0 ? "green" : "red";
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

  function activePortfolio() {
    return state.portfolioUi.items.find((item) => item.id === state.portfolioUi.activeId) || state.portfolioUi.items[0];
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
    const activeName = activePortfolio()?.name || state.user.name || "Richie";
    if (el.headerName) el.headerName.textContent = activeName;
    if (el.settingsName) el.settingsName.textContent = state.user.name || "Richie";
    if (el.settingsEmail) el.settingsEmail.textContent = state.user.email || "richie2broke@proton.me";
  }

  function ensureLiveState() {
    const base = baseTotalHoldingsValue();
    if (typeof state.liveBaseTotal !== "number" || !Number.isFinite(state.liveBaseTotal)) {
      state.liveBaseTotal = base - 12842.37;
    }
    if (typeof state.liveCurrentTotal !== "number" || !Number.isFinite(state.liveCurrentTotal)) {
      state.liveCurrentTotal = base;
    }
  }

  function resetLiveBaseFromPortfolio() {
    const base = baseTotalHoldingsValue();
    state.liveBaseTotal = base - 12842.37;
    state.liveCurrentTotal = base;
    state.liveProfitDollar = 12842.37;
    state.liveProfitPercent = Number(((state.liveProfitDollar / state.liveBaseTotal) * 100).toFixed(2));
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
    if (state.settingsUi && state.settingsUi.liveMotion === false) return;

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
    renderSettingsPage();
    saveState();
  }

  function startLiveTicker() {
    stopLiveTicker();
    if (state.selectedRange !== "LIVE") return;
    if (state.settingsUi && state.settingsUi.liveMotion === false) return;
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

    $$(".range-btn").forEach((btn) => {
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
        <button class="discover-close" data-discover-close="${cardInfo.id}" type="button">✕</button>
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

    $$(".asset-range-btn").forEach((btn) => {
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

    $$("[data-explore-filter]").forEach((btn) => {
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

      const badgeText = item.type === "buy" ? "B" : item.type === "sell" ? "S" : "T";

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

  function ensureAccountsHeaderButton() {
    if (!el.accountsList || document.getElementById("accountsHeadRow")) return;

    const head = document.createElement("div");
    head.className = "accounts-head-row";
    head.id = "accountsHeadRow";
    head.innerHTML = `
      <h3>Linked Accounts</h3>
      <button type="button" class="add-account-btn" id="addAccountBtn">Add Account</button>
    `;

    el.accountsList.parentNode.insertBefore(head, el.accountsList);
  }

  function renderAccounts() {
    if (!el.accountsList) return;

    ensureAccountsHeaderButton();
    el.accountsList.innerHTML = "";

    state.accounts.forEach((acc) => {
      const expanded = state.accountUi?.expandedId === acc.id;
      const txns = Array.isArray(acc.transactions) ? acc.transactions.slice(0, 3) : [];

      const card = document.createElement("div");
      card.className = `list-card account-card ${expanded ? "expanded" : ""}`;
      card.setAttribute("data-account-id", acc.id);

      card.innerHTML = `
        <div class="account-card-top">
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
          <div class="account-chevron">⌄</div>
        </div>

        <div class="account-detail-wrap">
          <div class="account-detail-grid">
            <div class="account-detail-pill">
              <span>Routing</span>
              <strong>${acc.routing || "0000000••"}</strong>
            </div>
            <div class="account-detail-pill">
              <span>Account</span>
              <strong>${acc.accountNumber || "0000••••00"}</strong>
            </div>
          </div>

          <p class="account-subhead">Recent Transactions</p>

          <div class="account-txn-list">
            ${
              txns.length
                ? txns.map((txn) => `
                  <div class="account-txn-item">
                    <div class="account-txn-left">
                      <strong>${txn.title}</strong>
                      <small>${txn.date}</small>
                    </div>
                    <div class="account-txn-amount ${amountClass(txn.amount)}">
                      ${signedMoney(txn.amount)}
                    </div>
                  </div>
                `).join("")
                : `<div class="account-txn-item"><div class="account-txn-left"><strong>No recent transactions</strong></div></div>`
            }
          </div>
        </div>
      `;

      el.accountsList.appendChild(card);
    });
  }

  function activityBadgeClass(type) {
    if (type === "notification") return "activity-log-badge-notification";
    if (type === "buy") return "activity-log-badge-buy";
    if (type === "sell") return "activity-log-badge-sell";
    return "activity-log-badge-transfer";
  }

  function activityBadgeText(type, amount) {
    if (type === "notification") return "✦";
    if (type === "buy") return "B";
    if (type === "sell") return "S";
    return amount >= 0 ? "↑" : "↓";
  }

  function renderActivity() {
    if (!el.activityList) return;
    el.activityList.innerHTML = "";

    state.activity.forEach((item) => {
      const badgeClass = activityBadgeClass(item.type);
      const badgeText = activityBadgeText(item.type, item.amount || 0);
      const isNotification = item.type === "notification";

      const wrap = document.createElement("div");
      wrap.className = "activity-swipe-wrap";
      wrap.setAttribute("data-activity-id", item.id);

      wrap.innerHTML = `
        <div class="activity-delete-bg">Delete</div>
        <div class="list-card activity-card-swipe ${isNotification ? "notification-card" : ""}">
          <div class="list-row">
            <div class="list-left">
              <div class="list-icon ${badgeClass}">${badgeText}</div>
              <div class="list-text">
                <h4 class="list-title">${item.title}</h4>
                <p class="list-sub">${item.subtitle}</p>
                <p class="list-sub">${item.date}</p>
              </div>
            </div>
            ${
              isNotification
                ? ""
                : `
                  <div class="amount">
                    <strong class="${(item.amount || 0) >= 0 ? "green" : "red"}">${signedMoney(item.amount || 0)}</strong>
                    <small>${(item.amount || 0) >= 0 ? "Completed" : "Processed"}</small>
                  </div>
                `
            }
          </div>
        </div>
      `;

      el.activityList.appendChild(wrap);
    });

    initActivitySwipe();
    renderActivityCryptoMarket();
    renderActivityTopMovers();
    renderActivityNews();
  }

  function drawSparkline(pathEl, points) {
    if (!pathEl || !points?.length) return;

    const width = 140;
    const height = 52;
    const pad = 4;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const span = max - min || 1;

    const coords = points.map((value, index) => {
      const x = (index / (points.length - 1)) * (width - pad * 2) + pad;
      const y = height - ((value - min) / span) * (height - pad * 2) - pad;
      return [x, y];
    });

    const d = coords
      .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
      .join(" ");

    pathEl.setAttribute("d", d);
  }

  function renderActivityCryptoMarket() {
    if (!el.activityCryptoMarket) return;
    el.activityCryptoMarket.innerHTML = "";

    state.activityMarketCoins.forEach((coin, index) => {
      const card = document.createElement("div");
      card.className = "market-mini-card";
      card.innerHTML = `
        <div class="market-mini-top">
          <div>
            <h4 class="market-mini-name">${coin.name}</h4>
            <p class="market-mini-sub">${coin.symbol}</p>
          </div>
          <div class="${coin.move >= 0 ? "green" : "red"}">${signedPercent(coin.move)}</div>
        </div>
        <svg class="market-spark" viewBox="0 0 140 52" preserveAspectRatio="none">
          <path id="marketSpark${index}" stroke="${coin.move >= 0 ? "#36d684" : "#ff637d"}"></path>
        </svg>
        <div class="market-mini-price">
          <strong>${money(coin.price)}</strong>
          <small class="${coin.move >= 0 ? "green" : "red"}">${coin.move >= 0 ? "Up" : "Down"}</small>
        </div>
      `;
      el.activityCryptoMarket.appendChild(card);

      const pathEl = card.querySelector(`#marketSpark${index}`);
      drawSparkline(pathEl, coin.points);
    });
  }

  function renderActivityTopMovers() {
    if (!el.activityTopMovers) return;
    el.activityTopMovers.innerHTML = "";

    state.activityTopMoversData.forEach((item) => {
      const card = document.createElement("div");
      card.className = "mover-mini-card";
      card.innerHTML = `
        <h4>${item.symbol}</h4>
        <p>${item.name}</p>
        <strong>${money(item.price)}</strong>
        <small class="${item.move >= 0 ? "green" : "red"}">${signedPercent(item.move)}</small>
      `;
      el.activityTopMovers.appendChild(card);
    });
  }

  function renderActivityNews() {
    if (!el.activityNewsList) return;
    el.activityNewsList.innerHTML = "";

    state.activityNewsItems.forEach((item) => {
      const card = document.createElement("div");
      card.className = "list-card news-card";
      card.innerHTML = `
        <div class="news-meta">
          <span>${item.source}</span>
          <span>•</span>
          <span>${item.age}</span>
        </div>
        <h4>${item.title}</h4>
      `;
      el.activityNewsList.appendChild(card);
    });
  }

  function nudgeActivityMarket() {
    if (!Array.isArray(state.activityMarketCoins)) return;
    if (state.settingsUi && state.settingsUi.charts === false) return;

    state.activityMarketCoins = state.activityMarketCoins.map((coin) => {
      const last = coin.points[coin.points.length - 1];
      const delta = Math.round((Math.random() * 4 - 2) * 10) / 10;
      const next = Math.max(3, Math.min(80, last + delta));
      const nextPoints = [...coin.points.slice(1), next];

      let nextPrice = coin.price;
      if (coin.price > 1000) {
        nextPrice = coin.price + (Math.random() * 60 - 30);
      } else if (coin.price > 100) {
        nextPrice = coin.price + (Math.random() * 4 - 2);
      } else if (coin.price > 1) {
        nextPrice = coin.price + (Math.random() * 0.08 - 0.04);
      } else {
        nextPrice = coin.price + (Math.random() * 0.01 - 0.005);
      }

      const nextMove = Number((coin.move + (Math.random() * 1.2 - 0.6)).toFixed(2));

      return {
        ...coin,
        price: Number(Math.max(0.000001, nextPrice).toFixed(coin.price < 1 ? 6 : 2)),
        move: nextMove,
        points: nextPoints
      };
    });

    renderActivityCryptoMarket();
    saveState();
  }

  function startActivityMarketTicker() {
    stopActivityMarketTicker();
    if (state.settingsUi && state.settingsUi.charts === false) return;
    activityMarketInterval = setInterval(nudgeActivityMarket, ACTIVITY_MARKET_TICK_MS);
  }

  function stopActivityMarketTicker() {
    if (activityMarketInterval) {
      clearInterval(activityMarketInterval);
      activityMarketInterval = null;
    }
  }

  function initActivitySwipe() {
    const cards = document.querySelectorAll(".activity-card-swipe");

    cards.forEach((card) => {
      if (card.dataset.swipeBound === "true") return;
      card.dataset.swipeBound = "true";

      let startX = 0;
      let currentX = 0;
      let dragging = false;

      const resetCard = () => {
        card.classList.remove("swiping");
        card.style.transform = "translateX(0px)";
      };

      const onStart = (clientX) => {
        dragging = true;
        startX = clientX;
        currentX = 0;
        card.classList.add("swiping");
      };

      const onMove = (clientX) => {
        if (!dragging) return;
        currentX = clientX - startX;
        if (currentX > 0) currentX = 0;
        if (currentX < -130) currentX = -130;
        card.style.transform = `translateX(${currentX}px)`;
      };

      const onEnd = () => {
        if (!dragging) return;
        dragging = false;
        card.classList.remove("swiping");

        if (currentX < -85) {
          const wrap = card.closest(".activity-swipe-wrap");
          const id = Number(wrap?.getAttribute("data-activity-id"));
          card.style.transform = "translateX(-140px)";
          setTimeout(() => {
            state.activity = state.activity.filter((item) => Number(item.id) !== id);
            saveState();
            renderActivity();
          }, 140);
        } else {
          resetCard();
        }
      };

      card.addEventListener("touchstart", (e) => onStart(e.touches[0].clientX), { passive: true });
      card.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX), { passive: true });
      card.addEventListener("touchend", onEnd);

      card.addEventListener("mousedown", (e) => onStart(e.clientX));
      window.addEventListener("mousemove", (e) => onMove(e.clientX));
      window.addEventListener("mouseup", onEnd);
    });
  }

  function settingsUsernameFromEmail(email) {
    const raw = (email || "richie").split("@")[0].trim();
    return `@${raw.replace(/\s+/g, "").toLowerCase() || "richie"}`;
  }

  function renderSettingsPage() {
    const settingsUsername = $("settingsUsername");
    const settingsTotalHoldings = $("settingsTotalHoldings");
    const settingsCryptoPct = $("settingsCryptoPct");
    const settingsInvestmentsPct = $("settingsInvestmentsPct");
    const settingsCashPct = $("settingsCashPct");
    const settingsCryptoBar = $("settingsCryptoBar");
    const settingsInvestmentsBar = $("settingsInvestmentsBar");
    const settingsCashBar = $("settingsCashBar");

    if (el.settingsName) el.settingsName.textContent = state.user.name || "Richie";
    if (el.settingsEmail) el.settingsEmail.textContent = state.user.email || "mail@asterwallet.co";
    if (settingsUsername) settingsUsername.textContent = settingsUsernameFromEmail(state.user.email);
    if (settingsTotalHoldings) settingsTotalHoldings.textContent = money(currentDisplayedTotal());

    const cryptoValue = totalCryptoValue();
    const investmentsValue = totalStockValue();
    const cashValue = Number(state.wallet.cash) || 0;
    const total = cryptoValue + investmentsValue + cashValue || 1;

    let cryptoPct = Math.round((cryptoValue / total) * 100);
    let investmentsPct = Math.round((investmentsValue / total) * 100);
    let cashPct = Math.round((cashValue / total) * 100);

    const pctTotal = cryptoPct + investmentsPct + cashPct;
    if (pctTotal !== 100) {
      cashPct += 100 - pctTotal;
    }

    if (settingsCryptoPct) settingsCryptoPct.textContent = `${cryptoPct}%`;
    if (settingsInvestmentsPct) settingsInvestmentsPct.textContent = `${investmentsPct}%`;
    if (settingsCashPct) settingsCashPct.textContent = `${cashPct}%`;

    if (settingsCryptoBar) settingsCryptoBar.style.width = `${cryptoPct}%`;
    if (settingsInvestmentsBar) settingsInvestmentsBar.style.width = `${investmentsPct}%`;
    if (settingsCashBar) settingsCashBar.style.width = `${cashPct}%`;

    document.querySelectorAll("[data-setting-toggle]").forEach((btn) => {
      const key = btn.getAttribute("data-setting-toggle");
      btn.classList.toggle("active", !!state.settingsUi[key]);
    });
  }

  function renderPortfolioDropdown() {
    if (!el.portfolioDropdownList) return;

    el.portfolioDropdownList.innerHTML = "";

    state.portfolioUi.items.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `portfolio-dropdown-item ${item.id === state.portfolioUi.activeId ? "active" : ""}`;
      btn.setAttribute("data-portfolio-id", item.id);
      btn.innerHTML = `
        <span class="portfolio-dropdown-dot"></span>
        <span class="portfolio-dropdown-label">${item.name}</span>
      `;
      el.portfolioDropdownList.appendChild(btn);
    });
  }

  function openPortfolioDropdown() {
    if (!el.portfolioDropdown || !el.portfolioSwitcherBtn) return;
    el.portfolioDropdown.classList.remove("hidden");
    el.portfolioSwitcherBtn.setAttribute("aria-expanded", "true");
  }

  function closePortfolioDropdown() {
    if (!el.portfolioDropdown || !el.portfolioSwitcherBtn) return;
    el.portfolioDropdown.classList.add("hidden");
    el.portfolioSwitcherBtn.setAttribute("aria-expanded", "false");
  }

  function togglePortfolioDropdown() {
    if (!el.portfolioDropdown) return;
    const hidden = el.portfolioDropdown.classList.contains("hidden");
    if (hidden) openPortfolioDropdown();
    else closePortfolioDropdown();
  }

  function openNewPortfolioModal() {
    if (!el.newPortfolioModal) return;
    el.newPortfolioModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    closePortfolioDropdown();
    setTimeout(() => {
      if (el.newPortfolioName) el.newPortfolioName.focus();
    }, 30);
  }

  function closeNewPortfolioModal() {
    if (!el.newPortfolioModal) return;
    el.newPortfolioModal.classList.add("hidden");
    if (
      (!el.manageModal || el.manageModal.classList.contains("hidden")) &&
      (!el.logoPreviewModal || el.logoPreviewModal.classList.contains("hidden"))
    ) {
      document.body.style.overflow = "";
    }
    if (el.newPortfolioForm) el.newPortfolioForm.reset();
  }

  function addPortfolio(name) {
    const cleanName = (name || "").trim();
    if (!cleanName) return;

    const newId = `p${Date.now()}`;
    state.portfolioUi.items.push({
      id: newId,
      name: cleanName
    });
    state.portfolioUi.activeId = newId;
    saveState();
    renderProfile();
    renderPortfolioDropdown();
  }

  function openLogoPreview() {
    if (!el.logoPreviewModal) return;
    el.logoPreviewModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLogoPreview() {
    if (!el.logoPreviewModal) return;
    el.logoPreviewModal.classList.add("hidden");

    const manageOpen = el.manageModal && !el.manageModal.classList.contains("hidden");
    const portfolioOpen = el.newPortfolioModal && !el.newPortfolioModal.classList.contains("hidden");

    if (!manageOpen && !portfolioOpen) {
      document.body.style.overflow = "";
    }
  }

  function renderAll() {
    renderProfile();
    renderHome();
    renderEnhancedPortfolioPage();
    renderAccounts();
    renderActivity();
    renderSettingsPage();
    renderPortfolioDropdown();
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
    if (
      (!el.newPortfolioModal || el.newPortfolioModal.classList.contains("hidden")) &&
      (!el.logoPreviewModal || el.logoPreviewModal.classList.contains("hidden"))
    ) {
      document.body.style.overflow = "";
    }
  }

  function applyManage() {
    state.user.name = el.manageName?.value.trim() || "Richie";
    const newName = el.manageName?.value.trim() || "Richie";
    state.user.name = newName;

    /* keep the main/default Richie portfolio synced with settings name */
    if (state.portfolioUi && Array.isArray(state.portfolioUi.items) && state.portfolioUi.items.length) {
      const primaryPortfolio = state.portfolioUi.items[0];

      if (primaryPortfolio) {
        primaryPortfolio.name = newName;

        if (!state.portfolioUi.activeId) {
          state.portfolioUi.activeId = primaryPortfolio.id;
        }
      }
    }
    state.user.email = el.manageEmail?.value.trim() || "richie2broke@proton.me";
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

    const preservedPortfolios = clone(state.portfolioUi);

    state = clone(defaultState);
    state.user = preservedUser;
    state.portfolioUi = preservedPortfolios;

    resetLiveBaseFromPortfolio();
    saveState();
    renderAll();
    closeManage();
    closeNewPortfolioModal();
    closePortfolioDropdown();
    closeLogoPreview();

    if (state.user.loggedIn) {
      showScreen("main");
      setTab("home");
      startLiveTicker();
      startActivityMarketTicker();
    } else {
      showScreen("login");
      stopLiveTicker();
      stopActivityMarketTicker();
    }
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
      state.user.name = formatted || "Richie";
    }

    if (!state.portfolioUi.items.length) {
      state.portfolioUi.items = [{ id: "p1", name: formatted || "Richie" }];
      state.portfolioUi.activeId = "p1";
    } else if (state.portfolioUi.items[0] && state.portfolioUi.items[0].name === "Richie" && formatted) {
      state.portfolioUi.items[0].name = formatted;
      if (state.portfolioUi.activeId === "p1") {
        state.portfolioUi.activeId = state.portfolioUi.items[0].id;
      }
    }

    state.user.loggedIn = true;
    resetLiveBaseFromPortfolio();
    saveState();
    renderAll();
    showScreen("main");
    setTab("home");
    startLiveTicker();
    startActivityMarketTicker();

    if (el.loginPassword) el.loginPassword.value = "";
  }

  function logout() {
    state.user.loggedIn = false;
    saveState();
    stopLiveTicker();
    stopActivityMarketTicker();
    closePortfolioDropdown();
    closeNewPortfolioModal();
    closeLogoPreview();
    showScreen("login");

    if (el.loginPassword) el.loginPassword.value = "";
  }

  function bindRangeEvents() {
    $$(".range-btn").forEach((btn) => {
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
        renderSettingsPage();
      });
    });

    $$(".asset-range-btn").forEach((btn) => {
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
        renderSettingsPage();
      });
    });
  }

  function bindExploreFilterEvents() {
    $$("[data-explore-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.exploreFilter = btn.dataset.exploreFilter;
        saveState();
        renderExploreCrypto();
      });
    });
  }

  function bindAccountEvents() {
    if (accountEventsBound) return;
    accountEventsBound = true;

    document.addEventListener("click", (e) => {
      const addAccountBtn = e.target.closest("#addAccountBtn");
      if (addAccountBtn) return;

      const accountCard = e.target.closest(".account-card");
      if (!accountCard) return;

      const accountId = accountCard.getAttribute("data-account-id");
      if (!accountId) return;

      state.accountUi.expandedId = state.accountUi.expandedId === accountId ? null : accountId;
      saveState();
      renderAccounts();
    });
  }

  function bindSettingsEvents() {
    if (settingsEventsBound) return;
    settingsEventsBound = true;

    document.addEventListener("click", (e) => {
      const toggle = e.target.closest("[data-setting-toggle]");
      if (!toggle) return;

      const key = toggle.getAttribute("data-setting-toggle");
      if (!key) return;

      state.settingsUi[key] = !state.settingsUi[key];
      saveState();
      renderSettingsPage();

      if (key === "charts") {
        if (state.settingsUi.charts) {
          startActivityMarketTicker();
        } else {
          stopActivityMarketTicker();
        }
      }

      if (key === "liveMotion") {
        if (state.settingsUi.liveMotion && state.selectedRange === "LIVE") {
          startLiveTicker();
        } else {
          stopLiveTicker();
        }
      }

      if (key === "notifications" && state.settingsUi.notifications) {
        scheduleTimedBanner(60000);
      }
    });
  }

  function bindPortfolioEvents() {
    if (portfolioEventsBound) return;
    portfolioEventsBound = true;

    if (el.portfolioSwitcherBtn) {
      el.portfolioSwitcherBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePortfolioDropdown();
      });
    }

    if (el.addPortfolioBtn) {
      el.addPortfolioBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openNewPortfolioModal();
      });
    }

    if (el.closeNewPortfolio) {
      el.closeNewPortfolio.addEventListener("click", closeNewPortfolioModal);
    }

    const newPortfolioBackdrop = document.querySelector('[data-close-new-portfolio="true"]');
    if (newPortfolioBackdrop) {
      newPortfolioBackdrop.addEventListener("click", closeNewPortfolioModal);
    }

    if (el.newPortfolioForm) {
      el.newPortfolioForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = el.newPortfolioName?.value || "";
        if (!name.trim()) return;
        addPortfolio(name);
        closeNewPortfolioModal();
      });
    }

    document.addEventListener("click", (e) => {
      const portfolioItem = e.target.closest(".portfolio-dropdown-item");
      if (portfolioItem) {
        const portfolioId = portfolioItem.getAttribute("data-portfolio-id");
        if (portfolioId) {
          state.portfolioUi.activeId = portfolioId;
          saveState();
          renderProfile();
          renderPortfolioDropdown();
          closePortfolioDropdown();
        }
        return;
      }

      const insideSwitcher = e.target.closest(".portfolio-switcher-wrap");
      const insideModal = e.target.closest("#newPortfolioModal");
      const insideAvatar = e.target.closest(".portfolio-avatar-wrap");
      if (!insideSwitcher && !insideModal && !insideAvatar) {
        closePortfolioDropdown();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closePortfolioDropdown();
        if (el.newPortfolioModal && !el.newPortfolioModal.classList.contains("hidden")) {
          closeNewPortfolioModal();
        }
      }
    });
  }

  function bindLogoPreviewEvents() {
    if (logoPreviewEventsBound) return;
    logoPreviewEventsBound = true;

    const openFromAvatar = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closePortfolioDropdown();
      openLogoPreview();
    };

    if (el.portfolioAvatarWrap) {
      el.portfolioAvatarWrap.addEventListener("click", openFromAvatar);
      el.portfolioAvatarWrap.addEventListener("touchend", openFromAvatar, { passive: false });
    }

    if (el.portfolioAvatar) {
      el.portfolioAvatar.addEventListener("click", openFromAvatar);
      el.portfolioAvatar.addEventListener("touchend", openFromAvatar, { passive: false });
    }

    if (el.logoPreviewBackdrop) {
      el.logoPreviewBackdrop.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeLogoPreview();
      });
      el.logoPreviewBackdrop.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeLogoPreview();
      }, { passive: false });
    }

    if (el.logoPreviewModal) {
      el.logoPreviewModal.addEventListener("click", (e) => {
        if (
          e.target === el.logoPreviewModal ||
          e.target === el.logoPreviewBackdrop
        ) {
          closeLogoPreview();
        }
      });

      el.logoPreviewModal.addEventListener("touchend", (e) => {
        if (
          e.target === el.logoPreviewModal ||
          e.target === el.logoPreviewBackdrop
        ) {
          e.preventDefault();
          closeLogoPreview();
        }
      }, { passive: false });
    }

    if (el.logoPreviewContent) {
      el.logoPreviewContent.addEventListener("click", (e) => e.stopPropagation());
      el.logoPreviewContent.addEventListener("touchend", (e) => e.stopPropagation(), { passive: true });
    }

    if (el.logoPreviewImage) {
      el.logoPreviewImage.addEventListener("click", (e) => e.stopPropagation());
      el.logoPreviewImage.addEventListener("touchend", (e) => e.stopPropagation(), { passive: true });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && el.logoPreviewModal && !el.logoPreviewModal.classList.contains("hidden")) {
        closeLogoPreview();
      }
    });
  }

  function getVisibleBannerElement() {
    if (!el.topInfoBanner) return null;
    const isHidden =
      el.topInfoBanner.style.display === "none" ||
      window.getComputedStyle(el.topInfoBanner).display === "none";
    return isHidden ? null : el.topInfoBanner;
  }

  function scheduleTimedBanner(delay = 60000) {
    if (!el.topInfoBanner) return;
    if (state.settingsUi && state.settingsUi.notifications === false) return;

    if (timedBannerTimeout) {
      clearTimeout(timedBannerTimeout);
      timedBannerTimeout = null;
    }

    timedBannerTimeout = setTimeout(() => {
      if (state.settingsUi && state.settingsUi.notifications === false) return;

      const visibleBanner = getVisibleBannerElement();
      if (visibleBanner) {
        scheduleTimedBanner(15000);
        return;
      }

      const nextBanner = timedBannerPool[Math.floor(Math.random() * timedBannerPool.length)];
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

  function injectSectionPlusButton(targetId, btnId) {
    const target = $(targetId);
    if (!target) return;

    const sectionHead = target.previousElementSibling;
    if (!sectionHead || sectionHead.querySelector(`#${btnId}`)) return;

    sectionHead.classList.add("market-section-head");

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.id = btnId;
    addBtn.className = "market-add-btn";
    addBtn.textContent = "+";

    sectionHead.appendChild(addBtn);
  }

  function bindGlobalEvents() {
    if (el.loginForm) {
      el.loginForm.addEventListener("submit", handleLogin);
    }

    el.navBtns.forEach((btn) => {
      btn.addEventListener("click", () => setTab(btn.dataset.tab));
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
        if (state.user.loggedIn) {
          startLiveTicker();
          renderSettingsPage();
        }
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

        if (closeId === "topInfoBanner") {
          scheduleTimedBanner(60000);
        }
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
    bindGlobalEvents();
    bindRangeEvents();
    bindExploreFilterEvents();
    bindAccountEvents();
    bindSettingsEvents();
    bindPortfolioEvents();
    bindLogoPreviewEvents();

    resetLiveBaseFromPortfolio();
    renderAll();

    injectSectionPlusButton("activityCryptoMarket", "activityMarketAddBtn");
    injectSectionPlusButton("activityTopMovers", "activityTopMoversAddBtn");

    if (state.user.loggedIn) {
      showScreen("main");
      setTab("home");
      startLiveTicker();
      startActivityMarketTicker();
      scheduleTimedBanner(60000);
    } else {
      showScreen("login");
      stopLiveTicker();
      stopActivityMarketTicker();
    }
  }

  init();
})();
