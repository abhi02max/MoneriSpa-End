const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImage, getImages, deleteImage } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // Save to both locations for compatibility
      const serverUploads = path.join(__dirname, '../uploads/');
      const webUploads = '/var/www/monerispaacademy.in/uploads/';
      
      // Ensure both directories exist
      require('fs').mkdirSync(serverUploads, { recursive: true });
      require('fs').mkdirSync(webUploads, { recursive: true });
      
      console.log('Multer destination:', serverUploads);
      cb(null, serverUploads);
    } catch (error) {
      console.error('Directory creation error:', error);
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    console.log('Generated filename:', filename);
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

router.route('/').get(getImages);
router.route('/upload').post(protect, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, uploadImage);
router.route('/:id').delete(protect, deleteImage);

module.exports = router;