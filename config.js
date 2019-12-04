const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    mongo: process.env.MONGODB_URI,
};