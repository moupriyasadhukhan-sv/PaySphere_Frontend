import { api } from "../http";

/**
 * Fetch a page of transactions directly from the backend.
 * @param {number} page
 * @param {number} pageSize
 * @returns {Promise<{items: any[], totalCount: number, page: number, pageSize: number}>}
 */
export async function getTransactionsSimple(page = 1, pageSize = 10) {
  const res = await api.get("/api/Transactions", { params: { page, pageSize } });

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