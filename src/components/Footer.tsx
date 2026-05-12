import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '3rem 0 1.5rem', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ minWidth: '200px', maxWidth: '320px', flex: '1 1 280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
              <ShieldCheck size={24} />
              <span>GoEase India</span>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              {t('footer.description')}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', flex: '1 1 auto' }}>
            <div style={{ minWidth: '120px' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9375rem' }}>{t('footer.quickLinks')}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <li><Link to="/">{t('nav.home')}</Link></li>
                <li><Link to="/documents">{t('footer.allServices')}</Link></li>
                <li><Link to="/status">{t('footer.trackStatus')}</Link></li>
                <li><Link to="/help">{t('nav.help')}</Link></li>
                <li><Link to="/feedback">{t('nav.feedback')}</Link></li>
              </ul>
            </div>
            <div style={{ minWidth: '120px' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9375rem' }}>{t('footer.legal')}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <li><a href="#">{t('footer.privacy')}</a></li>
                <li><a href="#">{t('footer.terms')}</a></li>
                <li><a href="#">{t('footer.disclaimer')}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
