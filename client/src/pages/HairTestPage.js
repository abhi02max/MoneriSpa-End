import React, { useState } from 'react';
import { apiService } from '../utils/api';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HairTestPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', age: '', gender: '', contactNumber: '', email: '',
        concerns: {}, otherConcern: '',
        issueDuration: '', treatments: {}, usesHairOil: '',
        stressLevel: '', sleepPattern: '', dietType: '', waterIntake: '',
        healthConditions: '', medications: '',
        hairGoals: {},
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e, category) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [category]: { ...prev[category], [name]: checked }
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

    const steps = ['Info', 'Concerns', 'Lifestyle', 'Goals'];

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
export default HairTestPage;