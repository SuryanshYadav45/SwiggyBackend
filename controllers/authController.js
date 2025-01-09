const User = require('../models/UserModel.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

const JWT_SECRET = 'emxfiuhewi734rnx';
const login = async (req, res) => {
    const { user_json_url } = req.body;

    if (!user_json_url) {
        return res.status(400).json({ success: false, message: 'user_json_url is required' });
    }

    try {
        // Fetch user details from Phone.Email
        const response = await axios.get(user_json_url);
        console.log(response.data)
        const { user_phone_number, user_first_name, user_last_name } = response.data;

        if (!user_phone_number) {
            return res.status(400).json({ success: false, message: 'Phone number not found' });
        }

        // Check if the user exists
        let user = await User.findOne({ phone:user_phone_number });

        if (!user) {
            // Create a new user if not found (signup)
            user = new User({
                phone:user_phone_number,
                firstName:user_first_name,
                lastName:user_last_name,
            });
            await user.save();
        } else {
            // Optional: Update first and last name if provided
            user.firstName = user.firstName || user_first_name;
            user.lastName = user.lastName || user_last_name;
            await user.save();
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, message: 'Authentication successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = { login};