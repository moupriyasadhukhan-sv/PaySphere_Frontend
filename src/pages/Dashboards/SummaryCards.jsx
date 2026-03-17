// src/components/dashboard/SummaryCards.jsx
import { useEffect, useState } from "react";
import { api } from "../../services/http";
export default function SummaryCards() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMerchants, setTotalMerchants] = useState(0);

  useEffect(() => {
    let mounted = true;

    // Total Users from paged endpoint
    api
      .get("/api/Users", { params: { role: "User", page: 1, pageSize: 1 } })
      .then((res) => {
        if (mounted) setTotalUsers(res?.data?.total ?? 0);
      })
      .catch(console.error);

    // Total Merchants (backend returns all for now)
    api
      .get("/api/Merchant")
      .then((res) => {
        const data = Array.isArray(res?.data?.data) ? res.data.data : [];
        if (mounted) setTotalMerchants(data.length);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white border rounded-xl p-5">
        <div className="text-sm text-gray-500 mb-1">Total Users</div>
        <div className="text-3xl font-semibold">{totalUsers.toLocaleString()}</div>
        <div className="text-xs text-green-600 mt-1">+12% from last month</div>
      </div>
      <div className="bg-white border rounded-xl p-5">
        <div className="text-sm text-gray-500 mb-1">Merchants</div>
        <div className="text-3xl font-semibold">{totalMerchants.toLocaleString()}</div>
        <div className="text-xs text-green-600 mt-1">+8% from last month</div>
      </div>
    </div>
  );
}