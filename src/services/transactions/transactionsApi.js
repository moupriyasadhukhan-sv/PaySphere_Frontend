// // // src/services/transactions/transactionsApi.js
// // // This service returns transactions enriched with From/To names
// // // using Wallet -> (User/Merchant) relationships.
// // //
// // // It first tries to use an already-enriched API shape (if backend supplies FromName/ToName).
// // // If not, it fetches Wallets + Users + Merchants and joins on the client.
// // //
// // // Endpoints assumed (adjust if your API differs):
// // //   GET /api/Transactions
// // //   GET /api/Wallets         (or /api/Wallet)
// // //   GET /api/Users           (paged or not)
// // //   GET /api/Merchant        (paged or not)

// // import http from "../http";

// // export async function getTransactionsEnriched() {
// //   // 1) Base transactions
// //   const trxRes = await http.get("/api/Transactions");
// //   const transactions = Array.isArray(trxRes?.data)
// //     ? trxRes.data
// //     : (trxRes?.data?.data || []);

// //   // If backend already sends names, just normalize casing and return
// //   if (transactions.length && (("fromName" in transactions[0]) || ("FromName" in transactions[0]))) {
// //     return transactions.map((t) => ({
// //       transactionId: t.transactionId ?? t.TransactionID,
// //       fromWalletId:  t.fromWalletId  ?? t.FromWalletID,
// //       toWalletId:    t.toWalletId    ?? t.ToWalletID,
// //       amount:        t.amount        ?? t.Amount,
// //       currency:      t.currency      ?? t.Currency,
// //       transactionType: t.transactionType ?? t.TransactionType,
// //       transactionDate: t.transactionDate ?? t.TransactionDate,
// //       status:          t.status          ?? t.Status,
// //       fromName:      t.fromName      ?? t.FromName,
// //       fromPartyType: t.fromPartyType ?? t.FromPartyType,
// //       toName:        t.toName        ?? t.ToName,
// //       toPartyType:   t.toPartyType   ?? t.ToPartyType,
// //     }));
// //   }

// //   // 2) Fallback: join on the client

// //   // Wallets (map WalletID -> { userId, merchantId })
// //   const walletsRes = await http.get("/api/Wallets"); // If your API is /api/Wallet, change it here
// //   const wallets = Array.isArray(walletsRes?.data)
// //     ? walletsRes.data
// //     : (walletsRes?.data?.data || []);

// //   const walletMap = new Map();
// //   for (const w of wallets) {
// //     const wid = w.walletId ?? w.WalletID;
// //     walletMap.set(wid, {
// //       userId:     w.userId     ?? w.UserID     ?? null,
// //       merchantId: w.merchantId ?? w.MerchantID ?? null,
// //     });
// //   }

// //   // Collect only the user/merchant IDs we actually need (from the tx wallets)
// //   const needUserIds = new Set();
// //   const needMerchantIds = new Set();
// //   for (const t of transactions) {
// //     const fw = walletMap.get(t.fromWalletId ?? t.FromWalletID);
// //     const tw = walletMap.get(t.toWalletId   ?? t.ToWalletID);
// //     if (fw?.userId != null)     needUserIds.add(fw.userId);
// //     if (fw?.merchantId != null) needMerchantIds.add(fw.merchantId);
// //     if (tw?.userId != null)     needUserIds.add(tw.userId);
// //     if (tw?.merchantId != null) needMerchantIds.add(tw.merchantId);
// //   }

// //   // Users (try paged and non-paged shapes)
// //   let users = [];
// //   try {
// //     const usersRes = await http.get("/api/Users", { params: { page: 1, pageSize: 5000 } });
// //     users = Array.isArray(usersRes?.data?.data)
// //       ? usersRes.data.data
// //       : (Array.isArray(usersRes?.data) ? usersRes.data : []);
// //   } catch { /* optional: log */ }

// //   // Merchants
// //   let merchants = [];
// //   try {
// //     const merchantsRes = await http.get("/api/Merchant", { params: { page: 1, pageSize: 5000 } });
// //     merchants = Array.isArray(merchantsRes?.data?.data)
// //       ? merchantsRes.data.data
// //       : (Array.isArray(merchantsRes?.data) ? merchantsRes.data : []);
// //   } catch { /* optional: log */ }

