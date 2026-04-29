import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, CreditCard } from 'lucide-react';
import { documentsData } from '../data/documents';

export const DocumentGuide: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const document = documentsData.find(d => d.id === id);

  if (!document) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Document not found</h2>
        <Link to="/documents" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Documents</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 0', backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - 4rem)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <Link to="/documents" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-text-muted)', fontWeight: 500, transition: 'color 0.2s' }}>
          <ArrowLeft size={18} /> Back to Directory
        </Link>

        <div style={{
          backgroundColor: 'var(--color-surface)',
          padding: '2.5rem',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
              How to Apply for {document.title}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
              {document.description}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
             <div style={{ padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <Clock color="var(--color-primary)" />
               <div>
                 <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Processing Time</p>
                 <p style={{ fontWeight: 500 }}>7 - 15 Days</p>
               </div>
             </div>
             <div style={{ padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <CreditCard color="var(--color-success)" />
               <div>
                 <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Govt. Fee</p>
                 <p style={{ fontWeight: 500 }}>₹50 - ₹1500 (Varies)</p>
               </div>
             </div>
             <div style={{ padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <FileText color="var(--color-warning)" />
               <div>
                 <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Format</p>
                 <p style={{ fontWeight: 500 }}>Physical + Digital</p>
               </div>
             </div>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Step-by-Step Guide</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { title: 'Prepare Required Documents', desc: 'Keep your Proof of Identity (POI) and Proof of Address (POA) ready.' },
              { title: 'Visit the Official Portal', desc: 'Go to the respective government portal to initiate your application.' },
              { title: 'Fill the Application Form', desc: 'Enter your personal details accurately as per your POI/POA.' },
              { title: 'Upload Documents & Pay', desc: 'Upload scanned copies of required documents and pay the standard processing fee.' },
              { title: 'Book Appointment (If needed)', desc: 'For some documents like Passport or DL, schedule an in-person visit.' }
            ].map((step, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ 
                  flexShrink: 0, 
                  width: '2rem', 
                  height: '2rem', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {idx + 1}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.25rem' }}>{step.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Proceed to Official Website
            </button>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              You will be redirected to the official government portal. GoEase does not collect your sensitive data.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
