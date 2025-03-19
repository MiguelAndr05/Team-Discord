//server.js
const express = require('express');
const app = express.Router();
const usersModel = require("./models/usersModel");

// handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// route for handling requests from the Angular client
app.get('/api/message', async (req, res, next) => {
    res.json(
        {   
            message: "Hello GEEKS FOR GEEKS Folks from the Express server!"
        }
        );
    
});

// grabbing post message from api/message, sent by angular app
// could be going about it the wrong way
/*
app.post("/api/message", async (req, res, next) => {
    let userObj = new usersModel({
        userId: req.
    });
    await userObj.save();
});
*/



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
