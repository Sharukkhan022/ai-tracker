import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

const seedTimetableIfEmpty = async (userId, spaceId) => {
  const count = await prisma.schedule.count();
  if (count === 0 && spaceId) {
    await prisma.schedule.createMany({
      data: [
        { userId, spaceId, spaceTitle: 'Machine Learning', day: 'Monday', time: '09:00 AM - 10:30 AM', topic: 'Attention & Transformers', status: 'Completed' },
        { userId, spaceId, spaceTitle: 'Python DSA', day: 'Monday', time: '02:00 PM - 03:30 PM', topic: 'Dynamic Programming', status: 'Completed' },
        { userId, spaceId, spaceTitle: 'DBMS & SQL', day: 'Tuesday', time: '10:00 AM - 11:30 AM', topic: 'Relational Normalization', status: 'Completed' },
        { userId, spaceId, spaceTitle: 'Machine Learning', day: 'Wednesday', time: '09:00 AM - 10:30 AM', topic: 'Convolutional Nets', status: 'Completed' },
        { userId, spaceId, spaceTitle: 'Operating Systems', day: 'Thursday', time: '02:00 PM - 04:00 PM', topic: 'Deadlock Prevention', status: 'Upcoming' },
        { userId, spaceId, spaceTitle: 'Python DSA', day: 'Friday', time: '11:00 AM - 12:30 PM', topic: 'Graph BFS & DFS', status: 'Upcoming' },
      ],
    });
  }
};

// GET /api/timetable
router.get('/', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    const space = await prisma.learningSpace.findFirst();
    if (user && space) await seedTimetableIfEmpty(user.id, space.id);

    const schedules = await prisma.schedule.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(schedules);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/timetable
router.post('/', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    const { spaceId, spaceTitle, day, time, topic } = req.body;

    const newSchedule = await prisma.schedule.create({
      data: {
        userId: user.id,
        spaceId,
        spaceTitle,
        day,
        time,
        topic,
        status: 'Upcoming',
      },
    });

    return res.status(201).json(newSchedule);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/timetable/:id/toggle
router.put('/:id/toggle', async (req, res) => {
  try {
    const existing = await prisma.schedule.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: 'Schedule not found' });

    const updated = await prisma.schedule.update({
      where: { id: req.params.id },
      data: { status: existing.status === 'Completed' ? 'Upcoming' : 'Completed' },
    });

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/timetable/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.schedule.delete({ where: { id: req.params.id } });
    return res.json({ success: true, message: 'Session deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
