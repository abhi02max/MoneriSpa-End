import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaWind, FaSpa, FaMoon } from 'react-icons/fa';

const HairSanctuaryPage = () => {
  return (
    <>
      <Helmet>
        <title>Hair Treatment Services in Kolkata - The Hair Sanctuary | Moneri Spa & Academy</title>
        <meta name="description" content="Professional hair treatments in Kolkata at The Hair Sanctuary. Keratin therapy, hair spa, scalp treatments, and hair styling services for women. Book your consultation today!" />
        <meta name="keywords" content="hair treatment kolkata, keratin therapy kolkata, hair spa kolkata, scalp treatment kolkata, hair styling kolkata, professional hair care kolkata" />
        <link rel="canonical" href="https://monerispaacademy.in/hair-sanctuary" />
      </Helmet>
      <div className="page-header">
        <h1>The Hair Sanctuary</h1>
        <p>Where artistry and hair wellness unite to reveal your most radiant self.</p>
      </div>
      <div className="content-wrapper bg-alabaster">
        <div className="container" style={{textAlign: 'center'}}>
          <h2>Signature Hair Spa Rituals</h2>
          <p className="section-subtitle">Each treatment is a bespoke experience, crafted to address your unique hair needs and goals.</p>
          <div className="feature-grid">
            <div className="content-card">
                <div className="card-content">
                    <FaSpa size={40} color="var(--gold-leaf)" style={{marginBottom: '1rem'}}/>
                    <h3>Liquid Gold Keratin Therapy</h3>
                    <p>Transform frizzy, unmanageable hair into a smooth, silky masterpiece. Our formaldehyde-free Keratin treatment infuses each strand with powerful proteins, eliminating frizz for months while adding incredible shine and strength.</p>
                </div>
            </div>
            <div className="content-card">
                <div className="card-content">
                    <FaMoon size={40} color="var(--gold-leaf)" style={{marginBottom: '1rem'}}/>
                    <h3>Himalayan Scalp Detox</h3>
                    <p>True hair health begins at the root. This purifying ritual uses a blend of Himalayan pink salt and nourishing oils to exfoliate the scalp, removing product buildup and stimulating circulation for vibrant, healthy growth.</p>
                </div>
            </div>
            <div className="content-card">
                <div className="card-content">
                    <FaWind size={40} color="var(--gold-leaf)" style={{marginBottom: '1rem'}}/>
                    <h3>Olaplex Bond Repair</h3>
                    <p>An intensive treatment that rebuilds the broken bonds in your hair caused by chemical, thermal, and mechanical damage. Ideal for colored or heat-styled hair, restoring it to a virgin-like state of health.</p>
                </div>
            </div>
          </div>
          <div style={{marginTop: '4rem'}}>
            <h3>Ready for Your Transformation?</h3>
            <p className="section-subtitle">Let our experts guide you to the perfect solution.</p>
            <Link to="/hair-consultation" className="btn">Book a Hair Consultation</Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default HairSanctuaryPage;