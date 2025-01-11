const Food= require('../models/FoodModel')
const Restaurant = require("../models/RestaurantModel");

const createFood = async (req, res) => {
    try {
      const { name, description, price, imageUrl, isVeg, type, restaurantId,rating,reviewCount } = req.body;
  
      // Validate restaurantId
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
  
      // Create the food item
      const newFood = new Food({
        name,
        description,
        price,
        imageUrl,
        isVeg,
        type,
        restaurantId,
        rating,
        reviewsCount:reviewCount
      });
  
      const savedFood = await newFood.save();
  
      res.status(201).json({ message: "Food item created successfully", food: savedFood });
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

const getFood= async(req,res)=>{
  try {
    const response = await Food.find().select('-createdAt -updatedAt -__v');
    console.log(response)
    res.status(200).json(response)
  } catch (error) {
    console.log("erorr",error)
    res.status(500).json({message:"Internal Server Error"})
  }
} 
  

module.exports={createFood, getFood}