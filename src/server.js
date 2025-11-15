require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ease_transport';

connectDB(MONGODB_URI);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
