import React, { useState } from 'react';
import { apiService } from '../utils/api';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const SkinTestPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Client Information
        name: '', age: '', gender: '', contactNumber: '', email: '', date: '',
        // Skin Type
        skinType: '',
        // Skin Concerns
        acne: false, pigmentation: false, fineLines: false, dullness: false,
        redness: false, largePores: false, unevenTone: false, darkCircles: false,
        dehydration: false, otherConcern: '',
        // Medical & Lifestyle History
        allergies: 'No', allergiesDetails: '', medication: 'No', medicationDetails: '',
        skinConditions: 'No', skinConditionsDetails: '', sunExposure: '', usesSunscreen: 'No',
        healthConcerns: 'No', healthConcernsDetails: '',
        // Current Skin Routine
        cleanser: '', moisturizer: '', sunscreen: '', treatments: '',
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
            const response = await apiService.post('/submissions/skin', formData);
            setMessage(response.data.message);
        } catch (error) {
            setError(error.message);
            setMessage('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const steps = ['Client Info', 'Skin Type & Concerns', 'Medical History', 'Current Routine', 'Declaration'];

    if (message === 'Form submitted successfully!') {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                <h1>🌸 Thank You! 🌸</h1>
                <p>Your skin consultation form has been received. Our specialists will contact you shortly.</p>
                <Link to="/" className="btn" style={{ marginTop: '2rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <h1>Skin Consultation Form</h1>
                <p>Your journey to radiant skin begins here. Please provide the following details.</p>
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
                                <label htmlFor="email">Email ID *</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date *</label>
                                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Skin Type & Concerns */}
                    {currentStep === 2 && (
                        <div className="form-step">
                            <h2>Skin Type & Concerns</h2>
                            <div className="form-group">
                                <label>Skin Type (Select one) *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="skinType" value="Normal" checked={formData.skinType === 'Normal'} onChange={handleChange} /> Normal</label>
                                    <label><input type="radio" name="skinType" value="Dry" checked={formData.skinType === 'Dry'} onChange={handleChange} /> Dry</label>
                                    <label><input type="radio" name="skinType" value="Oily" checked={formData.skinType === 'Oily'} onChange={handleChange} /> Oily</label>
                                    <label><input type="radio" name="skinType" value="Combination" checked={formData.skinType === 'Combination'} onChange={handleChange} /> Combination</label>
                                    <label><input type="radio" name="skinType" value="Sensitive" checked={formData.skinType === 'Sensitive'} onChange={handleChange} /> Sensitive</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Skin Concerns (Select all that apply)</label>
                                <div className="checkbox-group">
                                    <label><input type="checkbox" name="acne" checked={formData.acne} onChange={handleCheckboxChange} /> Acne / Pimples</label>
                                    <label><input type="checkbox" name="pigmentation" checked={formData.pigmentation} onChange={handleCheckboxChange} /> Pigmentation / Dark Spots</label>
                                    <label><input type="checkbox" name="fineLines" checked={formData.fineLines} onChange={handleCheckboxChange} /> Fine Lines / Wrinkles</label>
                                    <label><input type="checkbox" name="dullness" checked={formData.dullness} onChange={handleCheckboxChange} /> Dullness</label>
                                    <label><input type="checkbox" name="redness" checked={formData.redness} onChange={handleCheckboxChange} /> Redness / Irritation</label>
                                    <label><input type="checkbox" name="largePores" checked={formData.largePores} onChange={handleCheckboxChange} /> Large Pores</label>
                                    <label><input type="checkbox" name="unevenTone" checked={formData.unevenTone} onChange={handleCheckboxChange} /> Uneven Skin Tone</label>
                                    <label><input type="checkbox" name="darkCircles" checked={formData.darkCircles} onChange={handleCheckboxChange} /> Dark Circles</label>
                                    <label><input type="checkbox" name="dehydration" checked={formData.dehydration} onChange={handleCheckboxChange} /> Dehydration</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="otherConcern">Other (please specify):</label>
                                <input type="text" id="otherConcern" name="otherConcern" value={formData.otherConcern} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Medical & Lifestyle History */}
                    {currentStep === 3 && (
                        <div className="form-step">
                            <h2>Medical & Lifestyle History</h2>
                            <div className="form-group">
                                <label>Do you have any allergies (cosmetics, medicines, food)? *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="allergies" value="Yes" checked={formData.allergies === 'Yes'} onChange={handleChange} /> Yes</label>
                                    <label><input type="radio" name="allergies" value="No" checked={formData.allergies === 'No'} onChange={handleChange} /> No</label>
                                </div>
                                {formData.allergies === 'Yes' && (
                                    <div className="form-group">
                                        <label htmlFor="allergiesDetails">If yes, please specify:</label>
                                        <textarea id="allergiesDetails" name="allergiesDetails" value={formData.allergiesDetails} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Are you currently on any medication? *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="medication" value="Yes" checked={formData.medication === 'Yes'} onChange={handleChange} /> Yes</label>
                                    <label><input type="radio" name="medication" value="No" checked={formData.medication === 'No'} onChange={handleChange} /> No</label>
                                </div>
                                {formData.medication === 'Yes' && (
                                    <div className="form-group">
                                        <label htmlFor="medicationDetails">If yes, please mention:</label>
                                        <textarea id="medicationDetails" name="medicationDetails" value={formData.medicationDetails} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Do you have a history of skin conditions (eczema, psoriasis, dermatitis, etc.)? *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="skinConditions" value="Yes" checked={formData.skinConditions === 'Yes'} onChange={handleChange} /> Yes</label>
                                    <label><input type="radio" name="skinConditions" value="No" checked={formData.skinConditions === 'No'} onChange={handleChange} /> No</label>
                                </div>
                                {formData.skinConditions === 'Yes' && (
                                    <div className="form-group">
                                        <label htmlFor="skinConditionsDetails">Please specify:</label>
                                        <textarea id="skinConditionsDetails" name="skinConditionsDetails" value={formData.skinConditionsDetails} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>How often do you experience sun exposure? *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="sunExposure" value="Rarely" checked={formData.sunExposure === 'Rarely'} onChange={handleChange} /> Rarely</label>
                                    <label><input type="radio" name="sunExposure" value="Sometimes" checked={formData.sunExposure === 'Sometimes'} onChange={handleChange} /> Sometimes</label>
                                    <label><input type="radio" name="sunExposure" value="Daily" checked={formData.sunExposure === 'Daily'} onChange={handleChange} /> Daily</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Do you use sunscreen regularly? *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="usesSunscreen" value="Yes" checked={formData.usesSunscreen === 'Yes'} onChange={handleChange} /> Yes</label>
                                    <label><input type="radio" name="usesSunscreen" value="No" checked={formData.usesSunscreen === 'No'} onChange={handleChange} /> No</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Do you have any ongoing health concerns (hormonal, thyroid, PCOS, etc.)? *</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="healthConcerns" value="Yes" checked={formData.healthConcerns === 'Yes'} onChange={handleChange} /> Yes</label>
                                    <label><input type="radio" name="healthConcerns" value="No" checked={formData.healthConcerns === 'No'} onChange={handleChange} /> No</label>
                                </div>
                                {formData.healthConcerns === 'Yes' && (
                                    <div className="form-group">
                                        <label htmlFor="healthConcernsDetails">Please specify:</label>
                                        <textarea id="healthConcernsDetails" name="healthConcernsDetails" value={formData.healthConcernsDetails} onChange={handleChange} rows="3"></textarea>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Current Skin Routine */}
                    {currentStep === 4 && (
                        <div className="form-step">
                            <h2>Current Skin Routine</h2>
                            <div className="form-group">
                                <label htmlFor="cleanser">Cleanser:</label>
                                <input type="text" id="cleanser" name="cleanser" value={formData.cleanser} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="moisturizer">Moisturizer:</label>
                                <input type="text" id="moisturizer" name="moisturizer" value={formData.moisturizer} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sunscreen">Sunscreen:</label>
                                <input type="text" id="sunscreen" name="sunscreen" value={formData.sunscreen} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="treatments">Treatments (serums/medications):</label>
                                <textarea id="treatments" name="treatments" value={formData.treatments} onChange={handleChange} rows="3"></textarea>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Declaration */}
                    {currentStep === 5 && (
                        <div className="form-step">
                            <h2>Declaration</h2>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleCheckboxChange} required />
                                    I hereby declare that the above information is true to the best of my knowledge. I understand that skin treatments may have different results depending on my skin type and condition. *
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="form-navigation">
                        {currentStep > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous Step</button>}
                        {currentStep < 5 && <button type="button" className="btn" onClick={nextStep} style={{marginLeft: 'auto'}}>Next Step</button>}
                        {currentStep === 5 && <button type="submit" className="btn" style={{marginLeft: 'auto'}} disabled={!formData.declaration}>Submit My Consultation</button>}
                    </div>
                </form>
            </div>
        </>
    );
};
export default SkinTestPage;