// //   // Build lookup maps
// //   const userNameById = new Map();
// //   for (const u of users) {
// //     const id = u.userId ?? u.UserID;
// //     if (id == null) continue;
// //     if (needUserIds.size === 0 || needUserIds.has(id)) {
// //       userNameById.set(id, u.name ?? u.Name);
// //     }
// //   }

// //   const merchantNameById = new Map();
// //   for (const m of merchants) {
// //     const id = m.merchantId ?? m.MerchantID;
// //     if (id == null) continue;
// //     if (needMerchantIds.size === 0 || needMerchantIds.has(id)) {
// //       merchantNameById.set(id, m.name ?? m.Name);
// //     }
// //   }

// //   // Resolve helper
// //   const resolveParty = (walletId) => {
// //     const rel = walletMap.get(walletId);
// //     if (!rel) return { name: "-", type: "Unknown" };
// //     if (rel.userId != null)     return { name: userNameById.get(rel.userId)       || "(User)",     type: "User" };
// //     if (rel.merchantId != null) return { name: merchantNameById.get(rel.merchantId) || "(Merchant)", type: "Merchant" };
// //     return { name: "-", type: "Unknown" };
// //   };

// //   // Build enriched rows
// //   return transactions.map((t) => {
// //     const transactionId = t.transactionId ?? t.TransactionID;
// //     const fromWalletId  = t.fromWalletId  ?? t.FromWalletID;
// //     const toWalletId    = t.toWalletId    ?? t.ToWalletID;
// //     const { name: fromName, type: fromPartyType } = resolveParty(fromWalletId);
// //     const { name: toName,   type: toPartyType   } = resolveParty(toWalletId);

// //     return {
// //       transactionId,
// //       fromWalletId,
// //       toWalletId,
// //       amount:          t.amount ?? t.Amount,
// //       currency:        t.currency ?? t.Currency,
// //       transactionType: t.transactionType ?? t.TransactionType,
// //       transactionDate: t.transactionDate ?? t.TransactionDate,
// //       status:          t.status ?? t.Status,
// //       fromName,
// //       fromPartyType,
// //       toName,
// //       toPartyType,
// //     };
// //   });
// // }

// // src/services/transactions/transactionsApi.js
// // Robust client: tries both /api/Transactions and /api/Transaction
// // Accepts many response shapes, enriches names via Wallet -> (User/Merchant).

// import http from "../http";

// function normalizeRows(payload) {
//   // Accept array, or { data: [...] }, or { items: [...] }
//   if (Array.isArray(payload)) return payload;
//   if (payload?.data && Array.isArray(payload.data)) return payload.data;
//   if (payload?.items && Array.isArray(payload.items)) return payload.items;
//   return [];
// }

// async function getRawTransactions() {
//   // Try plural first
//   try {
//     const res = await http.get("/api/Transactions");
//     const rows = normalizeRows(res?.data);
//     console.debug("[TX] /api/Transactions ->", rows);
//     if (rows.length > 0 || res?.status === 200) return rows;
//   } catch (e) {
//     console.warn("[TX] /api/Transactions failed:", e?.response?.status, e?.message);
//   }

//   // Try singular as fallback
//   try {
//     const res = await http.get("/api/Transaction");
//     const rows = normalizeRows(res?.data);
//     console.debug("[TX] /api/Transaction ->", rows);
//     if (rows.length > 0 || res?.status === 200) return rows;
//   } catch (e) {
//     console.warn("[TX] /api/Transaction failed:", e?.response?.status, e?.message);
//   }

//   return [];
// }

// async function getWallets() {
//   // Try /api/Wallets then /api/Wallet
//   try {
//     const res = await http.get("/api/Wallets", { params: { page: 1, pageSize: 5000 } });
//     const rows = normalizeRows(res?.data);
//     console.debug("[TX] /api/Wallets ->", rows?.length);
//     if (rows.length) return rows;
//   } catch (e) {
//     console.warn("[TX] /api/Wallets failed:", e?.response?.status);
//   }
//   try {
//     const res = await http.get("/api/Wallet", { params: { page: 1, pageSize: 5000 } });
//     const rows = normalizeRows(res?.data);
//     console.debug("[TX] /api/Wallet ->", rows?.length);
//     return rows;
//   } catch (e) {
//     console.warn("[TX] /api/Wallet failed:", e?.response?.status);
//     return [];
//   }
// }

