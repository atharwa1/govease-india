import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: 'What is GoEase India?',
    answer: 'GoEase India is a unified portal that centralizes access to essential Indian government services and documentation. We provide clear step-by-step guides for applying, updating, or checking the status of documents like Aadhaar, PAN, Driving License, Passport, and more.'
  },
  {
    question: 'Is this an official government website?',
    answer: 'No. GoEase India is a demonstration platform designed to simplify government service access. When you click "Proceed to Official Website" on any guide, you will be redirected to the actual government portal to complete your application.'
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account is needed to browse guides, search for services, or use the status tracker. GoEase is designed to give you quick, hassle-free access to information.'
  },
  {
    question: 'Is my data safe?',
    answer: 'GoEase does not collect or store any personal identification data. All sensitive transactions (applications, payments, document downloads) happen on the respective official government portals.'
  },
  {
    question: 'How do I check the status of my application?',
    answer: 'Go to the "Status Tracker" page from the navigation menu, select the document type, enter your application or reference number, and click "Track Status". Note: The status tracker in this demo uses simulated data.'
  },
  {
    question: 'What documents can I manage through this portal?',
    answer: 'Currently, we cover Aadhaar Card, PAN Card, Driving License, Voter ID, Passport, Ration Card, Birth Certificate, Income Certificate, Caste Certificate, Vehicle Registration (RC), and UPI/Digital Payments.'
  },
  {
    question: 'Is this service free?',
    answer: 'Yes! GoEase is completely free to use. There are no ads, no hidden charges, and no premium tiers. Government application fees still apply as per the respective government portal.'
  },
  {
    question: 'Can I use this on my mobile phone?',
    answer: 'Absolutely. GoEase is built with a mobile-first design, so it works seamlessly on smartphones, tablets, and desktops.'
  }
];

const FaqAccordion: React.FC<{ item: FaqItem; isOpen: boolean; onToggle: () => void }> = ({ item, isOpen, onToggle }) => (
  <div style={{
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s',
    boxShadow: isOpen ? 'var(--shadow-md)' : 'none'
  }}>
    <button
      onClick={onToggle}
      style={{
        width: '100%',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        textAlign: 'left',
        fontWeight: 600,
        fontSize: '1rem',
        color: isOpen ? 'var(--color-primary)' : 'var(--color-text-main)',
        transition: 'color 0.2s',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        fontFamily: 'inherit'
      }}
    >
      <span>{item.question}</span>
      {isOpen ? <ChevronUp size={20} style={{ flexShrink: 0 }} /> : <ChevronDown size={20} style={{ flexShrink: 0 }} />}
    </button>
    {isOpen && (
      <div style={{
        padding: '0 1.5rem 1.25rem',
        color: 'var(--color-text-muted)',
        fontSize: '0.9375rem',
        lineHeight: 1.7
      }}>
        {item.answer}
      </div>
    )}
  </div>
);

export const HelpFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <div style={{ padding: '3.5rem 0', backgroundColor: 'var(--color-background)', minHeight: 'calc(100vh - 4rem)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            marginBottom: '1rem'
          }}>
            <HelpCircle size={28} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('help.title')}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.0625rem' }}>
            {t('help.subtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3rem' }}>
          {faqData.map((item, idx) => (
            <FaqAccordion
              key={idx}
              item={item}
              isOpen={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-2xl)',
          padding: '2.5rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>{t('help.stillNeedHelp')}</h2>
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9375rem' }}>
            {t('help.reachOut')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)' }}>
              <MessageCircle size={20} color="var(--color-primary)" />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t('help.liveChat')}</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{t('help.available')}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)' }}>
              <Mail size={20} color="var(--color-primary)" />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t('help.email')}</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>support@goease.in</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)' }}>
              <Phone size={20} color="var(--color-primary)" />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t('help.helpline')}</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>1800-XXX-XXXX</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
