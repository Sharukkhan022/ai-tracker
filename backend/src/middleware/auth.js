import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'learntrack_jwt_secret_key_2026_super_secure';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If no token is provided in authorization header, fallback to default mock user ID for easy API testing
    req.user = { userId: 'usr_mock_101', email: 'alex.rivera@university.edu' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
