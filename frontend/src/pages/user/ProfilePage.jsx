import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Edit2, Award } from 'lucide-react';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, quizHistory } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="glass-card p-6 md:p-8 space-y-6 border-indigo-500/30">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{user.name}</h1>
              <p className="text-xs text-indigo-400 font-semibold">{user.role}</p>
              <p className="text-xs text-slate-400">{user.email} • Joined {user.joinedDate}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/profile/edit')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800">
          {user.bio}
        </p>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-center border border-amber-500/20">
            <p className="text-[10px] text-amber-400 font-semibold uppercase">Daily Streak</p>
            <p className="text-lg font-extrabold text-amber-400">{user.currentStreakDays} Days</p>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-500/10 text-center border border-indigo-500/20">
            <p className="text-[10px] text-indigo-400 font-semibold uppercase">Study Hours</p>
            <p className="text-lg font-extrabold text-indigo-400">{user.completedHoursThisWeek} hrs</p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-500/10 text-center border border-purple-500/20">
            <p className="text-[10px] text-purple-400 font-semibold uppercase">Quizzes Taken</p>
            <p className="text-lg font-extrabold text-purple-400">{quizHistory.length}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-center border border-emerald-500/20">
            <p className="text-[10px] text-emerald-400 font-semibold uppercase">Avg Accuracy</p>
            <p className="text-lg font-extrabold text-emerald-400">{user.overallAccuracy}%</p>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Earned Badges & Milestones</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.badges?.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{b.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
