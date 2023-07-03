const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongo.database, config.mongo.options);
        console.log('🚀 connect mongodb successfully');
    } catch (error) {
        console.error(`connection to database ${config.mongo.database} failed ${error}`);
        process.exit(1);
    }
}


module.exports = { connectDB };