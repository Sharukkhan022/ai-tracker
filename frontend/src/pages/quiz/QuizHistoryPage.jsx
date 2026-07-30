import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { History, Award, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const QuizHistoryPage = () => {
  const navigate = useNavigate();
  const { quizHistory } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <History className="w-6 h-6 text-purple-500" />
            <span>Quiz Attempt History</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track past quiz attempts, accuracy trends, and review past answer keys.
          </p>
        </div>

        <button
          onClick={() => navigate('/quizzes/generate')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all"
        >
          <span>Take New Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {quizHistory.length === 0 ? (
          <div className="glass-card p-12 text-center text-slate-400">
            <History className="w-10 h-10 mx-auto text-slate-600 opacity-40 mb-3" />
            <p className="text-sm font-medium">No quiz attempts logged yet.</p>
          </div>
        ) : (
          quizHistory.map((item) => (
            <div
              key={item.attemptId}
              className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-indigo-500/40"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${item.score >= 70 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      item.score >= 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.spaceTitle} • Completed on {item.date}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Time spent: {Math.floor(item.timeSpentSeconds / 60)}m {item.timeSpentSeconds % 60}s
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <p className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{item.score}%</p>
                  <p className="text-[10px] text-slate-400">{item.correctCount}/{item.totalQuestions} Correct</p>
                </div>

                <button
                  onClick={() => navigate(`/quizzes/${item.quizId}/review`)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Review
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
