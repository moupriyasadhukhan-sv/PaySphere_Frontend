// src/components/transactions/TransactionDetailsPanel.jsx
import { useEffect, useState } from "react";
import { getTransactionById } from "../../services/transactions/transactionsApi";

/**
 * Inline details panel that loads a transaction by id
 * and renders a closable card above the history table.
 */
export default function TransactionDetailsPanel({ id, onClose }) {
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr]   = useState("");

  useEffect(() => {
    async function load() {
      if (!id) return;
      setBusy(true); setErr(""); setData(null);
      try {
        const res = await getTransactionById(id);
        setData(res);
      } catch (e) {
        const msg = e?.response?.data?.detail || e?.message || "Failed to load transaction";
        setErr(msg);
        console.error("[TxnDetails] Error:", e?.response?.data || e);
      } finally {
        setBusy(false);
      }
    }
    load();
  }, [id]);

  return (
    <div className="mb-4 border rounded bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3 className="font-semibold">Transaction&nbsp;#{id}</h3>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 px-2 py-1 rounded"
          aria-label="Close details"
          title="Close"
        >
          ✕
        </button>
      </div>

      <div className="p-4">
        {busy && <p>Loading…</p>}
        {err && <p className="text-red-600">{err}</p>}
        {data && (
          <div className="grid gap-2 sm:max-w-xl">
            <KV label="ID"       value={data.TransactionID ?? data.transactionID ?? data.transactionId} />
            <KV label="Type"     value={data.TransactionType ?? data.transactionType} />
            <KV label="Status"   value={data.Status ?? data.status} />
            <KV label="Amount"   value={data.Amount ?? data.amount} />
            <KV label="Currency" value={data.Currency ?? data.currency} />
            <KV label="From"     value={data.FromWalletID ?? data.fromWalletID ?? data.fromWalletId ?? "-"} />
            <KV label="To"       value={data.ToWalletID ?? data.toWalletID ?? data.toWalletId ?? "-"} />
            <KV
              label="Date"
              value={(data.TransactionDate ?? data.transactionDate)
                ? new Date(data.TransactionDate ?? data.transactionDate).toLocaleString()
                : "-"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function KV({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}