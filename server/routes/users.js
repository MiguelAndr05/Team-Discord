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

//Send Friend request  
router.post('/sendFriendRequest', async (req,res) => {
  
  try{
    //Extract the receiverUsername and receiverDiscriminator from request body
    var receiverUsername = req.body.receiverUsername.trim();
    var receiverDiscriminator = req.body.receiverDiscriminator.trim();

    //Set the authenticated and currently logged in user as the sender
    //Passport should authenticate and store in user in request
    var sender = req.user;


    console.log("Looking for user:", receiverUsername, receiverDiscriminator);
    if (!sender) {
      console.log("Sender not authenticated");
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    //MongoDB findOne query to search User collection to match username and discriminator
    //This will match the compound index in User model
    var receiver = await User.findOne({
      
      username: receiverUsername,
      discriminator: receiverDiscriminator,
    });

    //Check if receiver is not found
    if(!receiver){
      return res.status(404).json({ error: "User not found"});
    }

    console.log("Receiver found:", receiver.username, receiver.discriminator);
    console.log("Receiver's friendRequests:", receiver.friendRequests);

    //Check is sender is sending it themselves
    if(receiver._id.equals(sender._id)){
      return res.status(200).json({ 
        success: false,
        message: "You can't add yourself"});
    }
    //Check if they are already friends
    if(receiver.friendsList.some(id => id.equals(sender._id))){
      return res.status(200).json({ 
        success: false,
        message: "You are already friends"});
    }
    
    //Check if the sender has already sent a request
    //Use some() to iterate through object array
    if(receiver.friendRequests.some(id => id.equals(sender._id))){
      return res.status(200).json({ 
         success: false,
         message: "User has existing pending friend request"});
    }

    //User receiver variable to find the receiver's friendRequest field from the model
    //Push the sender's object id to the receivers friend request list
    receiver.friendRequests.push(sender._id);
    //Save to User's friendRequest field
    await receiver.save();
    return res.status(202).json({ 
      success: true,
      message: "Friend request sent successfully" });


  }catch(error){
    console.log(error);
    return res.status(500).json({ error: "Server error"});
  }
});

module.exports = router;
