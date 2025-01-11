const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the restaurant
  description: { type: String }, // Short description of the restaurant
  rating: { type: Number, default: 0 }, // Average rating
  reviewsCount: { type: Number, default: 0 }, // Total number of reviews
  imageUrl: { type: String }, // URL for restaurant image
  cuisine: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }, // Record creation timestamp
  updatedAt: { type: Date, default: Date.now }, // Record update timestamp
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
