const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const auth = require('./middleware/auth');

const usersRoute = require('./routes/users');
const bookingsRoute = require('./routes/bookings');
const paymentsRoute = require('./routes/payments');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(auth);

app.use('/users', usersRoute);
app.use('/bookings', bookingsRoute);
app.use('/payments', paymentsRoute);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
