import React, { useState } from 'react';
import { apiService } from '../utils/api';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HairTestPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Client Information
        name: '', age: '', gender: '', contactNumber: '', email: '',
        // Hair & Scalp Concerns
        hairFall: false, thinning: false, dandruff: false, itchyScalp: false,
        dryFrizzy: false, oilyScalp: false, splitEnds: false, prematureGreying: false,
        baldPatches: false, otherConcern: '',
        // Hair History
        issueDuration: '', keratin: false, smoothening: false, straightening: false,
        hairColor: false, chemicalTreatments: false, noTreatments: false,
        usesHairOil: '',
        // Lifestyle & Health
        stressLevel: '', sleepPattern: '', dietType: '', waterIntake: '',
        healthConditions: '', medications: '',
        // Hair Goals
        reduceHairFall: false, regrowHair: false, controlDandruff: false,
        smoothShiny: false, colorStyle: false, healthyScalp: false,
        // Declaration
        declaration: false
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('Submitting...');
        try {
            const response = await apiService.post('/submissions/hair', formData);
            setMessage(response.data.message);
        } catch (error) {
            setError(error.message);
            setMessage('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const steps = ['Client Info', 'Hair Concerns', 'Hair History', 'Lifestyle & Health', 'Hair Goals', 'Declaration'];

    if (message === 'Form submitted successfully!') {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                <h1>Thank You!</h1>
                <p>Your hair consultation form has been submitted. Our experts will get in touch with you shortly.</p>
                <Link to="/" className="btn" style={{ marginTop: '2rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <h1>Hair Consultation Form</h1>
                <p>Let's begin your journey to healthy, beautiful hair.</p>
            </div>
            <div className="container" style={{ maxWidth: '900px', margin: '4rem auto' }}>
                <div className="form-stepper">
                    {steps.map((step, index) => (
                        <div key={index} className={`step ${currentStep === index + 1 ? 'active' : ''} ${currentStep > index + 1 ? 'completed' : ''}`}>
                            <div className="step-number">{currentStep > index + 1 ? '✓' : index + 1}</div>
                            <div className="step-title">{step}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="consultation-form">
                    {loading && <LoadingSpinner />}
                    {error && <ErrorMessage message={error} />}
                    
                    {/* Step 1: Client Information */}
                    {currentStep === 1 && (
                        <div className="form-step">
                            <h2>Client Information</h2>
                            <div className="form-group">
                                <label htmlFor="name">Name *</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age *</label>
                                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Gender *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male</label>
                                    <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female</label>
                                    <label><input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contactNumber">Contact Number *</label>
                                <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Hair & Scalp Concerns */}
                    {currentStep === 2 && (
                        <div className="form-step">
                            <h2>Hair & Scalp Concerns</h2>
                            <p>Select all that apply:</p>
                            <div className="checkbox-group">
                                <label><input type="checkbox" name="hairFall" checked={formData.hairFall} onChange={handleCheckboxChange} /> Hair Fall</label>
                                <label><input type="checkbox" name="thinning" checked={formData.thinning} onChange={handleCheckboxChange} /> Thinning</label>
                                <label><input type="checkbox" name="dandruff" checked={formData.dandruff} onChange={handleCheckboxChange} /> Dandruff / Flakes</label>
                                <label><input type="checkbox" name="itchyScalp" checked={formData.itchyScalp} onChange={handleCheckboxChange} /> Itchy Scalp</label>
                                <label><input type="checkbox" name="dryFrizzy" checked={formData.dryFrizzy} onChange={handleCheckboxChange} /> Dry & Frizzy Hair</label>
                                <label><input type="checkbox" name="oilyScalp" checked={formData.oilyScalp} onChange={handleCheckboxChange} /> Oily / Greasy Scalp</label>
                                <label><input type="checkbox" name="splitEnds" checked={formData.splitEnds} onChange={handleCheckboxChange} /> Split Ends</label>
                                <label><input type="checkbox" name="prematureGreying" checked={formData.prematureGreying} onChange={handleCheckboxChange} /> Premature Greying</label>
                                <label><input type="checkbox" name="baldPatches" checked={formData.baldPatches} onChange={handleCheckboxChange} /> Bald Patches</label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="otherConcern">Other (please specify):</label>
                                <input type="text" id="otherConcern" name="otherConcern" value={formData.otherConcern} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Hair History */}
                    {currentStep === 3 && (
                        <div className="form-step">
                            <h2>Hair History</h2>
                            <div className="form-group">
                                <label>How long have you been facing this issue? *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="issueDuration" value="Less than 3 months" checked={formData.issueDuration === 'Less than 3 months'} onChange={handleChange} /> Less than 3 months</label>
                                    <label><input type="radio" name="issueDuration" value="3–6 months" checked={formData.issueDuration === '3–6 months'} onChange={handleChange} /> 3–6 months</label>
                                    <label><input type="radio" name="issueDuration" value="6–12 months" checked={formData.issueDuration === '6–12 months'} onChange={handleChange} /> 6–12 months</label>
                                    <label><input type="radio" name="issueDuration" value="More than 1 year" checked={formData.issueDuration === 'More than 1 year'} onChange={handleChange} /> More than 1 year</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Have you undergone any treatments? (Select all that apply)</label>
                                <div className="checkbox-group">
                                    <label><input type="checkbox" name="keratin" checked={formData.keratin} onChange={handleCheckboxChange} /> Keratin</label>
                                    <label><input type="checkbox" name="smoothening" checked={formData.smoothening} onChange={handleCheckboxChange} /> Smoothening</label>
                                    <label><input type="checkbox" name="straightening" checked={formData.straightening} onChange={handleCheckboxChange} /> Straightening</label>
                                    <label><input type="checkbox" name="hairColor" checked={formData.hairColor} onChange={handleCheckboxChange} /> Hair Color / Bleach</label>
                                    <label><input type="checkbox" name="chemicalTreatments" checked={formData.chemicalTreatments} onChange={handleCheckboxChange} /> Chemical Treatments</label>
                                    <label><input type="checkbox" name="noTreatments" checked={formData.noTreatments} onChange={handleCheckboxChange} /> None</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Do you regularly use hair oil? *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="usesHairOil" value="Yes" checked={formData.usesHairOil === 'Yes'} onChange={handleChange} /> Yes</label>
                                    <label><input type="radio" name="usesHairOil" value="No" checked={formData.usesHairOil === 'No'} onChange={handleChange} /> No</label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Lifestyle & Health */}
                    {currentStep === 4 && (
                        <div className="form-step">
                            <h2>Lifestyle & Health</h2>
                            <div className="form-group">
                                <label>Stress Level *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="stressLevel" value="Low" checked={formData.stressLevel === 'Low'} onChange={handleChange} /> Low</label>
                                    <label><input type="radio" name="stressLevel" value="Moderate" checked={formData.stressLevel === 'Moderate'} onChange={handleChange} /> Moderate</label>
                                    <label><input type="radio" name="stressLevel" value="High" checked={formData.stressLevel === 'High'} onChange={handleChange} /> High</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Sleep Pattern *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="sleepPattern" value="6–8 hrs" checked={formData.sleepPattern === '6–8 hrs'} onChange={handleChange} /> 6–8 hrs</label>
                                    <label><input type="radio" name="sleepPattern" value="Less than 6 hrs" checked={formData.sleepPattern === 'Less than 6 hrs'} onChange={handleChange} /> Less than 6 hrs</label>
                                    <label><input type="radio" name="sleepPattern" value="Irregular" checked={formData.sleepPattern === 'Irregular'} onChange={handleChange} /> Irregular</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Diet Type *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="dietType" value="Veg" checked={formData.dietType === 'Veg'} onChange={handleChange} /> Veg</label>
                                    <label><input type="radio" name="dietType" value="Non-Veg" checked={formData.dietType === 'Non-Veg'} onChange={handleChange} /> Non-Veg</label>
                                    <label><input type="radio" name="dietType" value="Vegan" checked={formData.dietType === 'Vegan'} onChange={handleChange} /> Vegan</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Water Intake *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="waterIntake" value="Less than 1L/day" checked={formData.waterIntake === 'Less than 1L/day'} onChange={handleChange} /> Less than 1L/day</label>
                                    <label><input type="radio" name="waterIntake" value="1–2L/day" checked={formData.waterIntake === '1–2L/day'} onChange={handleChange} /> 1–2L/day</label>
                                    <label><input type="radio" name="waterIntake" value="More than 2L/day" checked={formData.waterIntake === 'More than 2L/day'} onChange={handleChange} /> More than 2L/day</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="healthConditions">Do you have any health conditions? (Thyroid, PCOS, Diabetes, etc.):</label>
                                <textarea id="healthConditions" name="healthConditions" value={formData.healthConditions} onChange={handleChange} rows="3"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="medications">Are you on any medications?</label>
                                <textarea id="medications" name="medications" value={formData.medications} onChange={handleChange} rows="3"></textarea>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Hair Goals */}
                    {currentStep === 5 && (
                        <div className="form-step">
                            <h2>Hair Goals</h2>
                            <p>Select all that apply:</p>
                            <div className="checkbox-group">
                                <label><input type="checkbox" name="reduceHairFall" checked={formData.reduceHairFall} onChange={handleCheckboxChange} /> Reduce Hair Fall</label>
                                <label><input type="checkbox" name="regrowHair" checked={formData.regrowHair} onChange={handleCheckboxChange} /> Regrow Hair / Improve Density</label>
                                <label><input type="checkbox" name="controlDandruff" checked={formData.controlDandruff} onChange={handleCheckboxChange} /> Control Dandruff</label>
                                <label><input type="checkbox" name="smoothShiny" checked={formData.smoothShiny} onChange={handleCheckboxChange} /> Smooth & Shiny Hair</label>
                                <label><input type="checkbox" name="colorStyle" checked={formData.colorStyle} onChange={handleCheckboxChange} /> Colour / Style Safely</label>
                                <label><input type="checkbox" name="healthyScalp" checked={formData.healthyScalp} onChange={handleCheckboxChange} /> Overall Healthy Scalp</label>
                            </div>
                        </div>
                    )}

                    {/* Step 6: Declaration */}
                    {currentStep === 6 && (
                        <div className="form-step">
                            <h2>Declaration</h2>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleCheckboxChange} required />
                                    I confirm that the above details are true to the best of my knowledge and consent to undergo hair/scalp consultation and suggested treatments. *
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="form-navigation">
                        {currentStep > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous Step</button>}
                        {currentStep < 6 && <button type="button" className="btn" onClick={nextStep} style={{marginLeft: 'auto'}}>Next Step</button>}
                        {currentStep === 6 && <button type="submit" className="btn" style={{marginLeft: 'auto'}} disabled={!formData.declaration}>Submit My Consultation</button>}
                    </div>
                </form>
            </div>
        </>
    );
};

export default HairTestPage;