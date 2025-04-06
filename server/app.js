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
var Message = require('./models/messagesModel'); // Import the Message model

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
  origin: "http://localhost:4200", // Allow requests from your frontend
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Allow specific HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  credentials: true, // Allow cookies
}));

// Handle preflight requests (OPTIONS method)
app.options("*", cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200", 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const connectedUsers = {}; 

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  if (!socket.hasRegisteredHandlers) {
    socket.hasRegisteredHandlers = true; 

    socket.on("register-user", (data) => {
      const { name, id } = data;
      connectedUsers[socket.id] = { name, id }; 
      console.log("Connected users:", connectedUsers); 
    });

    socket.on("private-message", async (data) => {
      const { recipientId, text } = data;
      const senderId = connectedUsers[socket.id]?.id;

      console.log("Private message data:", { senderId, recipientId, text });

      if (!senderId) {
        console.error("Sender ID is undefined. Check if the user is registered.");
        return;
      }

      try {
        const message = new Message({
          senderId,
          recipientId,
          text,
        });

        await message.save();
        console.log("Message saved to database:", message);

        const recipientSocket = Object.keys(connectedUsers).find(
          (key) => connectedUsers[key].id === recipientId
        );

        if (recipientSocket) {
          io.to(recipientSocket).emit("private-message", {
            text,
            senderId,
            senderName: connectedUsers[socket.id]?.name || "Unknown User",
            timestamp: message.timestamp,
          });
        } else {
          console.log(`Recipient with ID ${recipientId} not found.`);
        }
      } catch (error) {
        console.error("Failed to save message:", error);
      }
    });
  }

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete connectedUsers[socket.id]; // Remove the user from the connected users list
    io.emit("user-list", Object.values(connectedUsers));
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const messageRoutes = require('./routes/message.routes'); 
app.use('/api/messages', messageRoutes); 

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