// async function getUsersLite() {
//   // Your Users might be paged; ask a big page
//   try {
//     const res = await http.get("/api/Users", { params: { page: 1, pageSize: 5000 } });
//     const rows = normalizeRows(res?.data);
//     console.debug("[TX] /api/Users ->", rows?.length);
//     return rows;
//   } catch (e) {
//     console.warn("[TX] /api/Users failed:", e?.response?.status);
//     return [];
//   }
// }

// async function getMerchantsLite() {
//   try {
//     const res = await http.get("/api/Merchant", { params: { page: 1, pageSize: 5000 } });
//     const rows = normalizeRows(res?.data);
//     console.debug("[TX] /api/Merchant ->", rows?.length);
//     return rows;
//   } catch (e) {
//     console.warn("[TX] /api/Merchant failed:", e?.response?.status);
//     return [];
//   }
// }

// export async function getTransactionsEnriched() {
//   // 1) Base transactions
//   const transactions = await getRawTransactions();

//   // If API already returns names, pass through (normalize key casing)
//   if (transactions.length && (("fromName" in transactions[0]) || ("FromName" in transactions[0]))) {
//     return transactions.map((t) => ({
//       transactionId: t.transactionId ?? t.TransactionID,
//       fromWalletId:  t.fromWalletId  ?? t.FromWalletID,
//       toWalletId:    t.toWalletId    ?? t.ToWalletID,
//       amount:        t.amount        ?? t.Amount,
//       currency:      t.currency      ?? t.Currency,
//       transactionType: t.transactionType ?? t.TransactionType,
//       transactionDate: t.transactionDate ?? t.TransactionDate,
//       status:          t.status          ?? t.Status,
//       fromName:      t.fromName      ?? t.FromName,
//       fromPartyType: t.fromPartyType ?? t.FromPartyType,
//       toName:        t.toName        ?? t.ToName,
//       toPartyType:   t.toPartyType   ?? t.ToPartyType,
//     }));
//   }

//   // 2) Else, join client-side
//   const [wallets, users, merchants] = await Promise.all([
//     getWallets(),
//     getUsersLite(),
//     getMerchantsLite(),
//   ]);

//   const walletMap = new Map();
//   for (const w of wallets) {
//     const wid = w.walletId ?? w.WalletID;
//     walletMap.set(wid, {
//       userId:     w.userId     ?? w.UserID     ?? null,
//       merchantId: w.merchantId ?? w.MerchantID ?? null,
//     });
//   }
//   const userNameById = new Map();
//   for (const u of users) {
//     const id = u.userId ?? u.UserID;
//     if (id != null) userNameById.set(id, u.name ?? u.Name);
//   }
//   const merchantNameById = new Map();
//   for (const m of merchants) {
//     const id = m.merchantId ?? m.MerchantID;
//     if (id != null) merchantNameById.set(id, m.name ?? m.Name);
//   }

//   const resolveParty = (walletId) => {
//     const rel = walletMap.get(walletId);
//     if (!rel) return { name: "-", type: "Unknown" };
//     if (rel.userId != null)     return { name: userNameById.get(rel.userId) || "(User)", type: "User" };
//     if (rel.merchantId != null) return { name: merchantNameById.get(rel.merchantId) || "(Merchant)", type: "Merchant" };
//     return { name: "-", type: "Unknown" };
//   };

//   const enriched = transactions.map((t) => {
//     const transactionId = t.transactionId ?? t.TransactionID;
//     const fromWalletId  = t.fromWalletId  ?? t.FromWalletID;
//     const toWalletId    = t.toWalletId    ?? t.ToWalletID;
//     const { name: fromName, type: fromPartyType } = resolveParty(fromWalletId);
//     const { name: toName,   type: toPartyType   } = resolveParty(toWalletId);

//     return {
//       transactionId,
//       fromWalletId,
//       toWalletId,
//       amount:          t.amount ?? t.Amount,
//       currency:        t.currency ?? t.Currency,
//       transactionType: t.transactionType ?? t.TransactionType,
//       transactionDate: t.transactionDate ?? t.TransactionDate,
//       status:          t.status ?? t.Status,
//       fromName,
//       fromPartyType,
//       toName,
//       toPartyType,
//     };
//   });

