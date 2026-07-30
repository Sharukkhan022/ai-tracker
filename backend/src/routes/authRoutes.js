import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'learntrack_jwt_secret_key_2026_super_secure';

// Seed demo user helper
const getOrCreateDemoUser = async () => {
  let user = await prisma.user.findFirst();
  if (!user) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    user = await prisma.user.create({
      data: {
        id: 'usr_mock_101',
        name: 'Alex Rivera',
        email: 'alex.rivera@university.edu',
        password: hashedPassword,
        role: 'Computer Science Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Focused on Machine Learning, Database Architecture & Algorithmic Problem Solving.',
        targetHoursPerWeek: 25.0,
        completedHoursThisWeek: 18.5,
        currentStreakDays: 7,
        overallAccuracy: 84,
      },
    });
  }
  return user;
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password || 'password123', 10);
    const user = await prisma.user.create({
      data: {
        name: name || 'Alex Rivera',
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await getOrCreateDemoUser();
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const user = await getOrCreateDemoUser();
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/auth/profile
router.put('/profile', async (req, res) => {
  try {
    const user = await getOrCreateDemoUser();
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: req.body,
    });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
