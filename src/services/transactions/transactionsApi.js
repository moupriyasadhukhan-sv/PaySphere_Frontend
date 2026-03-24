import { api } from "../http";
 
/* ----------------------------- HISTORY ------------------------------ */
 
export function getUserHistory(
  userId,
  { direction = "all", sortBy = "date", page = 1, pageSize = 20 } = {}
) {
  return api
    .get(`/api/users/${userId}/transactions`, {
      params: { direction, sortBy, page, pageSize },
    })
    .then((r) => r.data);
}
 
export function getMerchantHistory(
  merchantId,
  { direction = "all", sortBy = "date", page = 1, pageSize = 20 } = {}
) {
  return api
    .get(`/api/merchants/${merchantId}/transactions`, {
      params: { direction, sortBy, page, pageSize },
    })
    .then((r) => r.data);
}
 
/* ------------------------------ SINGLE READ ------------------------------ */
export function getTransactionById(id) {
  return api.get(`/api/Transactions/${id}`).then((r) => r.data);
}
 
/* ------------------------------ CREATE ------------------------------ */
 
export function createP2P({ toWalletID, amount, currency = "INR", transactionDate, phoneNumber }) {
  const body = {
    toWalletID: Number(toWalletID),
    amount: Number(amount),
    currency,
    transactionDate: transactionDate || new Date().toISOString(),
    phoneNumber: String(phoneNumber || "").trim(),
  };
  return api.post("/api/Transactions/p2p", body).then((r) => r.data);
}
 
export function createP2M({ toWalletID, amount, currency = "INR", transactionDate, phoneNumber }) {
  const body = {
    toWalletID: Number(toWalletID),
    amount: Number(amount),
    currency,
    transactionDate: transactionDate || new Date().toISOString(),
    phoneNumber: String(phoneNumber || "").trim(),
  };
  return api.post("/api/Transactions/p2m", body).then((r) => r.data);
}
 
// Refund execution (optionally by Approved requestId)
export function createRefund({
  originalTransactionID,
  amount,
  currency = "INR",
  transactionDate,
  phoneNumber,
  requestId,
}) {
  const body = {
    originalTransactionID: Number(originalTransactionID),
    amount: amount ? Number(amount) : undefined,
    currency,
    transactionDate: transactionDate || new Date().toISOString(),
    phoneNumber: String(phoneNumber || "").trim(),
    requestId: requestId || undefined,
  };
  return api.post("/api/Transactions/refunds", body).then((r) => r.data);
}
 