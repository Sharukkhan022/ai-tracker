import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout } from './components/layout/AuthLayout';
import { AppLayout } from './components/layout/AppLayout';

// Module 1: Auth
import { SplashScreen } from './pages/auth/SplashScreen';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Module 2: Dashboard
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';
import { GlobalSearchPage } from './pages/dashboard/GlobalSearchPage';

// Module 3: Learning Management
import { LearningSpacesPage } from './pages/learning/LearningSpacesPage';
import { CreateLearningSpacePage } from './pages/learning/CreateLearningSpacePage';
import { EditLearningSpacePage } from './pages/learning/EditLearningSpacePage';
import { TimetablePage } from './pages/learning/TimetablePage';
import { AddSchedulePage } from './pages/learning/AddSchedulePage';

// Module 4: Quiz & Assessment
import { QuizHomePage } from './pages/quiz/QuizHomePage';
import { GenerateTopicQuizPage } from './pages/quiz/GenerateTopicQuizPage';
import { QuizInstructionsPage } from './pages/quiz/QuizInstructionsPage';
import { QuizAttemptPage } from './pages/quiz/QuizAttemptPage';
import { QuizResultPage } from './pages/quiz/QuizResultPage';
import { QuizReviewPage } from './pages/quiz/QuizReviewPage';
import { QuizHistoryPage } from './pages/quiz/QuizHistoryPage';

// Module 5: Analytics
import { AnalyticsDashboardPage } from './pages/analytics/AnalyticsDashboardPage';
import { SubjectAnalyticsPage } from './pages/analytics/SubjectAnalyticsPage';
import { ProgressReportPage } from './pages/analytics/ProgressReportPage';

// Module 6: AI Recommendations
import { RecommendationsPage } from './pages/recommendations/RecommendationsPage';
import { RecommendationDetailsPage } from './pages/recommendations/RecommendationDetailsPage';

// Module 7: User
import { ProfilePage } from './pages/user/ProfilePage';
import { EditProfilePage } from './pages/user/EditProfilePage';
import { SettingsPage } from './pages/user/SettingsPage';

// Module 8: System
import { LoadingScreen } from './pages/system/LoadingScreen';
import { NotFoundPage } from './pages/system/NotFoundPage';
import { ComingSoonPage } from './pages/system/ComingSoonPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash Screen */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/splash" element={<SplashScreen />} />

        {/* Auth Module (4 Pages) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Main Application Shell (26 Pages) */}
        <Route element={<AppLayout />}>
          {/* Module 2: Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/search" element={<GlobalSearchPage />} />

          {/* Module 3: Learning Management */}
          <Route path="/learning-spaces" element={<LearningSpacesPage />} />
          <Route path="/learning-spaces/new" element={<CreateLearningSpacePage />} />
          <Route path="/learning-spaces/:id/edit" element={<EditLearningSpacePage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/timetable/new" element={<AddSchedulePage />} />

          {/* Module 4: Quiz & Assessment */}
          <Route path="/quizzes" element={<QuizHomePage />} />
          <Route path="/quizzes/generate" element={<GenerateTopicQuizPage />} />
          <Route path="/quizzes/history" element={<QuizHistoryPage />} />
          <Route path="/quizzes/:id/instructions" element={<QuizInstructionsPage />} />
          <Route path="/quizzes/:id/attempt" element={<QuizAttemptPage />} />
          <Route path="/quizzes/:id/result" element={<QuizResultPage />} />
          <Route path="/quizzes/:id/review" element={<QuizReviewPage />} />

          {/* Module 5: Analytics */}
          <Route path="/analytics" element={<AnalyticsDashboardPage />} />
          <Route path="/analytics/subject/:id" element={<SubjectAnalyticsPage />} />
          <Route path="/analytics/report" element={<ProgressReportPage />} />

          {/* Module 6: AI Recommendations */}
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/recommendations/:id" element={<RecommendationDetailsPage />} />

          {/* Module 7: User */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Module 8: System Pages */}
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
