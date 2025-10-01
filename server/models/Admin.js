const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// This function runs BEFORE a new admin is saved
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  console.log('--- STEP 1: Hashing password for user:', this.username, '---'); // DEBUG LINE
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// This function compares the login password to the hashed password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('--- STEP 3: Comparing passwords for user:', this.username, '---'); // DEBUG LINE
  console.log('   - Entered Password during login:', enteredPassword); // DEBUG LINE
  console.log('   - Stored Hashed Password in DB:', this.password); // DEBUG LINE
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  console.log('--- STEP 4: Password match result:', isMatch, '---'); // DEBUG LINE
  return isMatch;
};

module.exports = mongoose.model('Admin', AdminSchema);