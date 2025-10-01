import React, { useState, useEffect, useCallback } from 'react';
import { apiService } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { FaImages, FaCloudUploadAlt, FaTrash, FaSignOutAlt, FaCheckCircle } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AdminDashboardPage = () => {
  const [adminName, setAdminName] = useState('Admin');
  const [recentImages, setRecentImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [message, setMessage] = useState('');
  const [tagline, setTagline] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const { data: allImages } = await apiService.get('/gallery');
      const { data: recent } = await apiService.get('/gallery?limit=5');
      setImageCount(allImages.length);
      setRecentImages(recent);
    } catch (error) { 
      console.error("Failed to fetch data", error);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) navigate('/admin');
    else {
      setAdminName(JSON.parse(adminInfo).username);
      fetchData();
    }
  }, [navigate, fetchData]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedFileName(file.name);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      setSelectedFileName(file.name);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return;

    setLoading(true);
    setError(null);
    setMessage('Uploading...');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('tagline', tagline || '');

    try {
      const response = await apiService.upload('/gallery/upload', formData, (progress) => {
        setUploadProgress(progress);
      });
      
      setMessage('Image uploaded successfully!');
      setTagline('');
      setImageFile(null);
      setSelectedFileName('');
      setUploadProgress(0);
      fetchData();
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.message);
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      setError(null);
      await apiService.delete(`/gallery/${imageId}`);
      setMessage('Image deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Delete failed:', error);
      setError(error.message);
      setMessage(`Delete failed: ${error.message}`);
    }
  };

  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <span>Welcome, {adminName}</span>
            <button onClick={handleLogout} className="btn btn-outline">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="admin-content-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <FaImages className="card-icon" />
            <h3>Gallery Statistics</h3>
          </div>
          <div className="card-content">
            <div className="stat">
              <span className="stat-number">{imageCount}</span>
              <span className="stat-label">Total Images</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <FaCloudUploadAlt className="card-icon" />
            <h3>Upload New Image</h3>
          </div>
          <div className="card-content">
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label>Image Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Enter image description (optional)..."
                />
              </div>
              
              <div 
                className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  id="file-input"
                />
                <label htmlFor="file-input" className="file-upload-label">
                  {selectedFileName ? (
                    <div>
                      <FaCheckCircle className="upload-icon" />
                      <p>{selectedFileName}</p>
                      <span>Click to change</span>
                    </div>
                  ) : (
                    <div>
                      <FaCloudUploadAlt className="upload-icon" />
                      <p>Drag & drop an image here</p>
                      <span>or click to browse</span>
                    </div>
                  )}
                </label>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!imageFile}
              >
                Upload Image
              </button>
            </form>
          </div>
        </div>

        <div className="dashboard-card recent-images">
          <div className="card-header">
            <FaImages className="card-icon" />
            <h3>Recent Images</h3>
          </div>
          <div className="card-content">
            {recentImages.length === 0 ? (
              <p className="no-images">No images uploaded yet.</p>
            ) : (
              <div className="image-grid">
                {recentImages.map((image) => (
                  <div key={image._id} className="image-item">
                    <img src={image.imageUrl} alt={image.tagline} />
                    <div className="image-overlay">
                      <p>{image.tagline}</p>
                      <button 
                        onClick={() => handleDelete(image._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {message && (
        <div className="message-toast">
          {message}
        </div>
      )}
    </div>
  );
};
export default AdminDashboardPage;