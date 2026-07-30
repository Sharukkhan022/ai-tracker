import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shadow-xl">
        <HelpCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-sm">
        <span className="text-xs font-extrabold uppercase tracking-widest text-rose-500">Error 404</span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Page Not Found</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The route you accessed does not exist or has been moved to another Learning Space.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <Link
          to="/dashboard"
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 flex items-center gap-1.5 transition-all"
        >
          <Home className="w-4 h-4" /> Return Dashboard
        </Link>
      </div>
    </div>
  );
};
