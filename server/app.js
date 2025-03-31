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

// Routes
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  // Validate input
  if (!username || !password || !email) {
    return res.status(400).json({ message: "Username, password, and email are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Error saving user to database:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in", user: req.user });
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ message: "Error during logout" });
    }
    res.json({ message: "Logged out" });
  });
});

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;