//   console.debug("[TX] enriched ->", enriched);
//   return enriched;
// }

// src/services/transactions/transactionsApi.js
// Enrich transactions with From/To names using Wallet -> (User/Merchant).
// This version assumes SQL/DTO field names are PascalCase as per your screenshots.

// import http from "../http";

// // --- helpers ---------------------------------------------------------------

// function asArray(payload) {
//   if (Array.isArray(payload)) return payload;
//   if (payload?.data && Array.isArray(payload.data)) return payload.data;
//   if (payload?.items && Array.isArray(payload.items)) return payload.items;
//   return [];
// }

// // Map your transaction row (PascalCase) -> normalized camelCase the UI uses
// function mapTxRow(row) {
//   return {
//     transactionId: row.TransactionID ?? row.transactionId,
//     fromWalletId: row.FromWalletID ?? row.fromWalletId,
//     toWalletId: row.ToWalletID ?? row.toWalletId,
//     amount: row.Amount ?? row.amount,
//     currency: row.Currency ?? row.currency,
//     transactionType: row.TransactionType ?? row.transactionType,
//     transactionDate: row.TransactionDate ?? row.transactionDate,
//     status: row.Status ?? row.status,
//   };
// }

// // For wallets, we just need WalletID/UserID/MerchantID
// function mapWallet(row) {
//   return {
//     walletId: row.WalletID ?? row.walletId,
//     userId: row.UserID ?? row.userId ?? null,
//     merchantId: row.MerchantID ?? row.merchantId ?? null,
//   };
// }

// function mapUser(row) {
//   return {
//     userId: row.UserID ?? row.userId,
//     name: row.Name ?? row.name,
//   };
// }

// function mapMerchant(row) {
//   return {
//     merchantId: row.MerchantID ?? row.merchantId,
//     name: row.Name ?? row.name,
//   };
// }

// // --- fetchers (try plural then singular, accept multiple shapes) ------------

// async function fetchTransactions() {
//   try {
//     const res = await http.get("/api/Transactions");
//     const rows = asArray(res?.data);
//     if (rows.length || res?.status === 200) {
//       console.debug("[TX] /api/Transactions ->", rows);
//       return rows.map(mapTxRow);
//     }
//   } catch (e) {
//     console.warn("[TX] /api/Transactions failed:", e?.response?.status, e?.message);
//   }
//   try {
//     const res = await http.get("/api/Transaction");
//     const rows = asArray(res?.data);
//     console.debug("[TX] /api/Transaction ->", rows);
//     return rows.map(mapTxRow);
//   } catch (e) {
//     console.warn("[TX] /api/Transaction failed:", e?.response?.status, e?.message);
//     return [];
//   }
// }

// async function fetchWallets() {
//   try {
//     const res = await http.get("/api/Wallets", { params: { page: 1, pageSize: 5000 } });
//     const rows = asArray(res?.data);
//     if (rows.length) {
//       console.debug("[TX] /api/Wallets ->", rows.length);
//       return rows.map(mapWallet);
//     }
//   } catch (e) {
//     console.warn("[TX] /api/Wallets failed:", e?.response?.status);
//   }
//   try {
//     const res = await http.get("/api/Wallet", { params: { page: 1, pageSize: 5000 } });
//     const rows = asArray(res?.data);
//     console.debug("[TX] /api/Wallet ->", rows.length);
//     return rows.map(mapWallet);
//   } catch (e) {
//     console.warn("[TX] /api/Wallet failed:", e?.response?.status);
//     return [];
//   }
// }

// async function fetchUsersLite() {
//   try {
//     const res = await http.get("/api/Users", { params: { page: 1, pageSize: 5000 } });
//     const rows = asArray(res?.data);
//     console.debug("[TX] /api/Users ->", rows.length);
//     return rows.map(mapUser);
//   } catch (e) {
//     console.warn("[TX] /api/Users failed:", e?.response?.status);
//     return [];
//   }
// }

