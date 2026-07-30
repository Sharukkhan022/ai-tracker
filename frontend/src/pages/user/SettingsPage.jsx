import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Settings, Moon, Sun, Bell, Sparkles, Save, CheckCircle2 } from 'lucide-react';

export const SettingsPage = () => {
  const { darkTheme, toggleTheme } = useStore();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [quizReminders, setQuizReminders] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-indigo-500" />
          <span>System Settings & Preferences</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize UI theme, notification alerts, and AI quiz defaults.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Preferences saved!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-card p-6 space-y-6">
        {/* Section 1: Appearance */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Appearance Theme</h2>
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-3">
              {darkTheme ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-400" />}
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {darkTheme ? 'Dark Theme Enabled' : 'Light Theme Enabled'}
                </h3>
                <p className="text-[11px] text-slate-400">Toggle system interface theme</p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Toggle Mode
            </button>
          </div>
        </div>

        {/* Section 2: Notifications */}
        <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Notifications & Alerts</h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Email Study Session Reminders</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">AI Weak Topic Recommendations Alerts</span>
              </div>
              <input
                type="checkbox"
                checked={quizReminders}
                onChange={(e) => setQuizReminders(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-indigo-600"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </form>
    </div>
  );
};
