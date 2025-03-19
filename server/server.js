// //server.js

// const express = require('express');
// const app = express();

// // handling CORS
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", 
//                "http://localhost:4200");
//     res.header("Access-Control-Allow-Headers", 
//                "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// // route for handling requests from the Angular client
// app.get('/api/message', (req, res) => {
//     res.json({ message: 
//             'Hello GEEKS FOR GEEKS Folks from the Express server!' });
// });

// //direct angular to users route
// app.use('/api/message', require('./routes/users'));

// app.listen(3000, () => {
//     console.log('Server listening on port 3000');
// });

// const app = require('./app');

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log('Server is running on port ${PORT}');
// });
