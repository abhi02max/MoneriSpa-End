import React from 'react';
import { FaHeart, FaLeaf, FaStar } from 'react-icons/fa';
import suja from '../assets/Sujata.jpg';
const OurStoryPage = () => {
  return (
    <>
      <div className="page-header">
        <h1>The Heart of Moneri</h1>
        <p>Discover the vision and passion that brought our sanctuary to life.</p>
      </div>
      <div className="philosophy-section-wrapper bg-alabaster">
        <div className="container">
          <div className="philosophy-content">
            <div className="philosophy-text">
              <h2>A Founder's Dream</h2>
              <p>Moneri Spa & Academy was born from the vision of our founder, Sujata Mandal. With over 15 years in the wellness industry, Sujata dreamed of a space where women could not only receive world-class treatments but also feel deeply seen, cared for, and empowered.</p>
              <p>She envisioned a haven that blended the precision of modern aesthetic science with the timeless wisdom of holistic healing. It wasn't just about beauty; it was about creating moments of profound peace and confidence.</p>
            </div>
            <div className="philosophy-image">
              <img src={suja} alt="Founder of Moneri Spa, Sujata Mandal" />
            </div>
          </div>
        </div>
      </div>
      <div className="content-wrapper bg-dusty-rose">
        <div className="container" style={{textAlign: 'center'}}>
            <h2>Our Commitment</h2>
            <p className="section-subtitle">We are dedicated to an experience that nurtures your well-being from the inside out.</p>
            <div className="feature-grid">
                <div className="content-card">
                    <div className="card-content">
                        <FaStar size={40} color="var(--gold-leaf)" style={{marginBottom: '1rem'}}/>
                        <h3>Excellence in Service</h3>
                        <p>Our team of certified professionals is committed to the highest standards of care, ensuring every treatment is personalized and effective.</p>
                    </div>
                </div>
                 <div className="content-card">
                    <div className="card-content">
                        <FaLeaf size={40} color="var(--gold-leaf)" style={{marginBottom: '1rem'}}/>
                        <h3>Premium & Safe Products</h3>
                        <p>We exclusively use industry-leading, high-quality products that are safe, gentle, and deliver exceptional results for your skin and hair.</p>
                    </div>
                </div>
                 <div className="content-card">
                    <div className="card-content">
                        <FaHeart size={40} color="var(--gold-leaf)" style={{marginBottom: '1rem'}}/>
                        <h3>A Serene Atmosphere</h3>
                        <p>Every detail of our space, from the calming aromas to the tranquil decor, is designed to be a peaceful escape from the everyday.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};
export default OurStoryPage;