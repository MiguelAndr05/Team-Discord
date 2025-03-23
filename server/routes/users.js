var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/', function(req, res, next){
//   res.send("Hello Angular");
// });

// router.get('/', (req, res) => {
//   res.json({ message: 
//           'Hello GEEKS FOR GEEKS Folks from the Express server!' });
// });

router.post('/', async (req, res) => {
  try{
    console.log(req.body);

    //validate body objects
    if (!req.body.username || !req.body.email || !req.body.phonenumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    var user = new User({
      username: req.body.username, 
      email: req.body.email,
      phonenumber: req.body.phonenumber
     });

     //Save to DB
     await user.save();
     //Send a response if successful
     res.status(201).json({ message: 
      'success, posted new user', user });
  }catch(error){
    console.error("Error creating user", error);
    //http status req
    res.status(500).json({ error: "Internal Server Error" });
  }
  
  

  

  
});




module.exports = router;
