const express = require('express');
const router = express.Router();
const { submitHairForm, submitSkinForm } = require('../controllers/submissionController');

router.post('/hair', submitHairForm);
router.post('/skin', submitSkinForm);

module.exports = router;