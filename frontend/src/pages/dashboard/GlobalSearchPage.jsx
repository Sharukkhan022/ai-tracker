import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Search, BookOpen, HelpCircle, Sparkles, Calendar, ArrowRight } from 'lucide-react';

export const GlobalSearchPage = () => {
  const navigate = useNavigate();
  const { learningSpaces, quizzes, recommendations } = useStore();
  const [query, setQuery] = useState('');

  const matchingSpaces = learningSpaces.filter(
    (s) => s.title.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase())
  );

  const matchingQuizzes = quizzes.filter(
    (q) => q.title.toLowerCase().includes(query.toLowerCase()) || q.topic.toLowerCase().includes(query.toLowerCase())
  );

  const matchingRecs = recommendations.filter(
    (r) => r.topic.toLowerCase().includes(query.toLowerCase()) || r.reason.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Search className="w-6 h-6 text-indigo-500" />
          <span>Global Content Search</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Search across Learning Spaces, AI Quizzes, Timetables, and Recommendations
        </p>
      </div>

      {/* Big Search Input */}
      <div className="relative">
        <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics (e.g. Transformers, SQL, Normalization, Graphs)..."
          className="w-full pl-13 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
        />
      </div>

      {/* Results Groups */}
      <div className="space-y-6">
        {/* Learning Spaces */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Learning Spaces ({matchingSpaces.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {matchingSpaces.map((space) => (
              <div
                key={space.id}
                onClick={() => navigate('/learning-spaces')}
                className="glass-card p-4 hover:border-indigo-500/50 cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500">
                    {space.category}
                  </span>
                  <span className="text-xs text-slate-400">{space.progressPercentage}% Completed</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{space.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{space.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quizzes */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span>AI Quizzes ({matchingQuizzes.length})</span>
          </h3>

          <div className="space-y-2">
            {matchingQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                onClick={() => navigate(`/quizzes/${quiz.id}/instructions`)}
                className="glass-card p-3.5 flex items-center justify-between hover:border-purple-500/50 cursor-pointer"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{quiz.title}</h4>
                  <p className="text-[11px] text-slate-400">{quiz.spaceTitle} • {quiz.totalQuestions} Questions</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI Recommendations ({matchingRecs.length})</span>
          </h3>

          <div className="space-y-2">
            {matchingRecs.map((rec) => (
              <div
                key={rec.id}
                onClick={() => navigate(`/recommendations/${rec.id}`)}
                className="glass-card p-3.5 flex items-center justify-between hover:border-amber-500/50 cursor-pointer"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{rec.topic}</h4>
                  <p className="text-[11px] text-slate-400">{rec.reason}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
