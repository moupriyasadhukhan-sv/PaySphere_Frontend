import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/http";
import ConfirmDialog from "../../common/ConfirmDialog";

export default function CreateSettlement() {
  const { merchantId } = useParams();
  const navigate = useNavigate();

  const [period, setPeriod] = useState("");
  const [amount, setAmount] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "OK",
    cancelText: "",
  });

  const openConfirm = ({ title, message, confirmText = "OK", cancelText = "", onConfirm }) => {
    setConfirmConfig({ title, message, confirmText, cancelText, onConfirm });
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (confirming) return;
    setConfirmOpen(false);
  };

  const handleCreate = async () => {
    try {
      const payload = {
        merchantID: Number(merchantId),
        period,
        amount: Number(amount),
      };

      const res = await api.post("/api/Settlement", payload);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      openConfirm({
        title: "Success",
        message: <div>Settlement created successfully!</div>,
        confirmText: "OK",
        onConfirm: () => navigate(-1),
      });

    } catch (e) {
      openConfirm({
        title: "Error Creating Settlement",
        message: e?.response?.data?.message || e.message,
        confirmText: "OK",
        cancelText: "",
      });
    }
  };

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Create Settlement — Merchant {merchantId}
          </h2>
          <p className="text-sm text-gray-500">
            Enter settlement details below
          </p>
        </div>

        <button
          className="border rounded-md px-3 py-1"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {/* Form */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10 text-white max-w-lg">

        <div className="mb-4">
          <label className="block mb-1">Merchant ID</label>
          <input
            className="w-full px-3 py-2 rounded bg-black/20"
            value={merchantId}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Period</label>
          <input
            className="w-full px-3 py-2 rounded bg-black/20"
            placeholder="JAN-2026"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded bg-black/20"
            placeholder="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-md px-4 py-2"
          onClick={handleCreate}
        >
          Create Settlement
        </button>

      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.confirmText}
        cancelText={confirmConfig.cancelText}
        confirming={confirming}
        onCancel={closeConfirm}
        onConfirm={async () => {
          try {
            setConfirming(true);
            await confirmConfig.onConfirm?.();
            setConfirmOpen(false);
          } finally {
            setConfirming(false);
          }
        }}
      />
    </div>
  );
}