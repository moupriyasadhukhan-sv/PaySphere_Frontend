// import React from "react";

// /**
//  * Props:
//  * - open: boolean
//  * - title: string
//  * - message: string | ReactNode
//  * - onCancel: () => void
//  * - onConfirm: () => void
//  * - confirmText?: string ("Okay")
//  * - cancelText?: string ("Cancel")
//  */
// export default function ConfirmDialog({
//   open,
//   title = "Confirm",
//   message = "Are you sure?",
//   onCancel,
//   onConfirm,
//   confirmText = "Okay",
//   cancelText = "Cancel",
// }) {
//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       aria-modal="true"
//       role="dialog"
//     >
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/40"
//         onClick={onCancel}
//         aria-hidden="true"
//       />

//       {/* Dialog */}
//       <div className="relative z-10 w-[min(92vw,420px)] rounded-2xl overflow-hidden shadow-2xl">
//         <div className="bg-blue-500 px-5 py-4 text-white flex items-center gap-3">
//           <div className="h-10 w-10 flex items-center justify-center bg-blue-400 rounded-full text-2xl">?</div>
//           <div className="font-semibold text-lg">{title}</div>
//           <button
//             onClick={onCancel}
//             className="ml-auto text-white/90 hover:text-white"
//             aria-label="Close dialog"
//             title="Close"
//           >
//             ×
//           </button>
//         </div>

//         <div className="bg-white px-6 py-5">
//           <div className="text-gray-700">{message}</div>

//           <div className="mt-5 flex items-center justify-end gap-3">
//             <button
//               onClick={onConfirm}
//               className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
//             >
//               {confirmText}
//             </button>
//             <button
//               onClick={onCancel}
//               className="px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
//             >
//               {cancelText}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/common/ConfirmDialog.jsx
import React from "react";

export default function ConfirmDialog({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirming = false, // optional loading flag
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative z-10 w-[min(92vw,480px)] mx-auto mt-24 rounded-xl overflow-hidden shadow-2xl bg-white"
      >
        <div className="bg-blue-500 px-5 py-4 text-white flex items-center justify-between">
          <h2 id="confirm-title" className="font-semibold text-lg">{title}</h2>
          <button type="button" className="rounded px-2 hover:bg-blue-600" onClick={onCancel} aria-label="Close">
            ×
          </button>
        </div>

        <div className="p-5 text-gray-800">
          {typeof message === "string" ? <p>{message}</p> : message}
        </div>

        <div className="px-5 py-3 bg-gray-50 flex items-center justify-end gap-3">
          <button type="button" className="px-3 py-1.5 border rounded-md" onClick={onCancel} disabled={confirming}>
            {cancelText}
          </button>
          <button
            type="button" // important: never submit outer forms
            className={`px-3 py-1.5 rounded-md text-white ${
              confirming ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={onConfirm} // <— THIS is where "Yes" triggers the passed action
            disabled={confirming}
          >
            {confirming ? "Working…" : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}