import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

const seedNotificationsIfEmpty = async (userId) => {
  const count = await prisma.notification.count();
  if (count === 0) {
    await prisma.notification.createMany({
      data: [
        { userId, title: 'Upcoming Study Slot', message: 'Operating Systems study session begins in 30 minutes.', time: '10 mins ago', type: 'reminder', read: false },
        { userId, title: 'AI Quiz Ready', message: 'Your customized quiz for Transformer Architectures is generated.', time: '2 hours ago', type: 'quiz', read: false },
        { userId, title: 'Weak Topic Alert', message: 'DBMS Normalization accuracy dropped below 60%. View recommendations.', time: 'Yesterday', type: 'recommendation', read: true },
      ],
    });
  }
};

// GET /api/notifications
router.get('/', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    if (user) await seedNotificationsIfEmpty(user.id);

    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(notifications);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/notifications/:id/read
router.put('/:id/read', async (req, res) => {
  try {
    const updated = await prisma.notification.update({
      where: { id: req.params.id },
      data: { read: true },
    });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/notifications
router.delete('/', async (req, res) => {
  try {
    await prisma.notification.deleteMany();
    return res.json({ success: true, message: 'Notifications cleared' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
