const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('./config/passportConfig');

const app = express();
connectDB();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.use('/api/auth', require('./routes/auth'));
// Additional routes like content and comment routes can be added here.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
