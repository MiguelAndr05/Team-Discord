const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel'); // Ensure this path is correct

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      console.log('Authenticating user with email:', email);

      // Use async/await with findOne
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found');
        return done(null, false, { message: 'User not found' });
      }

      console.log('User found:', user);

      // Compare the password
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        console.log('Incorrect password');
        return done(null, false, { message: 'Incorrect password' });
      }

      console.log('Authentication successful');
      return done(null, user);
    } catch (error) {
      console.error('Error during authentication:', error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Use async/await with findById
    done(null, user);
  } catch (error) {
    done(error);
  }
});