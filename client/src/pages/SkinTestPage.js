import React, { useState } from 'react';
import { apiService } from '../utils/api';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const SkinTestPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', age: '', gender: '', contactNumber: '', email: '',
        skinType: '', concerns: {}, otherConcern: '',
        allergies: 'No', allergiesDetails: '', medication: 'No', medicationDetails: '',
        sunExposure: '', usesSunscreen: 'No',
        currentRoutine: { cleanser: '', moisturizer: '', sunscreen: '', treatments: '' },
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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

    const steps = ['Info', 'Concerns', 'Lifestyle', 'Routine'];

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
                    {/* All form steps are rendered here based on currentStep */}
                    <div className="form-navigation">
                        {currentStep > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous Step</button>}
                        {currentStep < 4 && <button type="button" className="btn" onClick={nextStep} style={{marginLeft: 'auto'}}>Next Step</button>}
                        {currentStep === 4 && <button type="submit" className="btn" style={{marginLeft: 'auto'}}>Submit My Consultation</button>}
                    </div>
                </form>
            </div>
        </>
    );
};
export default SkinTestPage;