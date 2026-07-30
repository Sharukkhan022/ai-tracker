import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Award, BookOpen, Sparkles } from 'lucide-react';

export const QuizResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizHistory } = useStore();

  const latestResult = quizHistory[0] || {
    score: 80,
    totalQuestions: 5,
    correctCount: 4,
    wrongCount: 1,
    accuracy: 80,
    status: 'Passed',
    timeSpentSeconds: 420,
    title: 'Transformer Architecture Quiz',
  };

  const isPassed = latestResult.score >= 70;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className={`glass-card p-8 text-center space-y-5 border-2 ${isPassed ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'}`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-xl ${
          isPassed ? 'bg-emerald-500/20 text-emerald-400 ring-4 ring-emerald-500/30' : 'bg-rose-500/20 text-rose-400 ring-4 ring-rose-500/30'
        }`}>
          <Award className="w-10 h-10" />
        </div>

        <div>
          <span className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
            isPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}>
            {latestResult.status || (isPassed ? 'Passed' : 'Needs Review')}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-3">{latestResult.score}% Score</h1>
          <p className="text-xs text-slate-400 mt-1">{latestResult.title}</p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-center">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Questions</p>
            <p className="text-base font-bold text-slate-900 dark:text-slate-100">{latestResult.totalQuestions}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-center border border-emerald-500/20">
            <p className="text-[10px] text-emerald-400 uppercase font-semibold">Correct</p>
            <p className="text-base font-bold text-emerald-400">{latestResult.correctCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 text-center border border-rose-500/20">
            <p className="text-[10px] text-rose-400 uppercase font-semibold">Wrong</p>
            <p className="text-base font-bold text-rose-400">{latestResult.wrongCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-center border border-indigo-500/20">
            <p className="text-[10px] text-indigo-400 uppercase font-semibold">Accuracy</p>
            <p className="text-base font-bold text-indigo-400">{latestResult.accuracy}%</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => navigate(`/quizzes/${id}/review`)}
            className="w-full sm:flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Review Question Explanations</span>
          </button>
          <button
            onClick={() => navigate('/recommendations')}
            className="w-full sm:flex-1 py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-semibold text-xs border border-purple-500/30 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Revision Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
