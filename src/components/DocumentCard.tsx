import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import type { DocumentInfo } from '../data/documents';
import { useLanguage } from '../context/LanguageContext';
import './DocumentCard.css';

interface DocumentCardProps {
  document: DocumentInfo;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const IconComponent = (LucideIcons as any)[document.iconName] || LucideIcons.FileText;
  const { language, t } = useLanguage();

  const visibleServices = document.services.slice(0, 3);
  const extraCount = document.services.length - 3;

  return (
    <div className="doc-card">
      <div className="doc-card-header">
        <div className="doc-icon-wrapper">
          <IconComponent size={24} />
        </div>
        <div className="doc-title-group">
          <h3 className="doc-title">{language === 'HI' ? document.titleHi : document.title}</h3>
          {language === 'EN' && <span className="doc-title-hi">{document.titleHi}</span>}
        </div>
      </div>
      
      <p className="doc-desc">{document.description}</p>

      <div className="service-chips">
        {visibleServices.map(svc => {
          const SvcIcon = (LucideIcons as any)[svc.iconName] || LucideIcons.FileText;
          return (
            <span className="service-chip" key={svc.id} title={svc.description}>
              <SvcIcon size={12} />
              {language === 'HI' ? svc.labelHi : svc.label}
            </span>
          );
        })}
        {extraCount > 0 && (
          <span className="service-chip service-chip-more">+{extraCount} more</span>
        )}
      </div>
      
      <div className="doc-actions">
        <Link to={`/guides/${document.id}`} className="doc-btn doc-btn-apply">
          {t('card.applyGuide')}
        </Link>
        <Link to={`/status?doc=${document.id}`} className="doc-btn doc-btn-status">
          {t('card.status')}
        </Link>
      </div>
    </div>
  );
};
