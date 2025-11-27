import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const token = req.cookies?.auth_token;
  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.warn('JWT verification failed:', err.message);
    return res.clearCookie('auth_token').redirect('/login');
  }
};
