import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import listingsRoutes from './routes/listingsRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  authSource: process.env.AUTHSOURCE,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', listingsRoutes);
app.use('/login', loginRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
