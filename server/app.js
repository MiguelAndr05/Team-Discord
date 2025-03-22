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

//Start the server


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
