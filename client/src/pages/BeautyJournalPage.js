import React from 'react';
import { Link } from 'react-router-dom';
import way from '../assets/5ways.png';
import kera from '../assets/keratin.png';

const BeautyJournalPage = () => {
    const posts = [
        { id: 1, title: "5 Ways to Maintain Your Post-Facial Glow", category: "Skincare", image: way },
        { id: 2, title: "Is a Keratin Treatment Right For Your Hair Type?", category: "Hair Care", image: kera },
        { id: 3, title: "Self-Care Rituals: Creating a Spa Experience at Home", category: "Wellness", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2940&auto=format&fit=crop" },
    ];

    return (
        <>
            <div className="page-header">
                <h1>The Beauty Journal</h1>
                <p>Your source for expert advice, wellness tips, and inspiration from the Moneri team.</p>
            </div>
            <div className="content-wrapper bg-alabaster">
                <div className="container">
                     <div className="feature-grid">
                        {posts.map(post => (
                            <div key={post.id} className="content-card">
                                <div className="card-image-wrapper">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="card-content">
                                    <div className="card-tag">{post.category}</div>
                                    <h3>{post.title}</h3>
                                    <p>Discover our expert tips and tricks to elevate your beauty routine and enhance your well-being...</p>
                                    <Link to="#" className="btn">Read More</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default BeautyJournalPage;