import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-slate-50">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            {/* Simple wallet icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </div>
          <span className="font-semibold text-slate-900">PaySphere</span>
        </div>
        <nav className="flex items-center gap-3">
          <Link to="/login" className="text-slate-700 hover:text-slate-900">Login</Link>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-600/10 rounded-full px-3 py-1 text-sm mb-4">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Fast, Secure, Reliable</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Your Money, <span className="text-indigo-600">Simplified</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              PaySphere is your all-in-one digital wallet and payment management platform. Send money,
              pay merchants, and manage your finances with ease.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700"
              >
                Create Free Account
              </button>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 hover:bg-white"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Illustrative card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="text-slate-900 font-semibold mb-2">Why PaySphere?</div>
            <ul className="text-slate-600 space-y-2 list-disc pl-6">
              <li>Unified wallet for users and merchants</li>
              <li>Role-based dashboards (Admin, Ops, Risk)</li>
              <li>Secure authentication and authorization</li>
              <li>Modern, responsive UI powered by Tailwind</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
