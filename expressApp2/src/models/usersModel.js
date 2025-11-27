import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // chaque nom d'utilisateur doit être unique
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // optionnel : ajoute createdAt et updatedAt
});

export const User = mongoose.model('User', userSchema);
