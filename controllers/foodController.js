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
  
const getFoodById=async(req,res)=>{
  try {
    const {id} = req.params;
    const food= await Food.findById(id).select('-createdAt -updatedAt -__v');
    if(!food){
      return res.status(404).json("No food item found")
    }
    res.status(200).json({food});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Internal Server Error"})
  }
}

const getRestaurantWithMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId=id;
    // Validate the restaurantId
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }

    // Fetch restaurant details
    const restaurant = await Restaurant.findById(restaurantId).select('-createdAt -updatedAt -__v');

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Fetch menu items for the restaurant
    const restaurantMenu = await Food.find({ restaurantId }).select('-createdAt -updatedAt -__v');

    res.status(200).json({
      restaurant,
      restaurantMenu,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports={createFood, getFood, getFoodById, getRestaurantWithMenu}