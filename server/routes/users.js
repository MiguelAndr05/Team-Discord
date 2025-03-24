var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

// GET list of Users using try & catch block
router.get("/", async (req, res, next) => {
  try{
    const users = await User.find();
    res.status(200).json(users);

  }catch(error){
    res.status(500).json({ message: "GET failed, an error has occurred:", error: error});

  }
});

// GET finding a user by ID
router.get("/:id", async (req, res, next) => {
  try{
    let id = req.params.id;
    const users = await User.findOne({_id: id});
    res.status(200).json(users);

  }catch(error){
    res.status(500).json({ message: "GET failed, an error has occurred:", error: error});

  }
});

// POST gets info from form and saves it to the database
router.post('/', async (req, res) => {
  try{
    console.log(req.body);

    // Validate body objects
    if (!req.body.username || !req.body.email || !req.body.phonenumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Adding field values to user obj
    var user = new User({
      username: req.body.username, 
      email: req.body.email,
      phonenumber: req.body.phonenumber
     });

     // Save to DB
     await user.save();
     // Send a response if successful
     res.status(201).json({ message: 
      'success, posted new user', user });
  }catch(error){
    console.error("Error creating user", error);
    //http status req
    res.status(500).json({ error: "Internal Server Error" });

  }
  
});

// PUT update an existing user
router.put('/:id', async (req, res) => {
  try{
    console.log(req.body);

    // Validate body objects
    
    if (!req.body.username || !req.body.email || !req.body.phonenumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    

    let id = req.params.id;
    // Adding field values to user obj
    
    let user = req.body;
     
     // finds user w/ID and updates in Database
     let updatedUser = await User.findOneAndUpdate(
      {
        _id: id
      },
      {
        // setting user data into obj to update it
        $set: user
      },
      {
        // true uses the updated version of obj, not pre update version
        new: true
      }
    );
     // Send a response if successful
     res.status(200).json({ message: 
      'success, updated existing user', updatedUser });

  }catch(error){
    console.error("Error updating user", error);

    //http status req
    res.status(500).json({ error: "Internal Server Error" });
    
  }
  
});

// DELETE deletes existing user from the Database
router.delete('/:id', async (req, res) => {
  try{
    let id = req.params.id;
    let deletedUser = await User.deleteOne({ _id: id});

    // Send a response if successful
    res.status(200).json(
      { message: 'success, deleted existing user', deletedUser });

  }catch(error){
    console.error("Error deleting user", error);

    //http status req
    res.status(500).json({ error: "Internal Server Error" });
    
  }
  
});




module.exports = router;
