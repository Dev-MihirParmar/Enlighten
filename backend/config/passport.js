const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails && profile.emails[0] && profile.emails[0].value;

        if (!email) {
          return done(null, false, { message: 'GitHub account does not have an email associated with it.' });
        }

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            name: profile.username,
            githubId: profile.id,
            email,
          });
          await user.save();
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' });

        return done(null, { token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails && profile.emails[0] && profile.emails[0].value;

        if (!email) {
          return done(null, false, { message: 'Google account does not have an email associated with it.' });
        }

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            name: profile.displayName,
            googleId: profile.id,
            email,
          });
          await user.save();
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' });

        return done(null, { token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
