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

  // return (
  //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //     <div className="bg-white border rounded-xl p-5">
  //       <div className="text-sm text-gray-500 mb-1">Total Users</div>
  //       <div className="text-3xl font-semibold">{totalUsers.toLocaleString()}</div>
  //       <div className="text-xs text-green-600 mt-1">+12% from last month</div>
  //     </div>
  //     <div className="bg-white border rounded-xl p-5">
  //       <div className="text-sm text-gray-500 mb-1">Merchants</div>
  //       <div className="text-3xl font-semibold">{totalMerchants.toLocaleString()}</div>
  //       <div className="text-xs text-green-600 mt-1">+8% from last month</div>
  //     </div>
  //   </div>
  // );
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Total Users */}
    <div className="relative">
      {/* Glow Background */}
      <div className="absolute inset-0 rounded-2xl 
                      bg-[radial-gradient(circle_at_top_left,_rgba(255,0,182,0.5),_rgba(138,43,226,0.2),_transparent)]
                      blur-2xl opacity-70">
      </div>

      {/* Actual Card */}
      <div className="relative rounded-2xl p-6 border border-white/10
                      bg-white/5 backdrop-blur-xl
                      shadow-[0_0_20px_rgba(255,255,255,0.1)]
                      hover:shadow-[0_0_35px_rgba(255,0,200,0.35)]
                      transition">
        
        <div className="text-sm text-slate-300 mb-1">Total Users</div>

        <div className="text-4xl font-bold text-white drop-shadow-xl">
          {totalUsers.toLocaleString()}
        </div>

        <div className="text-xs text-green-400 mt-2 font-medium">
          +12% from last month
        </div>
      </div>
    </div>

    {/* Total Merchants */}
    <div className="relative">
      {/* Glow Background */}
      <div className="absolute inset-0 rounded-2xl 
                      bg-[radial-gradient(circle_at_bottom_right,_rgba(255,0,182,0.5),_rgba(138,43,226,0.2),_transparent)]
                      blur-2xl opacity-70">
      </div>

      {/* Card */}
      <div className="relative rounded-2xl p-6 border border-white/10
                      bg-white/5 backdrop-blur-xl
                      shadow-[0_0_20px_rgba(255,255,255,0.1)]
                      hover:shadow-[0_0_35px_rgba(255,0,200,0.35)]
                      transition">

        <div className="text-sm text-slate-300 mb-1">Total Merchants</div>

        <div className="text-4xl font-bold text-white drop-shadow-xl">
          {totalMerchants.toLocaleString()}
        </div>

        <div className="text-xs text-green-400 mt-2 font-medium">
          +8% from last month
        </div>
      </div>
    </div>

  </div>
);
}