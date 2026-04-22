import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileEdit, CheckCircle, Download, Zap } from 'lucide-react';
import { DocumentCard } from '../components/DocumentCard';
import { documentsData } from '../data/documents';
import './Home.css';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/documents?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularDocs = documentsData.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="hero-badge">
            <Zap size={14} />
            One Portal, All Services
          </div>
          <h1 className="hero-title">
            Government Services, <span>Simplified</span>.
          </h1>
          <p className="hero-subtitle">
            Apply, track, and download essential Indian government documents in one unified portal. No jargon, no unnecessary redirects.
          </p>
          
          <form className="search-container" onSubmit={handleSearch} id="hero-search-form">
            <Search className="search-icon" size={22} />
            <input
              type="text"
              className="search-input"
              placeholder="E.g., Apply for PAN Card, Check DL Status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="hero-search-input"
            />
          </form>

          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-number">11+</div>
              <div className="stat-label">Services</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Free to Use</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Ads</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section" id="quick-actions">
        <div className="container">
          <h2 className="section-title">What do you want to do?</h2>
          <div className="quick-actions-grid">
            <div className="action-card" onClick={() => navigate('/documents')} id="action-apply">
              <div className="action-icon-wrapper">
                <FileEdit size={28} />
              </div>
              <div>
                <h3 className="action-title">Apply for New</h3>
                <p className="action-subtitle">Get a new document issued</p>
              </div>
            </div>
            
            <div className="action-card" onClick={() => navigate('/status')} id="action-status">
              <div className="action-icon-wrapper">
                <CheckCircle size={28} />
              </div>
              <div>
                <h3 className="action-title">Check Status</h3>
                <p className="action-subtitle">Track your application</p>
              </div>
            </div>
            
            <div className="action-card" onClick={() => navigate('/documents')} id="action-download">
              <div className="action-icon-wrapper">
                <Download size={28} />
              </div>
              <div>
                <h3 className="action-title">Download</h3>
                <p className="action-subtitle">Get digital copy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Documents */}
      <section className="popular-docs-section" id="popular-services">
        <div className="container">
          <h2 className="section-title">Most Requested Services</h2>
          <div className="docs-grid">
            {popularDocs.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <button className="btn btn-outline" onClick={() => navigate('/documents')} id="view-all-btn">
              View All Services →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
