import { Schema, model } from "mongoose";

const schemaListingsAndReviews = new Schema({
  name: String,
  price: Schema.Types.Decimal128,
  accommodates: Number,
  bedrooms: Number,
  beds: Number,
  address: {
    country: String,
    city: String
  },
  property_type: String,
  cleaning_fee: Schema.Types.Decimal128,
  amenities: [String],
  review_scores: {
    rating: Number
  },
  number_of_reviews: Number
});

// On force le nom de la collection et on nomme le modèle "Listing"
export const Listing = model(
  "Listing",
  schemaListingsAndReviews,
  "listingsAndReviews"
);
