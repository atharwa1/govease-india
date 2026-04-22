import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import type { DocumentInfo } from '../data/documents';
import './DocumentCard.css';

interface DocumentCardProps {
  document: DocumentInfo;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  // Dynamically get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[document.iconName] || LucideIcons.FileText;

  return (
    <div className="doc-card">
      <div className="doc-card-header">
        <div className="doc-icon-wrapper">
          <IconComponent size={24} />
        </div>
        <div className="doc-title-group">
          <h3 className="doc-title">{document.title}</h3>
          <span className="doc-title-hi">{document.titleHi}</span>
        </div>
      </div>
      
      <p className="doc-desc">{document.description}</p>
      
      <div className="doc-actions">
        <Link to={`/guides/${document.id}`} className="doc-btn doc-btn-apply">
          Apply / Guide
        </Link>
        <Link to={`/status?doc=${document.id}`} className="doc-btn doc-btn-status">
          Status
        </Link>
      </div>
    </div>
  );
};
