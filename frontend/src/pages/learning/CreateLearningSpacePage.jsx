import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, BookOpen, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const CreateLearningSpacePage = () => {
  const navigate = useNavigate();
  const addLearningSpace = useStore((state) => state.addLearningSpace);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Core Subject');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#6366f1');
  const [topicInput, setTopicInput] = useState('');
  const [topics, setTopics] = useState([
    { id: 't_init_1', name: 'Foundational Concepts', status: 'In Progress', masteryScore: 0 },
  ]);

  const handleAddTopic = () => {
    if (!topicInput.trim()) return;
    setTopics([...topics, { id: `t_${Date.now()}`, name: topicInput.trim(), status: 'In Progress', masteryScore: 0 }]);
    setTopicInput('');
  };

  const handleRemoveTopic = (id) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLearningSpace({
      title,
      category,
      description,
      color,
      topics,
    });
    navigate('/learning-spaces');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/learning-spaces" className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Create Learning Space</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Set up a new subject module to track progress and quizzes.</p>
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
            placeholder="e.g. Distributed Systems & Cloud Computing"
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
              <option value="Mathematics">Mathematics</option>
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
            placeholder="Brief overview of course modules and learning goals..."
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Add Initial Topics */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Sub-Topics</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="e.g. MapReduce Paradigm"
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
            />
            <button
              type="button"
              onClick={handleAddTopic}
              className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Add Topic
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {topics.map((t) => (
              <span key={t.id} className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                {t.name}
                <button type="button" onClick={() => handleRemoveTopic(t.id)} className="text-slate-400 hover:text-rose-500">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 transition-all"
        >
          Save Learning Space
        </button>
      </form>
    </div>
  );
};
