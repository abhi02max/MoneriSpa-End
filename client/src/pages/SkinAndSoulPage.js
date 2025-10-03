import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaCheckCircle } from 'react-icons/fa';
import cell from '../assets/cellular.png';
import pear from '../assets/pearl.png';

const SkinAndSoulPage = () => {
    return (
        <>
            <Helmet>
                <title>Skin Care Services in Kolkata - The Skin & Soul Studio | Moneri Spa & Academy</title>
                <meta name="description" content="Professional skin care treatments in Kolkata at The Skin & Soul Studio. Advanced facials, anti-aging treatments, and skin rejuvenation services for women. Book your consultation!" />
                <meta name="keywords" content="skin care kolkata, facial treatment kolkata, anti aging kolkata, skin rejuvenation kolkata, professional facial kolkata, skin therapy kolkata" />
                <link rel="canonical" href="https://monerispaacademy.in/skin-and-soul" />
            </Helmet>
            <div className="page-header">
                <h1>The Skin & Soul Studio</h1>
                <p>Where advanced science meets pure serenity to unveil your natural radiance.</p>
            </div>
            <div className="content-wrapper bg-alabaster">
                <div className="container">
                    <div className="feature-panel" style={{marginBottom: '6rem'}}>
                        <div className="feature-panel-image">
                            <img src={cell} alt="Cellular Renewal Ritual (HydraFacial)" />
                        </div>
                        <div className="feature-panel-text">
                            <span className="tag">Advanced Facial</span>
                            <h2>Cellular Renewal Ritual</h2>
                            <p>Experience the pinnacle of non-invasive skin resurfacing. Our HydraFacial technology cleanses, exfoliates, extracts, and hydrates simultaneously, delivering instant results with no downtime.</p>
                            <ul className="benefits-list">
                                <li><span className="icon"><FaCheckCircle /></span> Instantly brightens dull skin</li>
                                <li><span className="icon"><FaCheckCircle /></span> Minimizes the appearance of pores</li>
                                <li><span className="icon"><FaCheckCircle /></span> Smooths fine lines and texture</li>
                            </ul>
                        </div>
                    </div>
                    <div className="feature-panel reverse" style={{marginBottom: '6rem'}}>
                        <div className="feature-panel-image">
                            <img src={pear} alt="The Pearl Radiance Facial" />
                        </div>
                        <div className="feature-panel-text">
                            <span className="tag">Brightening Facial</span>
                            <h2>The Pearl Radiance Facial</h2>
                            <p>Unveil your inner glow with this luxurious treatment. Using potent Vitamin C and pearl extracts, this facial targets dullness and pigmentation, brightens the complexion, and infuses the skin with powerful antioxidants.</p>
                            <ul className="benefits-list">
                                <li><span className="icon"><FaCheckCircle /></span> Reduces dark spots and pigmentation</li>
                                <li><span className="icon"><FaCheckCircle /></span> Boosts collagen for a firmer feel</li>
                                <li><span className="icon"><FaCheckCircle /></span> Leaves skin utterly luminous</li>
                            </ul>
                        </div>
                    </div>
                    <div className="final-cta-section">
                        <h2>Begin Your Journey to Flawless Skin</h2>
                        <p>Not sure which treatment is right for you? Let our expert aestheticians create a personalized skincare plan based on your unique goals and concerns.</p>
                        <Link to="/skin-consultation" className="btn">Book a Full Consultation</Link>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SkinAndSoulPage;