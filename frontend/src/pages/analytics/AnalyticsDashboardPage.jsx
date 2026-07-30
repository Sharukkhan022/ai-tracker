import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { BarChart3, TrendingUp, Award, BookOpen, ArrowRight, Sparkles, FileText } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';

export const AnalyticsDashboardPage = () => {
  const navigate = useNavigate();
  const { analyticsData, learningSpaces } = useStore();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            <span>Learning Analytics Command Center</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Data visualizations of study consistency, subject mastery, and accuracy progression.
          </p>
        </div>

        <button
          onClick={() => navigate('/analytics/report')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Export Progress Report</span>
        </button>
      </div>

      {/* Grid of 2 Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Weekly Study Hours Bar Chart */}
        <div className="lg:col-span-7 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Daily Study Hours (This Week)</h2>
              <p className="text-[11px] text-slate-400">Target: 25 hrs/week • Total: 28.7 hrs completed</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              +15% vs last week
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.weeklyStudyHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Accuracy Trend Line Chart */}
        <div className="lg:col-span-5 glass-card p-6 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Accuracy Progression Trend</h2>
            <p className="text-[11px] text-slate-400">Average quiz score over 4 weeks</p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.accuracyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject Mastery List */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <span>Subject Mastery Breakdown</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningSpaces.map((ls) => (
            <div
              key={ls.id}
              onClick={() => navigate(`/analytics/subject/${ls.id}`)}
              className="p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer hover:border-indigo-500/50 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">{ls.title}</h3>
                <span className="text-xs font-extrabold text-indigo-400">{ls.progressPercentage}%</span>
              </div>

              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${ls.progressPercentage}%`, backgroundColor: ls.color || '#6366f1' }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>{ls.completedTopics} of {ls.totalTopics} topics completed</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1">
                  Deep Dive <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
