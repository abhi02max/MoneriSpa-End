import React from 'react';
import { Link } from 'react-router-dom';
import { FaCertificate, FaCut, FaPaintBrush } from 'react-icons/fa';

const OurCoursesPage = () => {
    return (
        <>
            <div className="page-header">
                <h1>The Academy</h1>
                <p>Empowering the next generation of beauty and wellness professionals.</p>
            </div>
            <div className="content-wrapper bg-alabaster">
                <div className="container" style={{textAlign: 'center'}}>
                    <h2>Our Professional Courses</h2>
                    <p className="section-subtitle">
                        At Moneri Academy, we don't just teach techniques; we cultivate artists. Our courses are designed for intensive, hands-on training, blending artistic passion with industry-leading standards.
                    </p>
                    <div className="feature-grid">
                        <div className="content-card">
                            <div className="card-content">
                                <div className="card-tag">Diploma</div>
                                <h3>Advanced Cosmetology</h3>
                                <div className="card-details">
                                    <span><FaCertificate /> Professional Certification</span>
                                </div>
                                <p>A comprehensive journey covering everything from advanced skincare and hair science to salon management. This course is your launchpad to becoming a leader in the beauty industry.</p>
                                <Link to="#" className="btn">Learn More & Enroll</Link>
                            </div>
                        </div>
                        <div className="content-card">
                            <div className="card-content">
                                <div className="card-tag">Certificate</div>
                                <h3>Professional Makeup Artistry</h3>
                                <div className="card-details">
                                    <span><FaPaintBrush /> For All Skill Levels</span>
                                </div>
                                <p>Master the art of makeup, from bridal and editorial looks to special effects. Our curriculum focuses on creativity, precision, and building a professional portfolio to kickstart your career.</p>
                                <Link to="#" className="btn">Learn More & Enroll</Link>
                            </div>
                        </div>
                        <div className="content-card">
                             <div className="card-content">
                                <div className="card-tag">Workshop</div>
                                <h3>Modern Hair Styling</h3>
                                <div className="card-details">
                                    <span><FaCut /> Intermediate Level</span>
                                </div>
                                <p>Stay ahead of the trends with our intensive workshop on modern cutting, coloring, and styling techniques. Perfect for existing stylists looking to upgrade their skills.</p>
                                <Link to="#" className="btn">Learn More & Enroll</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default OurCoursesPage;