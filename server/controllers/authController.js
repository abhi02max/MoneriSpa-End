const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  console.log('\n--- STEP 2: Login attempt received for username:', username, '---'); // DEBUG LINE

  try {
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
        console.log('   - LOGIN FAILED: User not found in database.'); // DEBUG LINE
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (await admin.matchPassword(password)) {
      console.log('   - LOGIN SUCCESS: Password matched. Generating token.'); // DEBUG LINE
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      console.log('   - LOGIN FAILED: Password did not match.'); // DEBUG LINE
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('--- CRITICAL ERROR DURING LOGIN ---', error); // DEBUG LINE
    res.status(500).json({ message: 'Server error' });
  }
};

// --- (The registerAdmin function remains the same, but is included for completeness) ---
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const adminExists = await Admin.findOne({ username });
      if (adminExists) return res.status(400).json({ message: 'Admin already exists' });
      const admin = await Admin.create({ username, password });
      if (admin) {
        res.status(201).json({ _id: admin._id, username: admin.username, token: generateToken(admin._id) });
      } else { res.status(400).json({ message: 'Invalid admin data' }); }
    } catch (error) { res.status(500).json({ message: 'Server error' }); }
};