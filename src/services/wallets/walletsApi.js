// src/services/wallets/walletsApi.js
import { api } from "../http";
 
// Preferred: verify endpoints return { exists, walletID, status, balance, currency }
export function verifyUserWallet(userId) {
  return api.get(`/api/Wallets/user/${userId}/verify`).then((r) => r.data);
}
 
export function verifyMerchantWallet(merchantId) {
  return api.get(`/api/Wallets/merchant/${merchantId}/verify`).then((r) => r.data);
}
 
// Fallback: list wallets if verify says no wallet
export function getUserWallets(userId) {
  return api
    .get("/api/Wallets", { params: { userId } })
    .then((r) => (Array.isArray(r.data) ? r.data : []));
}
export function getMerchantWallets(merchantId) {
  return api
    .get("/api/Wallets", { params: { merchantId } })
    .then((r) => (Array.isArray(r.data) ? r.data : []));
}
 
export function getWalletById(walletId) {
  return api.get(`/api/Wallets/${walletId}`).then((r) => r.data);
}
 