// async function fetchMerchantsLite() {
//   try {
//     const res = await http.get("/api/Merchant", { params: { page: 1, pageSize: 5000 } });
//     const rows = asArray(res?.data);
//     console.debug("[TX] /api/Merchant ->", rows.length);
//     return rows.map(mapMerchant);
//   } catch (e) {
//     console.warn("[TX] /api/Merchant failed:", e?.response?.status);
//     return [];
//   }
// }

// // --- main API --------------------------------------------------------------

// export async function getTransactionsEnriched() {
//   // 1) Get transactions (now normalized to camelCase)
//   const base = await fetchTransactions();

//   if (!base.length) {
//     console.warn("[TX] No transactions returned by API.");
//     return [];
//   }

//   // 2) If backend already enriched with names (rare), pass-through (we could detect FromName/ToName)
//   // In your case, backend returns only IDs; continue to join on client.

//   // 3) Client-side join: wallets + users + merchants
//   const [wallets, users, merchants] = await Promise.all([
//     fetchWallets(),
//     fetchUsersLite(),
//     fetchMerchantsLite(),
//   ]);

//   // Build lookups
//   const walletById = new Map(wallets.map(w => [w.walletId, w]));
//   const userNameById = new Map(users.map(u => [u.userId, u.name]));
//   const merchantNameById = new Map(merchants.map(m => [m.merchantId, m.name]));

//   const resolveParty = (walletId) => {
//     const w = walletById.get(walletId);
//     if (!w) return { name: "-", type: "Unknown" };
//     if (w.userId != null) {
//       return { name: userNameById.get(w.userId) || "(User)", type: "User" };
//     }
//     if (w.merchantId != null) {
//       return { name: merchantNameById.get(w.merchantId) || "(Merchant)", type: "Merchant" };
//     }
//     return { name: "-", type: "Unknown" };
//   };

//   const enriched = base.map(t => {
//     const from = resolveParty(t.fromWalletId);
//     const to = resolveParty(t.toWalletId);
//     return {
//       ...t,
//       fromName: from.name,
//       fromPartyType: from.type,
//       toName: to.name,
//       toPartyType: to.type,
//     };
//   });

//   console.debug("[TX] enriched ->", enriched);
//   return enriched;
// }


// src/services/transactions/transactionsApi.js
// SIMPLE API CLIENT — NO JOINS
// It calls your backend endpoint and normalizes the result minimally for the UI.
// Based on your Swagger screenshot, the API returns:
// {
//   "page": 1,
//   "pageSize": 50,
//   "items": [ { transactionID, fromWalletID, ... } ]
// }

import http from "../http";

/**
 * Fetch a page of transactions directly from the backend.
 * @param {number} page
 * @param {number} pageSize
 * @returns {Promise<{items: any[], totalCount: number, page: number, pageSize: number}>}
 */
export async function getTransactionsSimple(page = 1, pageSize = 10) {
  const res = await http.get("/api/Transactions", { params: { page, pageSize } });

  // Accept both exact swagger shape and slight variations
  const data = res?.data || {};
  const itemsRaw = Array.isArray(data.items) ? data.items : (Array.isArray(data.data) ? data.data : []);
  const totalCount =
    data.totalCount ??
    data.total ??
    data.count ??
    // if no total is provided, fall back to items length (not ideal, but keeps UI working)
    itemsRaw.length;

  // We keep the items as-is (PascalCase), but also add camelCase copies
  const items = itemsRaw.map((t) => ({
    // keep originals
    transactionID: t.transactionID ?? t.TransactionID,
    fromWalletID:  t.fromWalletID  ?? t.FromWalletID,
    toWalletID:    t.toWalletID    ?? t.ToWalletID,
    amount:        t.amount        ?? t.Amount,
    currency:      t.currency      ?? t.Currency,
    transactionType: t.transactionType ?? t.TransactionType,
    transactionDate: t.transactionDate ?? t.TransactionDate,
    status:          t.status          ?? t.Status,

    // provide camelCase as convenience for components that expect it
    transactionId: t.transactionID ?? t.TransactionID,
    fromWalletId:  t.fromWalletID  ?? t.FromWalletID,
    toWalletId:    t.toWalletID    ?? t.ToWalletID,
  }));

  return {
    items,
    totalCount: Number.isFinite(totalCount) ? totalCount : items.length,
    page: data.page ?? page,
    pageSize: data.pageSize ?? pageSize,
  };
}