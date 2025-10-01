import React, { useState, useEffect } from 'react';
import { apiService } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setError(null);
      const { data } = await apiService.get('/gallery');
      setImages(data);
    } catch (err) {
      console.error("Could not fetch images.", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>Our Gallery</h1>
        <p>A glimpse into the serenity, beauty, and transformations we create.</p>
      </div>
      <div className="content-wrapper bg-alabaster">
        <div className="container">
            {loading ? (
                <LoadingSpinner text="Loading Gallery..." />
            ) : error ? (
                <ErrorMessage 
                    message={error} 
                    onRetry={fetchImages}
                    retryText="Retry Loading Gallery"
                />
            ) : images.length > 0 ? (
                <div className="gallery-page-grid">
                    {images.map((image) => (
                    <div key={image._id} className="gallery-card">
                        <img 
                            src={image.imageUrl} 
                            alt={image.tagline || 'Moneri Spa Gallery Image'}
                            loading="lazy"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <div style={{display: 'none', padding: '2rem', textAlign: 'center', color: '#666'}}>
                            Image failed to load
                        </div>
                        <div className={image.tagline ? 'tagline' : 'no-tagline'}>
                        <p>"{image.tagline}"</p>
                        </div>
                    </div>
                    ))}
                </div>
            ) : (
                <div style={{textAlign: 'center'}}>
                    <h2>Our Gallery is Waiting for New Additions</h2>
                    <p>The owner will be uploading new images soon. Check back to see our latest work!</p>
                </div>
            )}
        </div>
      </div>
    </>
  );
};
export default GalleryPage;