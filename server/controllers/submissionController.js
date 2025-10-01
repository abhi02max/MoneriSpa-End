const HairSubmission = require('../models/HairSubmission');
const SkinSubmission = require('../models/SkinSubmission');
const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        host: "smtp.office365.com", port: 587, secure: false,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        tls: { ciphers: 'SSLv3' }
    });
};

const sendNotification = async (submission, subject) => {
    const transporter = createTransporter();
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL,
        subject: subject,
        html: `<h1>New Consultation Form</h1><p><strong>Name:</strong> ${submission.name}</p><p><strong>Contact:</strong> ${submission.contactNumber}</p><p>A new form has been submitted. Check the database for full details.</p>`,
    });
};

exports.submitHairForm = async (req, res) => {
    try {
        const submission = new HairSubmission(req.body);
        await submission.save();
        await sendNotification(submission, 'New Hair Test Form Submission from Moneri Website');
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) { res.status(500).json({ message: 'Server error, please try again.' }); }
};

exports.submitSkinForm = async (req, res) => {
    try {
        const submission = new SkinSubmission(req.body);
        await submission.save();
        await sendNotification(submission, 'New Skin Test Form Submission from Moneri Website');
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (error) { res.status(500).json({ message: 'Server error, please try again.' }); }
};