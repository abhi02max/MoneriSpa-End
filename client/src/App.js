import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import OurStoryPage from './pages/OurStoryPage';
import HairSanctuaryPage from './pages/HairSanctuaryPage';
import SkinAndSoulPage from './pages/SkinAndSoulPage';
import OurCoursesPage from './pages/OurCoursesPage';
import BeautyJournalPage from './pages/BeautyJournalPage';
import HairTestPage from './pages/HairTestPage';
import SkinTestPage from './pages/SkinTestPage';
import './App.css'; 

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/hair-sanctuary" element={<HairSanctuaryPage />} />
            <Route path="/skin-and-soul" element={<SkinAndSoulPage />} />
            <Route path="/courses" element={<OurCoursesPage />} />
            <Route path="/beauty-journal" element={<BeautyJournalPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="/hair-consultation" element={<HairTestPage />} />
            <Route path="/skin-consultation" element={<SkinTestPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;