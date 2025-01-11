const express = require("express");
const router = express.Router();
const {createRestaurant,getAllRestaurant}= require("../controllers/restaurantController")

router.post('/createRestuarant',createRestaurant)
router.get('/getAllRestuarant',getAllRestaurant)

module.exports=router