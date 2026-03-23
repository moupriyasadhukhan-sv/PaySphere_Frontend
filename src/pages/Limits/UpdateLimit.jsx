// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { api } from "../../services/http";

// export default function UpdateLimit() {
//   const { limitId } = useParams(); // Retrieves ID from URL
//   const navigate = useNavigate();
  
//   const [form, setForm] = useState({
//     limitID: limitId,
//     userID: "",
//     dailyLimit: "",
//     monthlyLimit: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   // 1. Load existing data
//   useEffect(() => {
//     api.get(`/api/limits/${limitId}`)
//       .then((res) => {
//         // Map backend response to form
//         const data = res.data;
//         setForm({
//           limitID: data.limitID,
//           userID: data.userID,
//           dailyLimit: data.dailyLimit,
//           monthlyLimit: data.monthlyLimit,
//         });
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Could not find this limit record.");
//         setLoading(false);
//       });
//   }, [limitId]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       // Matches Swagger: PUT /api/limits/{limitId}
//       const payload = {
//         limitID: Number(limitId),
//         userID: Number(form.userID),
//         dailyLimit: Number(form.dailyLimit),
//         monthlyLimit: Number(form.monthlyLimit),
//       };

//       await api.put(`/api/limits/${limitId}`, payload);
      
//       alert("Limit updated successfully!");
//       navigate("/dashboard/admin"); // Return to main table
//     } catch (err) {
//       setError("Failed to update limit.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div className="p-6">Loading Limit Data...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Update Limit (ID: {limitId})</h2>
//       <form onSubmit={onSubmit} className="max-w-md space-y-4 bg-white p-6 border rounded-xl">
//         {error && <p className="text-red-500">{error}</p>}
        
//         <div>
//           <label className="block text-sm font-medium">Daily Limit</label>
//           <input
//             type="number"
//             value={form.dailyLimit}
//             onChange={(e) => setForm({...form, dailyLimit: e.target.value})}
//             className="w-full border p-2 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Monthly Limit</label>
//           <input
//             type="number"
//             value={form.monthlyLimit}
//             onChange={(e) => setForm({...form, monthlyLimit: e.target.value})}
//             className="w-full border p-2 rounded-md"
//             required
//           />
//         </div>

//         <div className="flex gap-2">
//           <button 
//             type="submit" 
//             disabled={submitting}
//             className="bg-emerald-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
//           >
//             {submitting ? "Updating..." : "Save Changes"}
//           </button>
//           <button type="button" onClick={() => navigate(-1)} className="border px-4 py-2 rounded-md">
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/http";

export default function UpdateLimit() {
  const { limitId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    limitID: limitId,
    userID: "",
    dailyLimit: "",
    monthlyLimit: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/limits/${limitId}`)
      .then((res) => {
        const d = res.data.data;
        setForm({
          limitID: d.limitID,
          userID: d.userID,
          dailyLimit: d.dailyLimit,
          monthlyLimit: d.monthlyLimit,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Could not find this limit record.");
        setLoading(false);
      });
  }, [limitId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        dailyLimit: Number(form.dailyLimit),
        monthlyLimit: Number(form.monthlyLimit),
      };

      await api.put(`/api/limits/${limitId}`, payload);

      alert("Limit updated successfully!");
      navigate("/dashboard/admin");
    } catch (err) {
      setError("Failed to update limit.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading Limit Data...</div>;

  // return (
  //   <div className="p-6">
  //     <h2 className="text-xl font-semibold mb-4">Update Limit (ID: {limitId})</h2>

  //     <form onSubmit={onSubmit} className="max-w-md space-y-4 bg-white p-6 border rounded-xl">
  //       {error && <p className="text-red-500">{error}</p>}

  //       <div>
  //         <label className="block text-sm font-medium">User ID</label>
  //         <input
  //           disabled
  //           value={form.userID}
  //           className="w-full bg-gray-100 border p-2 rounded-md"
  //         />
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium">Daily Limit</label>
  //         <input
  //           type="number"
  //           value={form.dailyLimit}
  //           onChange={(e) => setForm({ ...form, dailyLimit: e.target.value })}
  //           className="w-full border p-2 rounded-md"
  //           required
  //         />
  //       </div>

  //       <div>
  //         <label className="block text-sm font-medium">Monthly Limit</label>
  //         <input
  //           type="number"
  //           value={form.monthlyLimit}
  //           onChange={(e) => setForm({ ...form, monthlyLimit: e.target.value })}
  //           className="w-full border p-2 rounded-md"
  //           required
  //         />
  //       </div>

  //       <div className="flex gap-2">
  //         <button
  //           type="submit"
  //           disabled={submitting}
  //           className="bg-emerald-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
  //         >
  //           {submitting ? "Updating..." : "Save Changes"}
  //         </button>
  //         <button
  //           type="button"
  //           onClick={() => navigate(-1)}
  //           className="border px-4 py-2 rounded-md"
  //         >
  //           Cancel
  //         </button>
  //       </div>

  //     </form>
  //   </div>
  // );

  return (
  <div className="min-h-screen flex items-center justify-center p-6">

    <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl 
                    border border-white/20 rounded-2xl p-6 shadow-xl">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          Update Limit (ID: {limitId})
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 rounded-md border border-white/30 text-white 
                     hover:bg-white/10 transition"
        >
          Back
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">

        {error && <p className="text-red-400">{error}</p>}

        <div>
          <label className="block text-sm text-white/80 mb-1">User ID</label>
          <input
            disabled
            value={form.userID}
            className="w-full bg-white/10 border border-white/20 text-white 
                       p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm text-white/80 mb-1">Daily Limit</label>
          <input
            type="number"
            value={form.dailyLimit}
            onChange={(e) =>
              setForm({ ...form, dailyLimit: e.target.value })
            }
            className="w-full bg-white/10 border border-white/20 text-white 
                       p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white/80 mb-1">Monthly Limit</label>
          <input
            type="number"
            value={form.monthlyLimit}
            onChange={(e) =>
              setForm({ ...form, monthlyLimit: e.target.value })
            }
            className="w-full bg-white/10 border border-white/20 text-white 
                       p-2 rounded-md"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md 
                       disabled:opacity-50 hover:bg-emerald-700 transition"
          >
            {submitting ? "Updating..." : "Save Changes"}
          </button>

          <button
            onClick={() => navigate(-1)}
            type="button"
            className="border border-white/30 text-white px-4 py-2 rounded-md 
                       hover:bg-white/10 transition"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  </div>
);
}