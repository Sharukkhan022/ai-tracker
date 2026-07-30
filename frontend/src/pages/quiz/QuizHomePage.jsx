import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { HelpCircle, Sparkles, FileText, History, ArrowRight } from 'lucide-react';

export const QuizHomePage = () => {
  const navigate = useNavigate();
  const { quizzes } = useStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-purple-500" />
            <span>AI Quiz & Assessment Hub</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Test your conceptual understanding with AI-generated topic quizzes and PDF study material evaluations.
          </p>
        </div>

        <button
          onClick={() => navigate('/quizzes/history')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <History className="w-4 h-4" />
          <span>View Quiz History</span>
        </button>
      </div>

      {/* 2 Big Quiz Creation Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mode 1: Topic-Based AI Quiz */}
        <div className="glass-card p-6 border-indigo-500/30 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Topic-Based Quiz Generator</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Select any topic from your Learning Spaces. Gemini AI automatically crafts multiple-choice questions with customized difficulty levels.
            </p>
          </div>

          <button
            onClick={() => navigate('/quizzes/generate')}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Generate Topic Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mode 2: PDF Study Material Quiz */}
        <div className="glass-card p-6 border-purple-500/30 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">PDF Study Material Quiz</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload textbook PDFs, lecture slides, or study notes. AI parses document text to test your specific reading material.
            </p>
          </div>

          <button
            onClick={() => navigate('/quizzes/generate')}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Upload PDF & Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Available Quizzes Ready for Attempt */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Available Practice Quizzes</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="glass-card p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500">
                    {quiz.difficulty}
                  </span>
                  <span className="text-xs text-slate-400">{quiz.durationMinutes} mins</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">{quiz.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{quiz.spaceTitle}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-400">{quiz.totalQuestions} Questions</span>
                <button
                  onClick={() => navigate(`/quizzes/${quiz.id}/instructions`)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Start Attempt</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
