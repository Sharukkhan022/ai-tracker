import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  Brain,
  LayoutDashboard,
  BookOpen,
  Calendar,
  HelpCircle,
  BarChart3,
  Sparkles,
  User,
  Settings,
  Bell,
  Search,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Flame,
  CheckCircle,
} from 'lucide-react';

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, darkTheme, toggleTheme, logout, notifications } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Learning Spaces', path: '/learning-spaces', icon: BookOpen },
    { name: 'Timetable', path: '/timetable', icon: Calendar },
    { name: 'Quizzes & Tests', path: '/quizzes', icon: HelpCircle },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'AI Recommendations', path: '/recommendations', icon: Sparkles },
    { name: 'User Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkTheme ? 'dark bg-slate-950 text-slate-100' : 'light bg-slate-50 text-slate-900'}`}>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-colors shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Left Brand & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <NavLink to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-all">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-lg tracking-tight gradient-text">
                  LearnTrack AI
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Intelligent Progress Engine</p>
              </div>
            </NavLink>
          </div>

          {/* Center Quick Search Trigger */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <button
              onClick={() => navigate('/search')}
              className="w-full flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-indigo-500/50 transition-all shadow-inner"
            >
              <Search className="w-4 h-4 text-indigo-400" />
              <span>Search spaces, topic quizzes, or recommendations...</span>
              <kbd className="ml-auto px-2 py-0.5 text-[10px] rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono shadow-sm">⌘K</kbd>
            </button>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Streak Counter Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-sm">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-bounce" />
              <span>{user?.currentStreakDays || 7}d Streak</span>
            </div>

            {/* Global Search Icon Button (Mobile) */}
            <button
              onClick={() => navigate('/search')}
              className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2.5 rounded-2xl text-slate-400 hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-slate-950 animate-pulse" />
              )}
            </button>

            {/* Dark Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              title={darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkTheme ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

            {/* User Avatar Menu Link */}
            <NavLink
              to="/profile"
              className="flex items-center gap-2.5 pl-1 pr-2.5 py-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-md"
              />
              <span className="hidden xl:block text-xs font-bold text-slate-700 dark:text-slate-200">
                {user?.name?.split(' ')[0]}
              </span>
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Body Container (Sidebar + Content Area) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-md lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-300 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Nav Items List */}
          <div className="p-4 space-y-1.5 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Core Modules
            </div>

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                    }`
                  }
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-80" />}
                </NavLink>
              );
            })}
          </div>

          {/* Sidebar Footer User Card */}
          <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                AI
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-200">Gemini 1.5 Model</p>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Active & Synced
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors border border-rose-200 dark:border-rose-900/40"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
