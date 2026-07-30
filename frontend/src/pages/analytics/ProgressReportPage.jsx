import React from 'react';
import { useStore } from '../../store/useStore';
import { FileText, Printer, Download, Award, CheckCircle2, Flame, Sparkles } from 'lucide-react';

export const ProgressReportPage = () => {
  const { user, learningSpaces, quizHistory } = useStore();

  const totalQuizzes = quizHistory.length;
  const avgScore = Math.round(
    quizHistory.reduce((acc, q) => acc + q.score, 0) / (quizHistory.length || 1)
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-indigo-500" />
            <span>Academic Progress Report</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comprehensive evaluation report for academic guide review.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors self-start"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Printable Report Document Card */}
      <div className="glass-card p-8 space-y-6 border-slate-700">
        {/* Student Profile Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{user.name}</h2>
            <p className="text-xs text-slate-400">{user.role} • {user.email}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Report Date: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold gradient-text">LearnTrack AI</span>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Progress Verified</p>
          </div>
        </div>

        {/* Executive Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Study Streak</p>
            <p className="text-xl font-bold text-amber-400">{user.currentStreakDays} Days</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Weekly Hours</p>
            <p className="text-xl font-bold text-indigo-400">{user.completedHoursThisWeek} Hours</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Quizzes Passed</p>
            <p className="text-xl font-bold text-emerald-400">{totalQuizzes}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 text-center">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Avg Accuracy</p>
            <p className="text-xl font-bold text-purple-400">{avgScore}%</p>
          </div>
        </div>

        {/* Subject-Wise Summary Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Subject Performance Summary</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase">
                  <th className="py-2.5 px-3">Subject Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Topics Completed</th>
                  <th className="py-2.5 px-3 text-right">Mastery Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {learningSpaces.map((space) => (
                  <tr key={space.id} className="text-slate-700 dark:text-slate-300">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">{space.title}</td>
                    <td className="py-3 px-3">{space.category}</td>
                    <td className="py-3 px-3">{space.completedTopics} / {space.totalTopics}</td>
                    <td className="py-3 px-3 text-right font-bold text-indigo-400">{space.progressPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
