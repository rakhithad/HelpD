// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to handle creating a new user
router.post('/', async (req, res) => {
    const { uid, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
 
        // Create a new user
        const newUser = new User({ uid, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:uid', async (req, res) => {
    console.log('UID received:', req.params.uid); // Debugging log
    const { uid } = req.params;
    try {
        const user = await User.findOne({ uid: uid });
        if (!user) {
            console.log('User not found for UID:', uid); // More debugging info
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

module.exports = router;
