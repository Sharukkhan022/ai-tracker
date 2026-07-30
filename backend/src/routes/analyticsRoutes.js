import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// GET /api/analytics/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const spaces = await prisma.learningSpace.findMany({ include: { topics: true } });
    const attempts = await prisma.quizAttempt.findMany();

    const weeklyStudyHours = [
      { day: 'Mon', hours: 4.5, quizzes: 2 },
      { day: 'Tue', hours: 3.0, quizzes: 1 },
      { day: 'Wed', hours: 5.2, quizzes: 3 },
      { day: 'Thu', hours: 2.1, quizzes: 1 },
      { day: 'Fri', hours: 4.0, quizzes: 2 },
      { day: 'Sat', hours: 6.5, quizzes: 4 },
      { day: 'Sun', hours: 3.5, quizzes: 1 },
    ];

    const accuracyTrends = [
      { week: 'Week 1', accuracy: 68 },
      { week: 'Week 2', accuracy: 74 },
      { week: 'Week 3', accuracy: 81 },
      { week: 'Week 4', accuracy: 84 },
    ];

    return res.json({
      weeklyStudyHours,
      accuracyTrends,
      spaces,
      attemptsCount: attempts.length,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/analytics/subject/:id
router.get('/subject/:id', async (req, res) => {
  try {
    const space = await prisma.learningSpace.findUnique({
      where: { id: req.params.id },
      include: { topics: true },
    });
    if (!space) return res.status(404).json({ error: 'Space not found' });

    return res.json(space);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
