import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  useScrollReveal();

  return (
    <footer className="site-footer">
      {/* Gradient top border */}
      <div className="footer-gradient-border" />

      <div className="container">
        <div className="footer-grid reveal">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <ShieldCheck size={24} />
              <span>GoEase India</span>
            </div>
            <p className="footer-description">
              {t('footer.description')}
            </p>
          </div>
          <div className="footer-links-cols">
            <div className="footer-link-group">
              <h4 className="footer-heading">{t('footer.quickLinks')}</h4>
              <ul className="footer-link-list">
                <li><Link to="/">{t('nav.home')}</Link></li>
                <li><Link to="/documents">{t('footer.allServices')}</Link></li>
                <li><Link to="/status">{t('footer.trackStatus')}</Link></li>
                <li><Link to="/help">{t('nav.help')}</Link></li>
                <li><Link to="/feedback">{t('nav.feedback')}</Link></li>
              </ul>
            </div>
            <div className="footer-link-group">
              <h4 className="footer-heading">{t('footer.legal')}</h4>
              <ul className="footer-link-list">
                <li><a href="#">{t('footer.privacy')}</a></li>
                <li><a href="#">{t('footer.terms')}</a></li>
                <li><a href="#">{t('footer.disclaimer')}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom reveal" data-reveal-delay="100">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--color-surface);
          padding: 3.5rem 0 1.5rem;
          margin-top: auto;
          position: relative;
          transition: var(--theme-transition);
        }

        .footer-gradient-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--color-accent-glow),
            var(--color-accent-2-glow),
            var(--color-accent-glow),
            transparent
          );
        }

        .footer-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }

        .footer-brand-col {
          min-width: 200px;
          max-width: 320px;
          flex: 1 1 280px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 1rem;
        }

        .footer-brand svg {
          transition: all 0.4s var(--ease-out);
        }

        .footer-brand:hover svg {
          transform: rotate(-10deg) scale(1.1);
          filter: drop-shadow(0 0 8px var(--color-accent-glow));
        }

        .footer-description {
          color: var(--color-text-muted);
          font-size: 0.875rem;
          line-height: 1.7;
        }

        .footer-links-cols {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
          flex: 1 1 auto;
        }

        .footer-link-group {
          min-width: 120px;
        }

        .footer-heading {
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 0.9375rem;
          color: var(--color-text-main);
        }

        .footer-link-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }

        .footer-link-list a {
          color: var(--color-text-muted);
          transition: all 0.3s var(--ease-out);
          position: relative;
        }

        .footer-link-list a:hover {
          color: var(--color-accent);
          padding-left: 4px;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 0.8125rem;
        }

        @media (max-width: 768px) {
          .footer-grid {
            flex-direction: column;
            gap: 2rem;
          }
          .footer-links-cols {
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
};
