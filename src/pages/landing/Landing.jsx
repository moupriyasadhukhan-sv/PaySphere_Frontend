import { Link, useNavigate } from "react-router-dom";

// export default function Landing() {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-slate-50">
//       {/* Header */}
//       <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
//             {/* Simple wallet icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
//             </svg>
//           </div>
//           <span className="font-semibold text-slate-900">PaySphere</span>
//         </div>
//         <nav className="flex items-center gap-3">
//           <Link to="/login" className="text-slate-700 hover:text-slate-900">Login</Link>
//           <button
//             type="button"
//             onClick={() => navigate("/register")}
//             className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
//           >
//             Get Started
//           </button>
//         </nav>
//       </header>

//       {/* Hero */}
//       <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <div>
//             <div className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-600/10 rounded-full px-3 py-1 text-sm mb-4">
//               <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//               <span>Fast, Secure, Reliable</span>
//             </div>

//             <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
//               Your Money, <span className="text-indigo-600">Simplified</span>
//             </h1>
//             <p className="mt-4 text-slate-600 text-lg">
//               PaySphere is your all-in-one digital wallet and payment management platform. Send money,
//               pay merchants, and manage your finances with ease.
//             </p>

//             <div className="mt-6 flex items-center gap-3">
//               <button
//                 onClick={() => navigate("/register")}
//                 className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700"
//               >
//                 Create Free Account
//               </button>
//               <Link
//                 to="/login"
//                 className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 hover:bg-white"
//               >
//                 Sign In
//               </Link>
//             </div>
//           </div>

//           {/* Illustrative card */}
//           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
//             <div className="text-slate-900 font-semibold mb-2">Why PaySphere?</div>
//             <ul className="text-slate-600 space-y-2 list-disc pl-6">
//               <li>Unified wallet for users and merchants</li>
//               <li>Role-based dashboards (Admin, Ops, Risk)</li>
//               <li>Secure authentication and authorization</li>
//               <li>Modern, responsive UI powered by Tailwind</li>
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="
        h-screen w-full 
        bg-cover bg-center bg-no-repeat 
        relative
      "
      style={{
        backgroundImage: "url('/images/Payment_Landing.png')",
      }}
    >
      {/* LIGHT OVERLAY (Fix: no blur/dim anymore) */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-br 
          from-[#071a3d]/30 
          via-[#063025]/25 
          to-[#020a33]/20
        "
      ></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6 h-full flex flex-col">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl 
              bg-gradient-to-br from-[#1fa2ff] to-[#12d8fa] 
              flex items-center justify-center shadow-lg"
            >
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]">
              PaySphere
            </h1>
          </div>

          <div className="flex space-x-4">
            {/* LOGIN BUTTON with REAL Hover effect */}
            <button
              onClick={() => navigate("/login")}
              className="
                px-4 py-2 rounded-lg 
                bg-white/15 
                hover:bg-white/40
                transition duration-200 
                backdrop-blur-sm text-white
                hover:scale-105
              "
            >
              Login
            </button>

            {/* GET STARTED BUTTON (matching theme) */}
            <button
              onClick={() => navigate("/register")}
              className="
                px-5 py-2 rounded-lg 
                bg-gradient-to-r from-[#1fa2ff] via-[#12d8fa] to-[#06beb6]
                hover:scale-105 
                transition duration-200 
                shadow-md text-white font-semibold
              "
            >
              Get Started Free
            </button>
          </div>
        </header>

        {/* HERO CONTENT */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">

          <h2 className="text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]">
            Powering
            <span className="
              block text-transparent bg-clip-text 
              bg-gradient-to-r from-[#12d8fa] to-[#06beb6] mt-1
            ">
              Smarter Payments
            </span>
            For Everyone
          </h2>

          <p className="text-lg opacity-90 mt-6 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            PaySphere is a secure digital wallet built for effortless payments,
            instant transfers, and worry‑free financial management. Fast,
            reliable and designed to fit your lifestyle.
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={() => navigate("/register")}
            className="
              mt-10 px-6 py-3 rounded-xl 
              bg-gradient-to-r from-[#1fa2ff] via-[#12d8fa] to-[#06beb6]
              hover:scale-105 
              transition duration-200 
              shadow-lg text-white font-semibold
              w-fit
            "
          >
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
}
