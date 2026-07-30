import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, CheckCircle2 } from 'lucide-react';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-slate-100 font-sans">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/50 animate-bounce">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-emerald-500 text-slate-950 ring-4 ring-slate-950">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            LearnTrack <span className="gradient-text">AI</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">AI Progress Engine</p>
        </div>

        {/* Loading Status Indicator */}
        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Initializing AI Models...</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full animate-pulse w-full" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium pt-1">
            <CheckCircle2 className="w-4 h-4" /> Session Verified. Loading Dashboard...
          </div>
        </div>
      </div>
    </div>
  );
};
