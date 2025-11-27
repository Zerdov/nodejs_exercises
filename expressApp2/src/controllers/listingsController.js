import { getAllListings, searchListings } from '../services/listingsService.js';

export const getListingsController = async (req, res) => {
  try {
    const results = await getAllListings(10000);
    res.render('listingsView', { results, total: results.length });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const searchListingsController = async (req, res) => {
  try {
    const results = await searchListings(req.body, 10000);
    res.render('listingsView', { results, total: results.length });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
