import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  BookOpen,
  Calendar,
  HelpCircle,
  Sparkles,
  Plus,
  ArrowRight,
  Clock,
  Award,
  Zap,
} from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, learningSpaces, schedules, quizHistory, recommendations } = useStore();

  const totalSpaces = learningSpaces.length;
  const todaySchedules = schedules.filter((s) => s.day === 'Monday' || s.status === 'Upcoming');
  const completedQuizzes = quizHistory.length;
  const avgAccuracy = Math.round(
    quizHistory.reduce((acc, q) => acc + q.accuracy, 0) / (quizHistory.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* Welcome Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 md:p-10 text-white border border-indigo-500/30 shadow-2xl">
        <div className="absolute -right-12 -top-12 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute left-1/3 -bottom-12 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold backdrop-blur-md">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>AI Progress Tracker Engine Active</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>! 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              You have completed <span className="font-bold text-white">{user?.completedHoursThisWeek || 18.5} hours</span> of study this week. You're on track to hit your target!
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/quizzes/generate')}
              className="shimmer-btn px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Quiz</span>
            </button>
            <button
              onClick={() => navigate('/learning-spaces/new')}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all backdrop-blur-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Space</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 flex items-center gap-4 hover:glow-border-indigo">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Learning Spaces</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{totalSpaces}</h3>
            <p className="text-[11px] text-emerald-400 font-bold mt-0.5">4 active subjects</p>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4 hover:glow-border-emerald">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-inner">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Today's Sessions</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{todaySchedules.length}</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">2 completed, 1 pending</p>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4 hover:glow-border-purple">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shadow-inner">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Quizzes Attempted</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{completedQuizzes}</h3>
            <p className="text-[11px] text-indigo-400 font-bold mt-0.5">+3 this week</p>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-inner">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Average Accuracy</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{avgAccuracy}%</h3>
            <p className="text-[11px] text-emerald-400 font-bold mt-0.5">+5% improvement</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Schedule & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Timetable */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>Today's Study Plan</span>
              </h2>
              <Link to="/timetable" className="text-xs text-indigo-400 hover:underline font-bold flex items-center gap-1">
                View Full Timetable <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {schedules.slice(0, 4).map((sch) => (
                <div
                  key={sch.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl ${sch.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-indigo-500/15 text-indigo-400'}`}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{sch.spaceTitle}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{sch.topic} • {sch.time}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                    sch.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}>
                    {sch.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Quiz Results */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-500" />
                <span>Recent Quiz Attempts</span>
              </h2>
              <Link to="/quizzes/history" className="text-xs text-indigo-400 hover:underline font-bold flex items-center gap-1">
                All History <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {quizHistory.slice(0, 3).map((qz) => (
                <div key={qz.attemptId} className="flex items-center justify-between p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-purple-500/40 transition-all">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{qz.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{qz.spaceTitle} • {qz.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-extrabold ${qz.score >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {qz.score}% Score
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{qz.correctCount}/{qz.totalQuestions} Correct</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Recommendations Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 space-y-4 border-indigo-500/30">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span>AI Recommended Revision</span>
              </h2>
              <Link to="/recommendations" className="text-xs text-indigo-400 hover:underline font-bold">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 2).map((rec) => (
                <div key={rec.id} className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      {rec.priority} Priority
                    </span>
                    <span className="text-xs font-bold text-slate-400">{rec.currentMastery}% Mastery</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{rec.topic}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{rec.reason}</p>
                  <button
                    onClick={() => navigate(`/recommendations/${rec.id}`)}
                    className="w-full mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View AI Study Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
