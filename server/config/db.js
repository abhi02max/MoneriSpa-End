const mongoose = require('mongoose');

const connectDB = () => {
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB Connected...');
    })
    .catch(err => {
      console.error('❌ Initial MongoDB connection error:', err.message);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectDB, 5000); // Retry connection after 5 seconds
    });
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB Disconnected.');
});

mongoose.connection.on('error', err => {
  console.error('❌ MongoDB runtime error:', err.message);
});

module.exports = connectDB;