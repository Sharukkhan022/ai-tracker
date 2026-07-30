import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, ShieldAlert, Play } from 'lucide-react';

export const QuizInstructionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes, startQuiz } = useStore();

  const quiz = quizzes.find((q) => q.id === id) || quizzes[0];

  const handleStart = () => {
    startQuiz(quiz.id);
    navigate(`/quizzes/${quiz.id}/attempt`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/quizzes" className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Quiz Briefing & Rules</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Review assessment rules before beginning your timed attempt.</p>
        </div>
      </div>

      {/* Overview Card */}
      <div className="glass-card p-6 space-y-5 border-indigo-500/30">
        <div>
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500">
            {quiz.difficulty} Difficulty
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">{quiz.title}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{quiz.spaceTitle} • Topic: {quiz.topic}</p>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Questions</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{quiz.totalQuestions || 5}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Duration</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{quiz.durationMinutes || 15} Mins</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Pass Mark</p>
            <p className="text-lg font-bold text-emerald-500">70%</p>
          </div>
        </div>

        {/* Rules Bullet List */}
        <div className="space-y-3 pt-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Instructions & Assessment Policy</span>
          </h3>

          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside leading-relaxed">
            <li>The countdown timer starts immediately once you click <strong>Start Quiz Attempt</strong>.</li>
            <li>Each question has a single correct answer option.</li>
            <li>You can navigate back and forth between questions using the question navigator grid.</li>
            <li>Upon submission, Gemini AI generates a diagnostic breakdown with detailed answer explanations.</li>
          </ul>
        </div>

        <button
          onClick={handleStart}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Quiz Attempt Now</span>
        </button>
      </div>
    </div>
  );
};
