var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
require('./configs/passport'); // Ensure Passport configuration is loaded
var configs = require("./configs/globals");
var mongoose = require("mongoose");
var User = require("./models/usersModel"); // Import the User model
var { createServer } = require("http");
var { Server } = require("socket.io");
// Connect to MongoDB
mongoose
  .connect(configs.ConnectionString.MongoDB)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB!: ", err);
  });

var app = express();


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const connectedUsers = {}; // Store connected users with their names

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle user registration
  socket.on("register-user", (data) => {
    const { name } = data;
    connectedUsers[socket.id] = name; // Associate the user's name with their socket ID
    console.log(`User registered: ${name} (Socket ID: ${socket.id})`);
  });

  // Handle incoming messages
  socket.on("message", (data) => {
    const senderName = connectedUsers[socket.id] || "Unknown User"; // Get the sender's name
    console.log(`Message from ${senderName}:`, data.text);

    // Broadcast the message with the sender's name
    io.emit("message", {
      text: data.text,
      senderName,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete connectedUsers[socket.id]; // Remove the user from the connected users list
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// CORS Middleware (Explicit Configuration)
app.use(cors({
  origin: "http://localhost:4200", // Allow Angular frontend
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed request methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
  credentials: true,
}));

// Handle preflight requests (OPTIONS method)
app.options("*", cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//Tracking session info for debugging
app.use((req, res, next) => {
  console.log('--- Session Debug ---');
  console.log('Session ID:', req.sessionID);
  console.log('Session:', req.session);
  console.log('User:', req.user);
  console.log('---------------------');
  next();
});

// Passport Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email }); // Use async/await
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Use async/await
    done(null, user);
  } catch (err) {
    done(err);
  }
});


app.use("/", indexRouter);
app.use("/api/users", usersRouter);


module.exports = app;