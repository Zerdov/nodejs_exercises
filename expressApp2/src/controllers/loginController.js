import jwt from 'jsonwebtoken';
import { validateUser } from '../services/authService.js';

const SECRET_KEY = process.env.JWT_SECRET;

export const showLoginPage = (req, res) => {
  res.render('loginView', { error: null });
};

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await validateUser(username, password);

    if (user) {
      const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.cookie('auth_token', token, { httpOnly: true });
      return res.redirect('/');
    }

    res.render('loginView', { error: "Identifiants incorrects." });
  } catch (err) {
    console.error(err);
    res.status(500).render('loginView', { error: "Erreur serveur." });
  }
};

export const logout = (req, res) => {
  res.clearCookie('auth_token');
  res.redirect('/login');
};
