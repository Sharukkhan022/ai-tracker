import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// Helper to seed spaces if empty
const seedSpacesIfEmpty = async (userId) => {
  const count = await prisma.learningSpace.count();
  if (count === 0) {
    await prisma.learningSpace.create({
      data: {
        userId,
        title: 'Machine Learning & Neural Networks',
        category: 'Core AI',
        color: '#6366f1',
        description: 'Supervised learning, deep neural nets, loss functions, optimization, and transformer architectures.',
        totalTopics: 4,
        completedTopics: 2,
        progressPercentage: 75,
        lastStudied: '2 hours ago',
        topics: {
          create: [
            { name: 'Gradient Descent & Optimization', status: 'Completed', masteryScore: 92 },
            { name: 'Convolutional Neural Networks (CNN)', status: 'Completed', masteryScore: 88 },
            { name: 'Recurrent Neural Networks & LSTMs', status: 'In Progress', masteryScore: 74 },
            { name: 'Attention Mechanisms & Transformers', status: 'Needs Review', masteryScore: 58 },
          ],
        },
      },
    });

    await prisma.learningSpace.create({
      data: {
        userId,
        title: 'Python Data Structures & Algorithms',
        category: 'Computer Science',
        color: '#10b981',
        description: 'Mastering arrays, trees, dynamic programming, graph algorithms, and Big-O notation.',
        totalTopics: 4,
        completedTopics: 3,
        progressPercentage: 86,
        lastStudied: 'Yesterday',
        topics: {
          create: [
            { name: 'Binary Search Trees & Heaps', status: 'Completed', masteryScore: 95 },
            { name: 'Dynamic Programming Patterns', status: 'Completed', masteryScore: 82 },
            { name: 'Graph Traversal (BFS / DFS)', status: 'Completed', masteryScore: 90 },
            { name: 'Trie Data Structure', status: 'In Progress', masteryScore: 68 },
          ],
        },
      },
    });

    await prisma.learningSpace.create({
      data: {
        userId,
        title: 'Database Management Systems (DBMS)',
        category: 'Backend & Systems',
        color: '#3b82f6',
        description: 'Relational algebra, SQL queries, B-Trees, normalization (3NF/BCNF), and ACID transactions.',
        totalTopics: 4,
        completedTopics: 2,
        progressPercentage: 50,
        lastStudied: '3 days ago',
        topics: {
          create: [
            { name: 'Relational Normalization & Functional Dependencies', status: 'Needs Review', masteryScore: 52 },
            { name: 'B-Tree & Hash Indexing', status: 'In Progress', masteryScore: 64 },
            { name: 'ACID Properties & Transaction Isolation', status: 'Completed', masteryScore: 88 },
            { name: 'Complex SQL Joins & Subqueries', status: 'Completed', masteryScore: 94 },
          ],
        },
      },
    });
  }
};

// GET /api/spaces
router.get('/', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    if (user) await seedSpacesIfEmpty(user.id);

    const spaces = await prisma.learningSpace.findMany({
      include: { topics: true },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(spaces);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/spaces
router.post('/', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    const { title, category, description, color, topics } = req.body;

    const newSpace = await prisma.learningSpace.create({
      data: {
        userId: user.id,
        title,
        category: category || 'Core Subject',
        description,
        color: color || '#6366f1',
        totalTopics: topics ? topics.length : 0,
        completedTopics: 0,
        progressPercentage: 0,
        topics: {
          create: topics ? topics.map((t) => ({ name: t.name || t, status: 'In Progress', masteryScore: 50 })) : [],
        },
      },
      include: { topics: true },
    });

    return res.status(201).json(newSpace);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/spaces/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, category, description, color } = req.body;
    const updated = await prisma.learningSpace.update({
      where: { id: req.params.id },
      data: { title, category, description, color },
      include: { topics: true },
    });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/spaces/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.learningSpace.delete({ where: { id: req.params.id } });
    return res.json({ success: true, message: 'Learning Space deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
