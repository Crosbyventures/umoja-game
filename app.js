// === Config ===
const CONTRACT = "0x8d6a79567a701fce55b62c15d0fbb765913ac84a";
const TG_HANDLE = "@UMOJACOMMUNITY";
const TG_LINK = "https://t.me/UmojaCommunity";

// PancakeSwap swap URL (Token address in outputCurrency)
const PANCAKE_SWAP_URL =
  "https://pancakeswap.finance/swap?chain=bsc&outputCurrency=" + CONTRACT;

// A common Router v2 address on BSC (can be updated if you use v3 / another router)
const DEFAULT_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const $ = (s) => document.querySelector(s);

// === Buttons / links ===
$("#buyBtn").href = PANCAKE_SWAP_URL;
$("#tgBtn").href = TG_LINK;

// Copy contract
$("#copyContract").addEventListener("click", async () => {
  await navigator.clipboard.writeText(CONTRACT);
  $("#copyContract").textContent = "✅ Copied!";
  setTimeout(() => ($("#copyContract").textContent = "📋 Copy Address"), 1200);
});

// Copy template buttons
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const target = btn.getAttribute("data-copy");
    const text = document.querySelector(target)?.textContent || "";
    await navigator.clipboard.writeText(text);
    btn.textContent = "✅ Copied!";
    setTimeout(() => (btn.textContent = "📋 Copy"), 1200);
  });
});

// === Tabs ===
document.querySelectorAll(".tab").forEach((t) => {
  t.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    const tab = t.dataset.tab;
    $("#tab-manual").classList.toggle("hidden", tab !== "manual");
    $("#tab-auto").classList.toggle("hidden", tab !== "auto");
  });
});

// === Manual DAU ===
function loadManual() {
  const s = JSON.parse(localStorage.getItem("umoja_dau") || "{}");
  if (s.today != null) $("#dauToday").textContent = s.today;
  if (s.yesterday != null) $("#dauYesterday").textContent = s.yesterday;
  if (s.avg != null) $("#dauAvg").textContent = s.avg;

  $("#manualToday").value = s.today ?? "";
  $("#manualYesterday").value = s.yesterday ?? "";
  $("#manualAvg").value = s.avg ?? "";
}

$("#saveManual").addEventListener("click", () => {
  const today = Number($("#manualToday").value || 0);
  const yesterday = Number($("#manualYesterday").value || 0);
  const avg = Number($("#manualAvg").value || 0);

  localStorage.setItem("umoja_dau", JSON.stringify({ today, yesterday, avg }));
  $("#dauToday").textContent = today;
  $("#dauYesterday").textContent = yesterday;
  $("#dauAvg").textContent = avg;

  $("#saveManual").textContent = "✅ Saved";
  setTimeout(() => ($("#saveManual").textContent = "Save"), 1000);
});

loadManual();

// === Wallet eligibility (1 entry per wallet per UTC day) ===
// NOTE: This is a simple local demo rule. For full on-chain verification, we’ll connect to BscScan/Node later.
function utcDayKey() {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`; // UTC day boundary
}

function normalize(addr) {
  return (addr || "").trim().toLowerCase();
}

function hasEnteredToday(addr) {
  const key = "umoja_entries_" + utcDayKey();
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  return list.includes(addr);
}

function markEntered(addr) {
  const key = "umoja_entries_" + utcDayKey();
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  if (!list.includes(addr)) list.push(addr);
  localStorage.setItem(key, JSON.stringify(list));
}

// Check eligibility
$("#checkWallet").addEventListener("click", () => {
  const addr = normalize($("#walletInput").value);
  if (!addr.startsWith("0x") || addr.length < 10) {
    $("#walletResult").textContent = "❌ Invalid wallet address.";
    return;
  }
  if (hasEnteredToday(addr)) {
    $("#walletResult").textContent =
      "⚠️ Not eligible today: this wallet already has an entry for " + utcDayKey() + " (UTC).";
  } else {
    $("#walletResult").textContent =
      "✅ Eligible today: this wallet has NOT entered yet (1 entry per wallet per UTC day).";
    // If you want, you can mark it as entered (demo):
    // markEntered(addr);
  }
});

// === Auto DAU (BscScan) ===
// This is an optional helper. Exact filtering for swaps can be refined next.
$("#routerAddr").value = DEFAULT_ROUTER;

$("#runAuto").addEventListener("click", async () => {
  const apiKey = $("#bscKey").value.trim();
  const router = $("#routerAddr").value.trim() || DEFAULT_ROUTER;

  if (!apiKey) {
    alert("Paste a BscScan API key first.");
    return;
  }

  $("#runAuto").textContent = "⏳ Running...";
  $("#runAuto").disabled = true;

  try {
    // Pull token transfers for CONTRACT and count unique "from" addresses in last 24h (quick proxy).
    // NOTE: This is NOT perfect swap detection yet—it's a credible starting point for DAU trending.
    const end = Math.floor(Date.now() / 1000);
    const start = end - 86400;

    // BscScan token transfer endpoint
    const url =
      `https://api.bscscan.com/api?module=account&action=tokentx` +
      `&contractaddress=${CONTRACT}` +
      `&page=1&offset=100&sort=desc` +
      `&apikey=${apiKey}`;

    const r = await fetch(url);
    const data = await r.json();

    if (data.status !== "1" || !Array.isArray(data.result)) {
      throw new Error(data.message || "BscScan returned no results");
    }

    // Filter last 24h and approximate user activity by unique 'from' addresses
    const unique = new Set();
    const nowSec = Math.floor(Date.now() / 1000);

    for (const tx of data.result) {
      const t = Number(tx.timeStamp || 0);
      if (t < start || t > nowSec) continue;
      unique.add((tx.from || "").toLowerCase());
    }

    // Show as "Today’s DAU" proxy
    $("#dauToday").textContent = unique.size;
    $("#dauYesterday").textContent = "—";
    $("#dauAvg").textContent = "—";

    alert(
      `Auto DAU proxy calculated: ${unique.size} unique wallets interacted with UMOJA transfers in last 24h.\n\nNext step: refine to swap-specific detection (router method / pair).`
    );
  } catch (e) {
    console.error(e);
    alert("Auto mode error: " + (e.message || e));
  } finally {
    $("#runAuto").textContent = "Run Auto Count";
    $("#runAuto").disabled = false;
  }
});
