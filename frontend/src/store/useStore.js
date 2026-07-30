import { create } from 'zustand';
import {
  mockUser,
  mockLearningSpaces,
  mockTimetableSchedules,
  mockQuizzes,
  mockQuizHistory,
  mockRecommendations,
  mockNotifications,
  mockAnalyticsData,
} from '../mock/mockData';

export const useStore = create((set, get) => ({
  // Auth State
  user: mockUser,
  isAuthenticated: true,
  login: (_email, _password) => {
    set({ isAuthenticated: true });
    return true;
  },
  logout: () => set({ isAuthenticated: false }),
  updateProfile: (updatedData) =>
    set((state) => ({
      user: { ...state.user, ...updatedData },
    })),

  // Theme & Preferences
  darkTheme: true,
  toggleTheme: () => set((state) => ({ darkTheme: !state.darkTheme })),

  // Learning Spaces State
  learningSpaces: mockLearningSpaces,
  addLearningSpace: (newSpace) =>
    set((state) => ({
      learningSpaces: [
        ...state.learningSpaces,
        {
          ...newSpace,
          id: `ls_${Date.now()}`,
          totalTopics: newSpace.topics ? newSpace.topics.length : 0,
          completedTopics: 0,
          progressPercentage: 0,
          lastStudied: 'Just created',
        },
      ],
    })),
  updateLearningSpace: (id, updatedFields) =>
    set((state) => ({
      learningSpaces: state.learningSpaces.map((ls) =>
        ls.id === id ? { ...ls, ...updatedFields } : ls
      ),
    })),
  deleteLearningSpace: (id) =>
    set((state) => ({
      learningSpaces: state.learningSpaces.filter((ls) => ls.id !== id),
    })),

  // Timetable Schedules
  schedules: mockTimetableSchedules,
  addSchedule: (newSch) =>
    set((state) => ({
      schedules: [
        ...state.schedules,
        { ...newSch, id: `sch_${Date.now()}`, status: 'Upcoming' },
      ],
    })),
  deleteSchedule: (id) =>
    set((state) => ({
      schedules: state.schedules.filter((s) => s.id !== id),
    })),
  toggleScheduleStatus: (id) =>
    set((state) => ({
      schedules: state.schedules.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'Completed' ? 'Upcoming' : 'Completed' }
          : s
      ),
    })),

  // Quiz Management
  quizzes: mockQuizzes,
  activeQuiz: null,
  quizAnswers: {},
  quizTimeRemaining: 0,
  quizHistory: mockQuizHistory,

  startQuiz: (quizId) => {
    const quiz = get().quizzes.find((q) => q.id === quizId) || get().quizzes[0];
    set({
      activeQuiz: quiz,
      quizAnswers: {},
      quizTimeRemaining: (quiz.durationMinutes || 15) * 60,
    });
  },

  setQuizAnswer: (questionId, selectedOptionIndex) =>
    set((state) => ({
      quizAnswers: { ...state.quizAnswers, [questionId]: selectedOptionIndex },
    })),

  submitActiveQuiz: () => {
    const { activeQuiz, quizAnswers, quizHistory } = get();
    if (!activeQuiz) return null;

    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = activeQuiz.questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const newAttempt = {
      attemptId: `att_${Date.now()}`,
      quizId: activeQuiz.id,
      title: activeQuiz.title,
      spaceTitle: activeQuiz.spaceTitle,
      score,
      totalQuestions,
      correctCount,
      wrongCount: totalQuestions - correctCount,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      timeSpentSeconds: (activeQuiz.durationMinutes || 15) * 60 - get().quizTimeRemaining,
      accuracy: score,
      status: score >= 70 ? 'Passed' : 'Needs Improvement',
    };

    set({
      quizHistory: [newAttempt, ...quizHistory],
      activeQuiz: null,
    });

    return newAttempt;
  },

  generateCustomQuiz: (quizConfig) => {
    const newQuiz = {
      id: `qz_${Date.now()}`,
      title: `${quizConfig.topic} (${quizConfig.difficulty || 'Custom'}) Quiz`,
      spaceId: quizConfig.spaceId || 'ls_1',
      spaceTitle: quizConfig.spaceTitle || 'Machine Learning',
      topic: quizConfig.topic,
      difficulty: quizConfig.difficulty || 'Medium',
      durationMinutes: 10,
      totalQuestions: 3,
      questions: [
        {
          id: `gen_q1_${Date.now()}`,
          question: `Which fundamental principle applies to ${quizConfig.topic}?`,
          options: [
            `Optimizing parameter weights using loss gradients`,
            `Static file compilation without runtime interpretation`,
            `Unbounded memory allocation in stack frames`,
            `Enforcing synchronous blocking calls on UI threads`,
          ],
          correctAnswer: 0,
          explanation: `In ${quizConfig.topic}, loss gradient optimization is the key mechanism for convergence.`,
        },
        {
          id: `gen_q2_${Date.now()}`,
          question: `What is a common edge case or vulnerability in ${quizConfig.topic}?`,
          options: [
            `Buffer overflow in static memory`,
            `Vanishing or exploding gradients during backpropagation`,
            `Unregistered route handlers in client routers`,
            `Syntax parsing errors in HTML markup`,
          ],
          correctAnswer: 1,
          explanation: `Gradient instability is a classic challenge when training deep models or complex algorithms in this domain.`,
        },
        {
          id: `gen_q3_${Date.now()}`,
          question: `How can performance be improved for ${quizConfig.topic}?`,
          options: [
            `By increasing batch size and applying learning rate decay`,
            `By removing GPU acceleration`,
            `By disabling input data normalization`,
            `By duplicating database indices`,
          ],
          correctAnswer: 0,
          explanation: `Batch tuning and learning rate schedules improve convergence efficiency and stability.`,
        },
      ],
    };

    set((state) => ({
      quizzes: [newQuiz, ...state.quizzes],
    }));

    return newQuiz.id;
  },

  // Analytics & AI Recommendations
  analyticsData: mockAnalyticsData,
  recommendations: mockRecommendations,

  // Notifications
  notifications: mockNotifications,
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));
