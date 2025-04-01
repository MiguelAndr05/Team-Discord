const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/usersModel');

// Registration Route
router.post('/createAccount', async (req, res) => {
  try {
    const { username, email, phonenumber, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      phonenumber,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Currently, req.user will be undefined on initial log in, should be able to identify user on second request
router.post('/loginAccount', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: info.message || 'Invalid credentials' });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});


//Identify "me" current user
router.get('/me', (req, res) => {
  //Debug statements
  console.log("Session check in /me:", req.session);
  console.log("Authenticated?", req.isAuthenticated());
  console.log("User from session:", req.user);


  //Check if user is authenticated
  if(req.isAuthenticated()){
   
    res.json(req.user);
  
  }else{
    
    return res.status(401).json({error: "User is not authenticated"});
  }

}); 

// Logout Route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Logout successful' });
  });
});

module.exports = router;
