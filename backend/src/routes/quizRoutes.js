import express from 'express';
import { prisma } from '../lib/prisma.js';
import { uploadPdf } from '../middleware/upload.js';
import { generateQuizWithGemini } from '../services/gemini.js';

const router = express.Router();

const seedQuizIfEmpty = async (userId, spaceId) => {
  const count = await prisma.quiz.count();
  if (count === 0 && spaceId) {
    const quiz1 = await prisma.quiz.create({
      data: {
        spaceId,
        spaceTitle: 'Machine Learning & Neural Networks',
        title: 'Transformer Architecture & Self-Attention Quiz',
        topic: 'Attention Mechanisms & Transformers',
        difficulty: 'Medium',
        durationMinutes: 15,
        totalQuestions: 2,
        questions: {
          create: [
            {
              question: 'What primary advantage does Self-Attention have over Recurrent Neural Networks (RNNs)?',
              optionsJson: JSON.stringify([
                'It processes sequences sequentially, saving GPU memory.',
                'It allows parallel processing of all tokens in a sequence simultaneously.',
                'It completely eliminates the need for activation functions.',
                'It requires fewer parameters than a single linear layer.',
              ]),
              correctAnswer: 1,
              explanation: 'Self-Attention computes interactions across all tokens simultaneously, allowing full GPU parallelization.',
            },
            {
              question: 'In Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V, why do we scale by sqrt(d_k)?',
              optionsJson: JSON.stringify([
                'To increase learning rate for large hidden dimensions.',
                'To prevent dot products from growing excessively large, avoiding vanishing gradients.',
                'To convert vectors into probability distributions.',
                'To enforce orthogonality between Queries and Keys.',
              ]),
              correctAnswer: 1,
              explanation: 'Large values of d_k push dot products to large magnitudes, causing softmax to yield vanishing gradients.',
            },
          ],
        },
      },
    });

    await prisma.quizAttempt.create({
      data: {
        userId,
        quizId: quiz1.id,
        title: quiz1.title,
        spaceTitle: quiz1.spaceTitle,
        score: 100,
        totalQuestions: 2,
        correctCount: 2,
        wrongCount: 0,
        timeSpentSeconds: 340,
        accuracy: 100,
        status: 'Passed',
      },
    });
  }
};

// GET /api/quizzes
router.get('/', async (req, res) => {
  try {
    const user = await prisma.user.findFirst();
    const space = await prisma.learningSpace.findFirst();
    if (user && space) await seedQuizIfEmpty(user.id, space.id);

    const quizzes = await prisma.quiz.findMany({
      include: { questions: true },
      orderBy: { createdAt: 'desc' },
    });

    // Parse optionsJson into JavaScript array
    const formatted = quizzes.map((q) => ({
      ...q,
      questions: q.questions.map((question) => ({
        ...question,
        options: JSON.parse(question.optionsJson || '[]'),
      })),
    }));

    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/quizzes/history
router.get('/history', async (req, res) => {
  try {
    const history = await prisma.quizAttempt.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(history);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/quizzes/:id
router.get('/:id', async (req, res) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: { questions: true },
    });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const formatted = {
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: JSON.parse(q.optionsJson || '[]'),
      })),
    };

    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/quizzes/generate-topic
router.post('/generate-topic', async (req, res) => {
  try {
    const { spaceId, spaceTitle, topic, difficulty, numQuestions } = req.body;
    const space = spaceId ? await prisma.learningSpace.findUnique({ where: { id: spaceId } }) : await prisma.learningSpace.findFirst();

    const generatedData = await generateQuizWithGemini(topic, spaceTitle || space?.title || 'General Subject', difficulty, numQuestions || 5);

    const newQuiz = await prisma.quiz.create({
      data: {
        spaceId: space ? space.id : (await prisma.learningSpace.findFirst()).id,
        spaceTitle: generatedData.spaceTitle,
        title: generatedData.title,
        topic: generatedData.topic,
        difficulty: generatedData.difficulty,
        durationMinutes: generatedData.durationMinutes,
        totalQuestions: generatedData.totalQuestions,
        questions: {
          create: generatedData.questions.map((q) => ({
            question: q.question,
            optionsJson: JSON.stringify(q.options),
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
          })),
        },
      },
      include: { questions: true },
    });

    return res.status(201).json(newQuiz);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/quizzes/generate-pdf
router.post('/generate-pdf', uploadPdf.single('pdf'), async (req, res) => {
  try {
    const pdfFileName = req.file ? req.file.originalname : 'Study Material.pdf';
    const space = await prisma.learningSpace.findFirst();

    const generatedData = await generateQuizWithGemini(`PDF Notes: ${pdfFileName}`, space?.title || 'Study Material', 'Medium', 5);

    const newQuiz = await prisma.quiz.create({
      data: {
        spaceId: space.id,
        spaceTitle: space.title,
        title: `PDF Quiz: ${pdfFileName}`,
        topic: `PDF Assessment: ${pdfFileName}`,
        difficulty: 'Medium',
        durationMinutes: 15,
        totalQuestions: 5,
        isPdfBased: true,
        pdfFileName,
        questions: {
          create: generatedData.questions.map((q) => ({
            question: q.question,
            optionsJson: JSON.stringify(q.options),
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
          })),
        },
      },
      include: { questions: true },
    });

    return res.status(201).json(newQuiz);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/quizzes/:id/submit
router.post('/:id/submit', async (req, res) => {
  try {
    const { answers, timeSpentSeconds } = req.body;
    const user = await prisma.user.findFirst();
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: { questions: true },
    });

    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (answers && answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId: quiz.id,
        title: quiz.title,
        spaceTitle: quiz.spaceTitle,
        score,
        totalQuestions,
        correctCount,
        wrongCount: totalQuestions - correctCount,
        timeSpentSeconds: timeSpentSeconds || 300,
        accuracy: score,
        status: score >= 70 ? 'Passed' : 'Needs Improvement',
      },
    });

    return res.status(201).json(attempt);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
