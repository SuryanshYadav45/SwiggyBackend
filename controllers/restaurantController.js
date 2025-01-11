const Restaurant = require("../models/RestaurantModel");

const createRestaurant = async (req, res) => {
  try {
    const { name, desc, rating, reviewcount, imageurl, cuisine  } = req.body;

    const requiredFields = [
        { field: "name", message: "Restaurant name is required" },
        { field: "desc", message: "Restaurant description is required" },
        { field: "rating", message: "Restaurant rating is required" },
        { field: "reviewcount", message: "Restaurant review count is required" },
        { field: "imageurl", message: "Restaurant image URL is required" },
        { field: "cuisine", message: "Cuisine is required" },  // Add this check for cuisine
      ];
  
      // Check for missing fields
      for (const { field, message } of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({ message });
        }
      }

      const response= new Restaurant({
        name,
        description:desc,
        rating,
        reviewsCount:reviewcount,
        imageUrl:imageurl,
        cuisine
      })
      await response.save();
      
      res.status(201).json({message:"Data created successfully"})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllRestaurant= async(req,res)=>{
  try {
    // Fetch all restaurants from the database
    const restaurants = await Restaurant.find().select('-createdAt -updatedAt -__v'); 

    // If no restaurants are found, return an appropriate message
    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    res.status(200).json(restaurants); // Return the list of restaurants
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createRestaurant, getAllRestaurant };
