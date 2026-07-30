import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, Sparkles, Play } from 'lucide-react';

export const RecommendationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recommendations, generateCustomQuiz } = useStore();

  const rec = recommendations.find((r) => r.id === id) || recommendations[0];

  const handleGenerateTargetedQuiz = () => {
    const newQuizId = generateCustomQuiz({
      spaceId: rec.spaceId,
      spaceTitle: rec.spaceTitle,
      topic: rec.topic,
      difficulty: 'Hard',
      numQuestions: 5,
    });
    navigate(`/quizzes/${newQuizId}/instructions`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/recommendations" className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">AI Diagnostic Breakdown</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Detailed explanation & curated study resources for weak topics.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 space-y-6 border-indigo-500/30">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-400">
            {rec.priority} Priority Topic
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">{rec.topic}</h2>
          <p className="text-xs text-slate-400 mt-1">{rec.spaceTitle}</p>
        </div>

        {/* AI Insight Diagnostic */}
        <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
          <div className="flex items-center gap-2 font-bold text-indigo-400 text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Gemini AI Weakness Analysis</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{rec.reason}</p>
        </div>

        {/* Action Steps */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Curated Study Plan Steps</h3>
          <div className="space-y-2">
            {rec.suggestedActions?.map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-200 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Action Button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <button
            onClick={handleGenerateTargetedQuiz}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Attempt AI Revision Practice Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
