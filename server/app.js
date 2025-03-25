var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//Import configurations and mongoose
var configs = require("./configs/globals");
var mongoose = require("mongoose");

//Connect to mongoDB
mongoose
  .connect(configs.ConnectionString.MongoDB)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB!: ", err);
  });

var app = express();

//CORS Middleware (Explicit Configuration)
app.use(cors({
  origin: "http://localhost:4200",  //Allow Angular frontend
  methods: "GET,POST,PUT,DELETE,OPTIONS",  //Allowed request methods
  allowedHeaders: "Content-Type,Authorization"  //Allowed headers
}));

//Handle preflight requests (OPTIONS method)
app.options("*", cors());


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

module.exports = app;


const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup (required for Passport)
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Dummy users (Replace with DB)
const users = [{ id: 1, username: "test", password: bcrypt.hashSync("password", 10) }];

// Passport Local Strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username);
    if (!user) return done(null, false, { message: "User not found" });

    if (!bcrypt.compareSync(password, user.password))
      return done(null, false, { message: "Incorrect password" });

    return done(null, user);
  })
);

// Serialize & Deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Routes
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in", user: req.user });
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out" });
  });
});


