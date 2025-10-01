const mongoose = require('mongoose');

const HairSubmissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    concerns: { type: Object },
    otherConcern: { type: String },
    issueDuration: { type: String },
    treatments: { type: Object },
    usesHairOil: { type: String },
    stressLevel: { type: String },
    sleepPattern: { type: String },
    dietType: { type: String },
    waterIntake: { type: String },
    healthConditions: { type: String },
    medications: { type: String },
    hairGoals: { type: Object },
    submissionDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HairSubmission', HairSubmissionSchema);