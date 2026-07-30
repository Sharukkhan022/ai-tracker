import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

const seedRecommendationsIfEmpty = async (userId, spaceId) => {
  const count = await prisma.recommendation.count();
  if (count === 0 && spaceId) {
    await prisma.recommendation.create({
      data: {
        userId,
        spaceId,
        spaceTitle: 'Database Management Systems (DBMS)',
        topic: 'Relational Normalization & Functional Dependencies',
        priority: 'High',
        currentMastery: 52,
        reason: 'Scored 33% on recent DBMS quiz. Failed BCNF vs 3NF questions.',
        suggestedActionsJson: JSON.stringify([
          'Review 3NF vs BCNF transitive dependency definitions.',
          'Solve 5 practice problems on candidate key identification.',
          'Attempt AI Revision Quiz on Functional Dependencies.',
        ]),
      },
    });

    await prisma.recommendation.create({
      data: {
        userId,
        spaceId,
        spaceTitle: 'Machine Learning & Neural Networks',
        topic: 'Attention Mechanisms & Transformers',
        priority: 'Medium',
        currentMastery: 58,
        reason: 'Missed questions regarding Positional Encoding and Multi-Head projections.',
        suggestedActionsJson: JSON.stringify([
          'Read "Attention is All You Need" section on Positional Embeddings.',
          'Visualize Multi-Head projections using interactive matrix diagrams.',
        ]),
      },
    });
  }
};

// GET /api/recommendations
router.get('/', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    const space = await prisma.learningSpace.findFirst();
    if (user && space) await seedRecommendationsIfEmpty(user.id, space.id);

    const recs = await prisma.recommendation.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const formatted = recs.map((r) => ({
      ...r,
      suggestedActions: JSON.parse(r.suggestedActionsJson || '[]'),
    }));

    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/recommendations/:id
router.get('/:id', async (req, res) => {
  try {
    const rec = await prisma.recommendation.findUnique({
      where: { id: req.params.id },
    });
    if (!rec) return res.status(404).json({ error: 'Recommendation not found' });

    const formatted = {
      ...rec,
      suggestedActions: JSON.parse(rec.suggestedActionsJson || '[]'),
    };

    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
