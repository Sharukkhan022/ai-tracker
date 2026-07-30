import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 animate-pulse">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 p-1 rounded-full bg-emerald-500 text-slate-950">
          <Sparkles className="w-3 h-3" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Preparing Learning Data...</h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          Gemini AI progress engine is aggregating quiz attempts and subject mastery metrics.
        </p>
      </div>

      <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse w-full" />
      </div>
    </div>
  );
};
