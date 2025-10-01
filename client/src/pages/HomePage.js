import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import spa from '../assets/spavideo.mp4';
import fir from '../assets/first.jpg';
import mid from '../assets/middle.avif';
import thi from '../assets/third.jpg';
import interior from '../assets/salon.jpg';

const useScrollAnimation = () => {
  const observer = useRef();
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.current.observe(el));
    return () => observer.current.disconnect();
  }, []);
};

const HomePage = () => {
  useScrollAnimation();
  return (
    <>
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline poster="fallback-image.jpg">
          <source src={spa} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content reveal">
          <h1>Elegance in Experience</h1>
          <p>An exclusive sanctuary for women, dedicated to holistic beauty, wellness, and empowerment.</p>
        </div>
      </section>

      <section className="home-section bg-alabaster">
        <div className="container">
          <h2 className="reveal">Begin Your Transformation</h2>
          <p className="section-subtitle reveal">
            Your journey to revitalization starts with a single step. Let our experts curate a personalized treatment plan for your most pressing hair and skin concerns.
          </p>
          <div className="reveal" style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
            <Link to="/hair-consultation" className="btn">Book Hair Consultation</Link>
            <Link to="/skin-consultation" className="btn">Book Skin Consultation</Link>
          </div>
        </div>
      </section>

      <section className="home-section bg-dusty-rose">
        <div className="container">
            <h2 className="reveal">Discover Our Sanctuaries</h2>
            <p className="section-subtitle reveal">
              Explore our curated experiences, each designed to nurture, restore, and beautify from head to toe.
            </p>
            <div className="feature-grid">
                <div className="content-card reveal" style={{transitionDelay: '0s'}}>
                    <div className="card-image-wrapper"><img src={fir} alt="Hair Treatment"/></div>
                    <div className="card-content">
                        <h3>The Hair Sanctuary</h3>
                        <p>From revitalizing spas that breathe life into your locks to artistic styling that expresses your personality, discover the pinnacle of hair care.</p>
                        <Link to="/hair-sanctuary" className="btn">Explore Hair Services</Link>
                    </div>
                </div>
                <div className="content-card reveal" style={{transitionDelay: '0.2s'}}>
                    <div className="card-image-wrapper"><img src={mid} alt="Skin Treatment"/></div>
                    <div className="card-content">
                        <h3>The Skin & Soul Studio</h3>
                        <p>Unveil a luminous complexion with our advanced facials, designed to purify, rejuvenate, and restore your natural glow.</p>
                        <Link to="/skin-and-soul" className="btn">Explore Skin Services</Link>
                    </div>
                </div>
                <div className="content-card reveal" style={{transitionDelay: '0.4s'}}>
                    <div className="card-image-wrapper"><img src={thi} alt="Massage Therapy"/></div>
                    <div className="card-content">
                        <h3>The Relaxation Retreat</h3>
                        <p>Melt away the stress of the world with our therapeutic massages, expertly delivered to release tension, soothe muscles, and calm the mind.</p>
                        <Link to="#" className="btn">Discover Massages</Link>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      <div className="philosophy-section-wrapper bg-alabaster">
        <div className="container">
          <div className="philosophy-content">
            <div className="philosophy-text reveal">
              <h2>The Moneri Philosophy</h2>
              <p>We believe that true beauty is a reflection of inner wellness. It's not just about the services we provide; it's about the space we create—a space where you can disconnect from the world, reconnect with yourself, and emerge feeling confident, refreshed, and empowered.</p>
              <Link to="/our-story" className="btn">Read Our Story</Link>
            </div>
            <div className="philosophy-image reveal">
              <img src={interior} alt="Calm spa interior" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;