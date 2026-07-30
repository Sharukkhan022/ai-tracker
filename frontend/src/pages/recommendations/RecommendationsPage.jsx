import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const RecommendationsPage = () => {
  const navigate = useNavigate();
  const { recommendations } = useStore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-indigo-500" />
          <span>AI Personalized Recommendations</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Google Gemini AI identifies weak concepts from quiz responses and recommends targeted revision actions.
        </p>
      </div>

      {/* Recommendations Feed */}
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="glass-card p-6 space-y-4 border-indigo-500/30">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded ${
                rec.priority === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {rec.priority} Priority Action
              </span>

              <span className="text-xs font-semibold text-slate-400">Current Mastery: {rec.currentMastery}%</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{rec.topic}</h3>
              <p className="text-xs text-slate-400 mt-1">{rec.spaceTitle}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-300">
              <span className="font-bold text-amber-400">AI Diagnostic:</span> {rec.reason}
            </div>

            {/* Suggested Action Bullets */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Suggested Revision Plan</p>
              <div className="space-y-1.5">
                {rec.suggestedActions?.map((act, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => navigate(`/recommendations/${rec.id}`)}
                className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 flex items-center gap-1.5 transition-all"
              >
                <span>View Full Diagnostic & Resources</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
