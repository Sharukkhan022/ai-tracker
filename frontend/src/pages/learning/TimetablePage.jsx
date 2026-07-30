import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Calendar, Plus, Clock, CheckCircle2, Trash2 } from 'lucide-react';

export const TimetablePage = () => {
  const navigate = useNavigate();
  const { schedules, toggleScheduleStatus, deleteSchedule } = useStore();
  const [selectedDay, setSelectedDay] = React.useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const daySchedules = schedules.filter((s) => s.day === selectedDay);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-indigo-500" />
            <span>Weekly Study Planner</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize daily study slots, track scheduled revision times, and mark completions.
          </p>
        </div>

        <button
          onClick={() => navigate('/timetable/new')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Session</span>
        </button>
      </div>

      {/* Day Selector Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {days.map((day) => {
          const count = schedules.filter((s) => s.day === day).length;
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-500/50'
              }`}
            >
              <span>{day}</span>
              {count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Schedule Items List */}
      <div className="space-y-4">
        {daySchedules.length === 0 ? (
          <div className="glass-card p-12 text-center text-slate-400 space-y-3">
            <Calendar className="w-10 h-10 mx-auto text-slate-600 opacity-40" />
            <p className="text-sm font-medium">No study sessions scheduled for {selectedDay}</p>
            <button
              onClick={() => navigate('/timetable/new')}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-500 font-semibold hover:underline"
            >
              <Plus className="w-4 h-4" /> Add a session now
            </button>
          </div>
        ) : (
          daySchedules.map((sch) => (
            <div
              key={sch.id}
              className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-indigo-500/40"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${sch.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{sch.spaceTitle}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      sch.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {sch.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Topic:</span> {sch.topic}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {sch.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => toggleScheduleStatus(sch.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    sch.status === 'Completed'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{sch.status === 'Completed' ? 'Mark Pending' : 'Mark Complete'}</span>
                </button>
                <button
                  onClick={() => deleteSchedule(sch.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Delete Session"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
