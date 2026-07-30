import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, Trash2 } from 'lucide-react';

export const EditLearningSpacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { learningSpaces, updateLearningSpace, deleteLearningSpace } = useStore();

  const space = learningSpaces.find((s) => s.id === id) || learningSpaces[0];

  const [title, setTitle] = useState(space?.title || '');
  const [category, setCategory] = useState(space?.category || 'Core Subject');
  const [description, setDescription] = useState(space?.description || '');
  const [color, setColor] = useState(space?.color || '#6366f1');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLearningSpace(space.id, {
      title,
      category,
      description,
      color,
    });
    navigate('/learning-spaces');
  };

  const handleDelete = () => {
    deleteLearningSpace(space.id);
    navigate('/learning-spaces');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/learning-spaces" className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Edit Learning Space</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Modify space details, category, or remove subject.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Space Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Core Subject">Core Subject</option>
              <option value="Core AI">Core AI</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Backend & Systems">Backend & Systems</option>
              <option value="Systems Architecture">Systems Architecture</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Color Theme</label>
            <div className="flex items-center gap-3 py-1">
              {['#6366f1', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#f43f5e'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${color === c ? 'scale-110 border-white ring-2 ring-indigo-500' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 pt-3">
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/25 transition-all"
          >
            Update Space
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-semibold text-xs border border-rose-500/20 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </form>
    </div>
  );
};
