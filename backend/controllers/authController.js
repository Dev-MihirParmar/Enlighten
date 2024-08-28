const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const user = new User({ email, password, username });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.googleAuth = (req, res) => {
    // Google OAuth logic handled by passport
    res.redirect('/');
};

exports.githubAuth = (req, res) => {
    // GitHub OAuth logic handled by passport
    res.redirect('/');
};
exports.googleAuth = (req, res) => {
    console.log('Google Auth Callback Received');
    console.log('Redirecting to:', process.env.FRONTEND_URL);

    // Google OAuth logic handled by passport
    res.redirect(process.env.FRONTEND_URL);
};
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};
