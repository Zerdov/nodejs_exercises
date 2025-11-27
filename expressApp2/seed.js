import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './models/users.js';
import 'dotenv/config';

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    console.log('Cleared existing users');

    const usersData = [
      { username: 'admin', password: '1234' },
      { username: 'root', password: 'root' }
    ];

    for (const u of usersData) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.create({ username: u.username, password: hashedPassword });
      console.log(`Created user: ${u.username}`);
    }

    console.log('Seeding complete!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding users:', err);
    await mongoose.disconnect();
  }
};

seedUsers();
