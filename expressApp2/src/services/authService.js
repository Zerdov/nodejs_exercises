import { User } from '../models/usersModel.js';
import bcrypt from 'bcrypt';

export const validateUser = async (username, plainPassword) => {
  const user = await User.findOne({ username });
  if (!user) return false;

  const isMatch = await bcrypt.compare(plainPassword, user.password);
  return isMatch ? user : false;
};
