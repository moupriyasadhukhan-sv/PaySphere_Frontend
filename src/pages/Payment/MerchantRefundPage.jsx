import { useEffect, useState } from "react";
import {
  listMerchantRefundRequests,
  approveRefundRequest,
  rejectRefundRequest,
} from "../../services/refunds/refundRequestsApi";
import { createRefund } from "../../services/transactions/transactionsApi";
 
export default function MerchantRefundsPage() {
  const [rows, setRows] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
 
  async function refresh() {
    setErr(""); setMsg("");
    try {
      const data = await listMerchantRefundRequests();
      const normalized = data.map((x) => ({
        id: x.id,
        originalTransactionID: x.OriginalTransactionID ?? x.originalTransactionID,
        amount: x.Amount ?? x.amount,
        userId: x.UserId ?? x.userId,
        phone: x.Phone ?? x.phone,
        requestedAtUtc: x.RequestedAtUtc ?? x.requestedAtUtc,
        status: x.Status ?? x.status,
      }));
      setRows(normalized);
    } catch (e) {
      const d = e?.response?.data;
      setErr(d?.detail || d?.title || d?.message || e?.message || "Failed to load refund requests");
    }
  }
 
  useEffect(() => { refresh(); }, []);
 
  async function approve(id) {
    setErr(""); setMsg("");
    try {
      setBusyId(id);
      await approveRefundRequest(id);
      setMsg("Request approved.");
      await refresh();
    } catch (e) {
      const d = e?.response?.data;
      setErr(d?.detail || d?.title || d?.message || e?.message || "Approve failed");
    } finally {
      setBusyId(null);
    }
  }
 
  async function reject(id) {
    setErr(""); setMsg("");
    try {
      setBusyId(id);
      await rejectRefundRequest(id);
      setMsg("Request rejected.");
      await refresh();
    } catch (e) {
      const d = e?.response?.data;
      setErr(d?.detail || d?.title || d?.message || e?.message || "Reject failed");
    } finally {
      setBusyId(null);
    }
  }
 
  async function execute(row) {
    setErr(""); setMsg("");
    try {
      setBusyId(row.id);
      const res = await createRefund({
        originalTransactionID: row.originalTransactionID,
        phoneNumber: row.phone,
        requestId: row.id,
      });
      setMsg(res?.message || "Refund executed.");
      await refresh();
    } catch (e) {
      const d = e?.response?.data;
      setErr(d?.detail || d?.title || d?.message || e?.message || "Execution failed");
    } finally {
      setBusyId(null);
    }
  }
 
  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-semibold mb-1">Refund Requests</h2>
      <p className="text-slate-600 mb-4">Approve or reject requests. After approval, execute the refund.</p>
 
      {err && <div className="mb-2 text-red-600">{err}</div>}
      {msg && <div className="mb-2 text-green-600">{msg}</div>}
 
      <div className="overflow-x-auto border rounded bg-white">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-3 py-2 border-b text-left">Request ID</th>
              <th className="px-3 py-2 border-b text-left">Original Txn</th>
              <th className="px-3 py-2 border-b text-left">Amount</th>
              <th className="px-3 py-2 border-b text-left">User Phone</th>
              <th className="px-3 py-2 border-b text-left">Requested At</th>
              <th className="px-3 py-2 border-b text-left">Status</th>
              <th className="px-3 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td className="px-3 py-3 text-slate-500" colSpan={7}>No refund requests</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2 border-b">{r.id}</td>
                <td className="px-3 py-2 border-b">{r.originalTransactionID}</td>
                <td className="px-3 py-2 border-b">₹{r.amount}</td>
                <td className="px-3 py-2 border-b">{r.phone}</td>
                <td className="px-3 py-2 border-b">{new Date(r.requestedAtUtc).toLocaleString()}</td>
                <td className="px-3 py-2 border-b">{r.status}</td>
                <td className="px-3 py-2 border-b">
                  <div className="flex gap-2">
                    {r.status === "Pending" && (
                      <>
                        <button disabled={busyId === r.id} onClick={() => approve(r.id)}
                          className="px-2 py-1 rounded bg-green-600 text-white disabled:opacity-50">
                          {busyId === r.id ? "..." : "Approve"}
                        </button>
                        <button disabled={busyId === r.id} onClick={() => reject(r.id)}
                          className="px-2 py-1 rounded bg-slate-200 disabled:opacity-50">
                          {busyId === r.id ? "..." : "Reject"}
                        </button>
                      </>
                    )}
                    {r.status === "Approved" && (
                      <button disabled={busyId === r.id} onClick={() => execute(r)}
                        className="px-2 py-1 rounded bg-blue-600 text-white disabled:opacity-50">
                        {busyId === r.id ? "..." : "Execute Refund"}
                      </button>
                    )}
                    {(r.status === "Rejected" || r.status === "Completed") && (
                      <span className="text-slate-500 text-sm">No actions</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 