import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { documentsData } from '../data/documents';

export const StatusTracker: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialDoc = searchParams.get('doc') || '';

  const [selectedDoc, setSelectedDoc] = useState(initialDoc);
  const [appNumber, setAppNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appNumber || !selectedDoc) return;
    
    setStatus('loading');
    
    // Mock API call delay
    setTimeout(() => {
      // Just a mock logic: if app number starts with 'E', show error
      if (appNumber.toUpperCase().startsWith('E')) {
        setStatus('error');
      } else {
        setStatus('success');
      }
    }, 1500);
  };

  return (
    <div style={{ padding: '4rem 0', backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - 4rem)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{
          backgroundColor: 'var(--color-surface)',
          padding: '2.5rem',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Track Application Status</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Enter your application details to check the current status.</p>
          </div>

          <form onSubmit={handleCheckStatus} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Select Document Type</label>
              <select 
                value={selectedDoc} 
                onChange={(e) => setSelectedDoc(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  outline: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'var(--color-surface)',
                  fontFamily: 'inherit',
                  color: 'var(--color-text-main)'
                }}
                required
              >
                <option value="" disabled>-- Select a Document --</option>
                {documentsData.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Application / Reference Number</label>
              <input
                type="text"
                value={appNumber}
                onChange={(e) => setAppNumber(e.target.value)}
                placeholder="e.g., APP123456789"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  outline: 'none',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Loader className="animate-spin" size={18} /> Checking...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Search size={18} /> Track Status
                </span>
              )}
            </button>
          </form>

          {/* Status Results */}
          {status === 'success' && (
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              backgroundColor: 'var(--color-success-bg)', 
              border: '1px solid var(--color-success-border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <CheckCircle color="var(--color-success)" size={24} style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--color-success-heading)', marginBottom: '0.25rem' }}>Application Approved</h3>
                <p style={{ color: 'var(--color-success-text)', fontSize: '0.875rem' }}>
                  Your application for {documentsData.find(d => d.id === selectedDoc)?.title} has been approved. The document will be dispatched shortly.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              backgroundColor: 'var(--color-error-bg)', 
              border: '1px solid var(--color-error-border)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <AlertCircle color="var(--color-danger)" size={24} style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--color-error-heading)', marginBottom: '0.25rem' }}>Application Pending/Not Found</h3>
                <p style={{ color: 'var(--color-error-text)', fontSize: '0.875rem' }}>
                  We couldn't find an approved application with this number. Please check the number or try again later.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
