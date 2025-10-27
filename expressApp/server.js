import express from 'express';
import mongoose from 'mongoose';
import { getAllListings, searchListings } from './services/listings.js';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

mongoose.connect('mongodb://localhost:27017/sample_airbnb', {
  authSource: 'admin',
  user: 'root',
  pass: 'root',
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', async (req, res) => {
  try {
    const results = await getAllListings(10000);
    res.render('index', { results: results, total: results.length });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/search', async (req, res) => {
  try {
    const results = await searchListings(req.body, 10000);
    console.log('Found', results.length, 'results');
    res.render('index', { results: results, total: results.length });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
