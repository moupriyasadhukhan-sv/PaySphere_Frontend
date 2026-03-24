// src/components/transactions/HistoryTable.jsx
import React from "react";

const cell = "px-3 py-2 border-b border-slate-100";
const head = "px-3 py-2 bg-slate-50 font-semibold border-b border-slate-200";

export default function HistoryTable({ data, page, onPrev, onNext, onView }) {
  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));

  return (
    <>
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className={head}>ID</th>
              <th className={head}>Type</th>
              <th className={head}>Status</th>
              <th className={head}>Amount</th>
              <th className={head}>Currency</th>
              <th className={head}>From</th>
              <th className={head}>To</th>
              <th className={head}>Date</th>
              <th className={head}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
              <tr>
                <td className="px-3 py-5 text-center text-slate-500" colSpan={9}>
                  No transactions found.
                </td>
              </tr>
            )}
            {data.items.map((t) => {
              const id = t.TransactionID ?? t.transactionID ?? t.transactionId;
              return (
                <tr key={id}>
                  <td className={cell}>{id}</td>
                  <td className={cell}>{t.TransactionType ?? t.transactionType}</td>
                  <td className={cell}>{t.Status ?? t.status}</td>
                  <td className={cell}>{t.Amount ?? t.amount}</td>
                  <td className={cell}>{t.Currency ?? t.currency}</td>
                  <td className={cell}>{t.FromWalletID ?? t.fromWalletID ?? t.fromWalletId ?? "-"}</td>
                  <td className={cell}>{t.ToWalletID ?? t.toWalletID ?? t.toWalletId ?? "-"}</td>
                  <td className={cell}>
                    {(t.TransactionDate ?? t.transactionDate)
                      ? new Date(t.TransactionDate ?? t.transactionDate).toLocaleString()
                      : "-"}
                  </td>
                  <td className={cell}>
                    <button
                      type="button"
                      onClick={() => onView?.(id)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pager */}
      <div className="flex items-center gap-2 mt-2">
        <button onClick={onPrev} className="px-3 py-1 border rounded">Prev</button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={onNext} className="px-3 py-1 border rounded">Next</button>
        <span className="text-slate-500 ml-2">{data.total} total • {data.pageSize} per page</span>
      </div>
    </>
  );
}
