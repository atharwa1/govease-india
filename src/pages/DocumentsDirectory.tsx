import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { DocumentCard } from '../components/DocumentCard';
import { documentsData, type DocumentCategory } from '../data/documents';
import './DocumentsDirectory.css';

export const DocumentsDirectory: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | 'All'>('All');

  const categories: (DocumentCategory | 'All')[] = ['All', 'Identity', 'Transport', 'Finance', 'Welfare'];

  const filteredDocs = documentsData.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="directory-page">
      <div className="container">
        <h1 className="section-title" style={{ fontSize: '2rem', fontWeight: 800 }}>All Government Services</h1>
        <p className="directory-subtitle">Browse and find the document service you need.</p>
        
        {/* Filters and Search */}
        <div className="directory-filters">
          <div className="directory-search-wrapper">
            <Search className="directory-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="directory-search-input"
              id="directory-search"
            />
          </div>

          <div className="category-pills">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                id={`filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredDocs.length > 0 ? (
          <div className="docs-grid">
            {filteredDocs.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        ) : (
          <div className="directory-empty">
            <p className="directory-empty-title">No documents found.</p>
            <p>Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
