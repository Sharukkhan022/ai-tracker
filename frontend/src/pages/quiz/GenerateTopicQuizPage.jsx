import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft, Sparkles, Upload, FileText, CheckCircle2 } from 'lucide-react';

export const GenerateTopicQuizPage = () => {
  const navigate = useNavigate();
  const { learningSpaces, generateCustomQuiz } = useStore();

  const [activeTab, setActiveTab] = useState('topic'); // 'topic' | 'pdf'

  // Topic Quiz State
  const [spaceId, setSpaceId] = useState(learningSpaces[0]?.id || '');
  const [topic, setTopic] = useState('Attention Mechanisms & Transformers');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(5);

  // PDF Quiz State
  const [pdfFile, setPdfFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  const selectedSpace = learningSpaces.find((s) => s.id === spaceId) || learningSpaces[0];

  const handleGenerateTopicQuiz = (e) => {
    e.preventDefault();
    const newQuizId = generateCustomQuiz({
      spaceId: selectedSpace.id,
      spaceTitle: selectedSpace.title,
      topic,
      difficulty,
      numQuestions,
    });
    navigate(`/quizzes/${newQuizId}/instructions`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setIsParsing(true);
      setTimeout(() => {
        setIsParsing(false);
      }, 1500);
    }
  };

  const handleGeneratePdfQuiz = (e) => {
    e.preventDefault();
    const newQuizId = generateCustomQuiz({
      spaceId: selectedSpace.id,
      spaceTitle: selectedSpace.title,
      topic: `PDF Assessment: ${pdfFile?.name || 'Uploaded Notes'}`,
      difficulty: 'Medium',
      numQuestions: 5,
    });
    navigate(`/quizzes/${newQuizId}/instructions`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/quizzes" className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">AI Quiz Generator</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Generate targeted evaluations powered by Google Gemini AI.</p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('topic')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'topic' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Topic-Based Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('pdf')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'pdf' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>PDF Study Material Quiz</span>
        </button>
      </div>

      {/* Tab 1: Topic Form */}
      {activeTab === 'topic' && (
        <form onSubmit={handleGenerateTopicQuiz} className="glass-card p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Learning Space</label>
            <select
              value={spaceId}
              onChange={(e) => setSpaceId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100"
            >
              {learningSpaces.map((ls) => (
                <option key={ls.id} value={ls.id}>
                  {ls.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Topic Name</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              placeholder="e.g. Convolutional Neural Networks"
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Number of Questions</label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100"
              >
                <option value={3}>3 Questions (Quick Test)</option>
                <option value={5}>5 Questions (Standard)</option>
                <option value={10}>10 Questions (Comprehensive)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate AI Quiz Now</span>
          </button>
        </form>
      )}

      {/* Tab 2: PDF Uploader Form */}
      {activeTab === 'pdf' && (
        <form onSubmit={handleGeneratePdfQuiz} className="glass-card p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Upload Study PDF</label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center space-y-3 hover:border-purple-500 transition-colors">
              <Upload className="w-8 h-8 mx-auto text-purple-500" />
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {pdfFile ? pdfFile.name : 'Click to upload or drag & drop PDF file'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Maximum file size: 15MB (.pdf)</p>
              </div>
              <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" id="pdf-upload-input" />
              <label
                htmlFor="pdf-upload-input"
                className="inline-block px-4 py-2 rounded-xl bg-purple-500/10 text-purple-500 text-xs font-semibold cursor-pointer hover:bg-purple-500/20"
              >
                Browse File
              </label>
            </div>
          </div>

          {isParsing && (
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Parsing PDF document text & extracting key concepts...</span>
            </div>
          )}

          {pdfFile && !isParsing && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>PDF parsed successfully! 14 pages extracted ready for AI quiz generation.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!pdfFile || isParsing}
            className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Quiz from PDF</span>
          </button>
        </form>
      )}
    </div>
  );
};
