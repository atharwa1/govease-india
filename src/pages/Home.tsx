import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileEdit, CheckCircle, Download, Zap } from 'lucide-react';
import { DocumentCard } from '../components/DocumentCard';
import { documentsData } from '../data/documents';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Home.css';

/** Animated counter hook — counts from 0 to target */
function useAnimatedCounter(target: string, duration = 1600) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const isNumeric = /^\d+$/.test(target.replace(/[+%]/g, ''));
          const numPart = parseInt(target.replace(/[^0-9]/g, ''), 10);
          const suffix = target.replace(/[0-9]/g, '');

          if (isNumeric && numPart > 0) {
            const start = performance.now();
            const animate = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(numPart * eased);
              setDisplay(`${current}${suffix}`);
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          } else {
            setDisplay(target);
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, display };
}

/** Mouse spotlight for action cards */
function useSpotlight() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };
  return handleMouseMove;
}

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();
  const spotlightMove = useSpotlight();

  // Activate scroll reveals
  useScrollReveal();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/documents?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularDocs = documentsData.slice(0, 4);

  // Animated counters
  const stat1 = useAnimatedCounter('11+');
  const stat2 = useAnimatedCounter('100%');
  const stat3 = useAnimatedCounter('0');

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        {/* Floating Orbs */}
        <div className="hero-orbs" aria-hidden="true">
          <div className="hero-orb hero-orb--1" />
          <div className="hero-orb hero-orb--2" />
          <div className="hero-orb hero-orb--3" />
          <div className="hero-orb hero-orb--4" />
          <div className="hero-orb hero-orb--5" />
        </div>

        <div className="container">
          <div className="hero-badge">
            <Zap size={14} />
            {t('home.badge')}
          </div>
          <h1 className="hero-title">
            {t('home.title')} <span>{t('home.titleHighlight')}</span>.
          </h1>
          <p className="hero-subtitle">
            {t('home.subtitle')}
          </p>
          
          <form className="search-container" onSubmit={handleSearch} id="hero-search-form">
            <Search className="search-icon" size={22} />
            <input
              type="text"
              className="search-input"
              placeholder={t('home.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="hero-search-input"
            />
          </form>

          <div className="stats-bar">
            <div className="stat-item" ref={stat1.ref}>
              <div className="stat-number">{stat1.display}</div>
              <div className="stat-label">{t('home.services')}</div>
            </div>
            <div className="stat-item" ref={stat2.ref}>
              <div className="stat-number">{stat2.display}</div>
              <div className="stat-label">{t('home.freeToUse')}</div>
            </div>
            <div className="stat-item" ref={stat3.ref}>
              <div className="stat-number">{stat3.display}</div>
              <div className="stat-label">{t('home.ads')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section" id="quick-actions">
        <div className="container">
          <h2 className="section-title reveal">{t('home.whatToDo')}</h2>
          <div className="quick-actions-grid">
            <div
              className="action-card reveal"
              data-reveal-delay="0"
              onClick={() => navigate('/documents')}
              onMouseMove={spotlightMove}
              id="action-apply"
            >
              <div className="action-icon-wrapper">
                <FileEdit size={28} />
              </div>
              <div>
                <h3 className="action-title">{t('home.applyNew')}</h3>
                <p className="action-subtitle">{t('home.applyNewDesc')}</p>
              </div>
            </div>
            
            <div
              className="action-card reveal"
              data-reveal-delay="100"
              onClick={() => navigate('/status')}
              onMouseMove={spotlightMove}
              id="action-status"
            >
              <div className="action-icon-wrapper">
                <CheckCircle size={28} />
              </div>
              <div>
                <h3 className="action-title">{t('home.checkStatus')}</h3>
                <p className="action-subtitle">{t('home.checkStatusDesc')}</p>
              </div>
            </div>
            
            <div
              className="action-card reveal"
              data-reveal-delay="200"
              onClick={() => navigate('/documents')}
              onMouseMove={spotlightMove}
              id="action-download"
            >
              <div className="action-icon-wrapper">
                <Download size={28} />
              </div>
              <div>
                <h3 className="action-title">{t('home.download')}</h3>
                <p className="action-subtitle">{t('home.downloadDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Documents */}
      <section className="popular-docs-section" id="popular-services">
        <div className="container">
          <h2 className="section-title reveal">{t('home.mostRequested')}</h2>
          <div className="docs-grid">
            {popularDocs.map((doc, idx) => (
              <div key={doc.id} className="reveal" data-reveal-delay={idx * 80}>
                <DocumentCard document={doc} />
              </div>
            ))}
          </div>
          <div className="text-center reveal" data-reveal-delay="200" style={{ marginTop: '2.5rem' }}>
            <button className="btn btn-outline" onClick={() => navigate('/documents')} id="view-all-btn">
              {t('home.viewAll')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
