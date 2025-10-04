const GalleryImage = require('../models/GalleryImage');
const fs = require('fs');
const path = require('path');

exports.uploadImage = async (req, res) => {
  const { tagline } = req.body;

  console.log('--- UPLOAD DEBUG ---');
  console.log('File received:', req.file);
  console.log('Tagline:', tagline);
  console.log('Body:', req.body);

  if (!req.file) {
    console.log('No file received');
    return res.status(400).json({ message: 'Please upload a file' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    // Copy file to web directory for Nginx access
    const fs = require('fs');
    const sourcePath = req.file.path;
    const webPath = `/var/www/monerispaacademy.in/uploads/${req.file.filename}`;
    
    console.log('Source path:', sourcePath);
    console.log('Web path:', webPath);
    
    // Ensure web directory exists
    const webDir = '/var/www/monerispaacademy.in/uploads/';
    if (!fs.existsSync(webDir)) {
      fs.mkdirSync(webDir, { recursive: true });
      console.log('Created web directory:', webDir);
    }
    
    // Copy file to web directory
    fs.copyFileSync(sourcePath, webPath);
    console.log('File copied to web directory:', webPath);
    
    // Set proper permissions (with error handling)
    try {
      require('child_process').execSync(`chown www-data:www-data "${webPath}"`);
      require('child_process').execSync(`chmod 644 "${webPath}"`);
      console.log('Permissions set successfully');
    } catch (permError) {
      console.log('Permission setting failed (non-critical):', permError.message);
    }

    const newImage = new GalleryImage({ tagline: tagline || '', imageUrl });
    const savedImage = await newImage.save();
    console.log('Image saved successfully:', savedImage);
    res.status(201).json(savedImage);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error while uploading image: ' + error.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const images = await GalleryImage.find().sort({ createdAt: -1 }).limit(limit);
    res.json(images);
  } catch (error) { res.status(500).json({ message: 'Server error while fetching images' }); }
};

exports.deleteImage = async (req, res) => {
    try {
        const image = await GalleryImage.findById(req.params.id);
        if (!image) return res.status(404).json({ message: 'Image not found' });

        const filePath = path.join(__dirname, '..', image.imageUrl);
        fs.unlink(filePath, async (err) => {
            if (err) console.error('File deletion error:', err.message);
            await image.deleteOne();
            res.json({ message: 'Image removed successfully' });
        });
    } catch (error) { res.status(500).json({ message: 'Server error while deleting image' }); }
};