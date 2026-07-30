import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, BookOpen, CheckCircle2, AlertCircle, Award, Sparkles } from 'lucide-react';

export const SubjectAnalyticsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { learningSpaces } = useStore();

  const space = learningSpaces.find((s) => s.id === id) || learningSpaces[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/analytics" className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{space.title} Analytics</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Subject-specific accuracy, topic mastery breakdown, and quiz stats.</p>
        </div>
      </div>

      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 space-y-1">
          <p className="text-xs text-slate-400 font-semibold uppercase">Overall Mastery</p>
          <h3 className="text-2xl font-bold text-indigo-400">{space.progressPercentage}%</h3>
          <p className="text-[11px] text-slate-400">Based on topic completions & quizzes</p>
        </div>

        <div className="glass-card p-5 space-y-1">
          <p className="text-xs text-slate-400 font-semibold uppercase">Topics Completed</p>
          <h3 className="text-2xl font-bold text-emerald-400">{space.completedTopics} / {space.totalTopics}</h3>
          <p className="text-[11px] text-slate-400">{space.totalTopics - space.completedTopics} remaining topics</p>
        </div>

        <div className="glass-card p-5 space-y-1">
          <p className="text-xs text-slate-400 font-semibold uppercase">Last Studied</p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{space.lastStudied}</h3>
          <p className="text-[11px] text-slate-400">Active engagement</p>
        </div>
      </div>

      {/* Topic Mastery Breakdown */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Topic-by-Topic Mastery Level</h2>

        <div className="space-y-3">
          {space.topics?.map((topic) => (
            <div key={topic.id} className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {topic.status === 'Completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  )}
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{topic.name}</h4>
                </div>
                <span className="text-xs font-bold text-indigo-400">{topic.masteryScore}%</span>
              </div>

              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${topic.masteryScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
