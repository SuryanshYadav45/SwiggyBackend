const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the food item, e.g., "Cheese Burger"
    description: { type: String }, // Short description of the food item
    price: { type: Number, required: true }, // Price of the food item
    imageUrl: { type: String }, // URL for the food item's image
    isVeg: { type: Boolean, required: true }, // Indicates if the item is vegetarian
    type: { type: String, required: true }, // Type/category, e.g., "Burger", "Pizza"
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // References Restaurants
    isAvailable: { type: Boolean, default: true }, // Availability status
    createdAt: { type: Date, default: Date.now }, // Record creation timestamp
    updatedAt: { type: Date, default: Date.now }, // Record update timestamp
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;