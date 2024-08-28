const express = require('express');
const passport = require('passport');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
});

// GitHub Auth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
});

module.exports = router;
