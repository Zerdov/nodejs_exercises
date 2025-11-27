import { validateUser } from '../../../services/authService.js';
import bcrypt from 'bcrypt';
import { User } from '../../../models/usersModel.js';

// Mock des dépendances
jest.mock('../../models/usersModel.js');
jest.mock('bcrypt');

describe('validateUser', () => {
  it('retourne false si le user est introuvable', async () => {
    User.findOne.mockResolvedValue(null);

    const result = await validateUser('john', 'pass');
    expect(result).toBe(false);
  });

  it('retourne false si le mot de passe est incorrect', async () => {
    User.findOne.mockResolvedValue({ username: 'john', password: 'hash' });
    bcrypt.compare.mockResolvedValue(false);

    const result = await validateUser('john', 'wrongpass');
    expect(result).toBe(false);
  });

  it('retourne le user si le mot de passe match', async () => {
    const fakeUser = { username: 'john', password: 'hash' };
    User.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);

    const result = await validateUser('john', 'goodpass');
    expect(result).toBe(fakeUser);
  });
});
