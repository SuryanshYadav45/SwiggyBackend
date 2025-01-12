const express = require("express");
const router = express.Router();

const{createFood, getFood,getFoodById, getRestaurantWithMenu}=require("../controllers/foodController")

router.post('/createFood',createFood)
router.get('/getFood',getFood)
router.get('/getFoodById/:id',getFoodById)
router.get('/getRestMenu/:id',getRestaurantWithMenu)

module.exports = router;

