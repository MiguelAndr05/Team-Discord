// server/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes"); // Import user routes

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
app.use(express.json()); // Parses incoming JSON requests

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/discordLite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/users", usersRoutes);

// Test API Endpoint
app.get("/api/message", (req, res) => {
    res.json({ message: "Hello GEEKS FOR GEEKS Folks from the Express server!" });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

