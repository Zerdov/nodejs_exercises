import { Listing } from '../models/listingsModel.js';

export const getAllListings = async (limit) => {
  return Listing.find({})
    .select('name price accommodates bedrooms beds address.country property_type')
    .limit(limit);
};

export const searchListings = async ({
  maxPrice,
  minGuests,
  minBedrooms,
  minBeds,
  country,
  propertyType
}, limit) => {
  const filter = {};

  if (maxPrice) filter.price = { $lte: Number(maxPrice) };
  if (minGuests) filter.accommodates = { $gte: Number(minGuests) };
  if (minBedrooms) filter.bedrooms = { $gte: Number(minBedrooms) };
  if (minBeds) filter.beds = { $gte: Number(minBeds) };
  if (country) filter['address.country'] = new RegExp(country, 'i');
  if (propertyType) filter.property_type = new RegExp(propertyType, 'i');

  return Listing.find(filter)
    .select('name price accommodates bedrooms beds address.country property_type');
};
