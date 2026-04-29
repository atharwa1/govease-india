import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '3rem 0 1.5rem', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '2rem' }}>
          
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
              <ShieldCheck size={24} />
              <span>GoEase India</span>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              Your one-stop portal for accessing, understanding, and managing essential Indian government documents without the confusion.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9375rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <li><Link to="/" style={{ transition: 'color 0.2s' }}>Home</Link></li>
                <li><Link to="/documents" style={{ transition: 'color 0.2s' }}>All Services</Link></li>
                <li><Link to="/status" style={{ transition: 'color 0.2s' }}>Track Status</Link></li>
                <li><Link to="/help" style={{ transition: 'color 0.2s' }}>Help & FAQ</Link></li>
                <li><Link to="/feedback" style={{ transition: 'color 0.2s' }}>Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9375rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                <li><a href="#" style={{ transition: 'color 0.2s' }}>Privacy Policy</a></li>
                <li><a href="#" style={{ transition: 'color 0.2s' }}>Terms of Service</a></li>
                <li><a href="#" style={{ transition: 'color 0.2s' }}>Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
        </div>
        
        <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
          <p>© {new Date().getFullYear()} GoEase India. For demonstration purposes only. Not an official government website.</p>
        </div>
      </div>
    </footer>
  );
};
