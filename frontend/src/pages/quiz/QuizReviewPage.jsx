import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export const QuizReviewPage = () => {
  const { id } = useParams();
  const { quizzes, quizAnswers } = useStore();

  const quiz = quizzes.find((q) => q.id === id) || quizzes[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/quizzes/history" className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Detailed Answer Review</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Review correct options and AI conceptual explanations.</p>
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((q, idx) => {
          const userAnswer = quizAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`glass-card p-6 space-y-4 border-l-4 ${
                isCorrect ? 'border-l-emerald-500' : 'border-l-rose-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Question {idx + 1}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  isCorrect ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{q.question}</h3>

              {/* Options Breakdown */}
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isUserSelection = userAnswer === optIdx;
                  const isRightAnswer = q.correctAnswer === optIdx;

                  let optionStyle = 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300';
                  if (isRightAnswer) {
                    optionStyle = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 font-bold';
                  } else if (isUserSelection && !isRightAnswer) {
                    optionStyle = 'bg-rose-500/15 border-rose-500/50 text-rose-400 font-bold';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </div>
                      {isRightAnswer && <span className="text-[10px] text-emerald-400 font-extrabold uppercase">Correct Answer</span>}
                      {isUserSelection && !isRightAnswer && <span className="text-[10px] text-rose-400 font-extrabold uppercase">Your Choice</span>}
                    </div>
                  );
                })}
              </div>

              {/* AI Explanation Box */}
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Gemini AI Explanation</span>
                </div>
                <p className="leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
