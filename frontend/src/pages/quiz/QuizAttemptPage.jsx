import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Clock, ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export const QuizAttemptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeQuiz, quizAnswers, setQuizAnswer, submitActiveQuiz, quizzes } = useStore();

  const currentQuiz = activeQuiz || quizzes.find((q) => q.id === id) || quizzes[0];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState((currentQuiz.durationMinutes || 15) * 60);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleFinish = useCallback(() => {
    submitActiveQuiz();
    navigate(`/quizzes/${currentQuiz.id}/result`);
  }, [submitActiveQuiz, navigate, currentQuiz.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleFinish]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const q = currentQuiz.questions[currentIdx];
  const answeredCount = Object.keys(quizAnswers).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Floating Timer Bar */}
      <div className="glass-card p-4 flex items-center justify-between border-indigo-500/40">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attempting Quiz</h2>
          <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate max-w-xs sm:max-w-md">
            {currentQuiz.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold ${
            timeLeft < 120 ? 'bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/30' : 'bg-slate-100 dark:bg-slate-800 text-indigo-400'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Submit Quiz
          </button>
        </div>
      </div>

      {/* Main Grid: Navigator Grid + Question Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Question Navigator Side Panel */}
        <div className="lg:col-span-4 order-2 lg:order-1 glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Questions Navigator</h3>
            <span className="text-xs text-indigo-400 font-semibold">{answeredCount}/{currentQuiz.questions.length} Answered</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {currentQuiz.questions.map((item, idx) => {
              const isAnswered = quizAnswers[item.id] !== undefined;
              const isCurrent = currentIdx === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-10 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'ring-2 ring-indigo-500 bg-indigo-600 text-white shadow-md'
                      : isAnswered
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question & Options Card */}
        <div className="lg:col-span-8 order-1 lg:order-2 glass-card p-6 md:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                Question {currentIdx + 1} of {currentQuiz.questions.length}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {q.question}
            </h2>

            {/* 4 Answer Options */}
            <div className="space-y-3">
              {q.options.map((opt, optIdx) => {
                const isSelected = quizAnswers[q.id] === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() => setQuizAnswer(q.id, optIdx)}
                    className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300 shadow-md ring-1 ring-indigo-500'
                        : 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl text-xs font-bold flex items-center justify-center ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {currentIdx < currentQuiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx((prev) => Math.min(currentQuiz.questions.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/25"
              >
                Submit Attempt <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Submit Quiz Attempt?</h3>
            <p className="text-xs text-slate-400">
              You have answered {answeredCount} out of {currentQuiz.questions.length} questions. Are you sure you want to finish?
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Continue Quiz
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
