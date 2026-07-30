import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { BookOpen, Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const LearningSpacesPage = () => {
  const navigate = useNavigate();
  const { learningSpaces, deleteLearningSpace } = useStore();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-indigo-500" />
            <span>Learning Spaces</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize subjects, categorize topics, track learning completion, and trigger AI quizzes.
          </p>
        </div>

        <button
          onClick={() => navigate('/learning-spaces/new')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Learning Space</span>
        </button>
      </div>

      {/* Grid of Learning Spaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningSpaces.map((space) => (
          <div key={space.id} className="glass-card p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] font-bold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: space.color || '#6366f1' }}
                >
                  {space.category}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate(`/learning-spaces/${space.id}/edit`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Edit Space"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteLearningSpace(space.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Delete Space"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{space.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {space.description}
                </p>
              </div>

              {/* Topics Pills */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Key Topics</p>
                <div className="flex flex-wrap gap-1.5">
                  {space.topics?.map((topic) => (
                    <span
                      key={topic.id}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 ${
                        topic.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : topic.status === 'Needs Review'
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {topic.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {topic.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar & Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Mastery Progress</span>
                <span className="text-indigo-500">{space.progressPercentage}%</span>
              </div>

              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${space.progressPercentage}%`,
                    backgroundColor: space.color || '#6366f1',
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400">Last studied: {space.lastStudied}</span>
                <button
                  onClick={() => navigate('/quizzes/generate')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Quiz</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
