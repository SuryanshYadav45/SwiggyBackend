const express = require("express");
const router = express.Router();

const{createFood, getFood}=require("../controllers/foodController")

router.post('/createFood',createFood)
router.get('/getFood',getFood)

module.exports = router;

