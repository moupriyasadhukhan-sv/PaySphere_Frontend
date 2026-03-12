import http from "../http";

// GET /api/Dashboard/user
export async function getUserDashboard() {
  const res = await http.get("/api/Dashboard/user");
  // Expecting something like: { name, walletId, ... }
  return res?.data || {};
}

// GET /api/Dashboard/merchant
export async function getMerchantDashboard() {
  const res = await http.get("/api/Dashboard/merchant");
  return res?.data || {};
}