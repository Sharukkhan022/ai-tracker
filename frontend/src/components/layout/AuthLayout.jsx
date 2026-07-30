import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sparkles, Brain, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-950 text-slate-100 font-sans">
      {/* Left Branding Hero Section */}
      <div className="lg:col-span-6 xl:col-span-7 relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-r border-slate-800/80 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              LearnTrack <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI</span>
            </h1>
            <p className="text-xs text-slate-400">Intelligent Learning & Assessment Engine</p>
          </div>
        </div>

        {/* Center Hero Content */}
        <div className="relative z-10 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Shift from tracking study hours to measuring real understanding</span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Master your subjects with <span className="gradient-text">AI-generated assessments</span>
          </h2>

          <p className="text-slate-300 text-base leading-relaxed">
            Organize Learning Spaces, automate daily study timetables, generate topic and PDF quizzes with Google Gemini AI, and pinpoint weak concepts with tailored recommendations.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
                <CheckCircle2 className="w-4 h-4" /> Adaptive AI Quizzes
              </div>
              <p className="text-xs text-slate-400">Instant quiz generation from topics or uploaded PDF study materials.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-1">
                <Award className="w-4 h-4" /> Visual Progress Analytics
              </div>
              <p className="text-xs text-slate-400">Deep accuracy metrics, daily study trends, and subject mastery radars.</p>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between border-t border-slate-800/80 pt-6">
          <span>&copy; {new Date().getFullYear()} LearnTrack AI Project</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure JWT & Encrypted Storage</span>
        </div>
      </div>

      {/* Right Form Card Section */}
      <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo Branding (visible on small screens) */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">LearnTrack AI</span>
          </div>

          {/* Render Auth Page content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
