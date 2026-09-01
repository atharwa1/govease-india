import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, SendHorizontal, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { documentsData } from '../data/documents';
import './GliftyChatbot.css';

interface ActionLink {
  label: string;
  path: string;
}

interface Message {
  role: 'user' | 'bot';
  text: string;
  links?: ActionLink[];
}

const SUGGESTIONS = [
  'Apply for PAN Card',
  'Check Aadhaar status',
  'Renew Driving License',
  'Download Voter ID',
  'Passport fees?',
];

function getGliftyResponse(input: string): { text: string; links?: ActionLink[] } {
  const q = input.toLowerCase();

  // Try to match a document
  const docMatches: { doc: typeof documentsData[0]; score: number }[] = [];
  for (const doc of documentsData) {
    const keywords = [doc.id, doc.title.toLowerCase(), doc.titleHi];
    let score = 0;
    for (const kw of keywords) {
      if (q.includes(kw.toLowerCase())) score += 2;
    }
    // Partial keyword matches
    const words = doc.title.toLowerCase().split(' ');
    for (const w of words) {
      if (w.length > 2 && q.includes(w)) score += 1;
    }
    if (score > 0) docMatches.push({ doc, score });
  }
  docMatches.sort((a, b) => b.score - a.score);

  if (docMatches.length > 0) {
    const best = docMatches[0].doc;
    const links: ActionLink[] = [
      { label: `📋 ${best.title} — Full Guide`, path: `/guides/${best.id}` },
      { label: `📊 Track ${best.title} Status`, path: `/status?doc=${best.id}` },
    ];

    if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('kitna')) {
      return {
        text: `The fees for ${best.title} are: ${best.fees}. Processing time is ${best.processingTime}. You can apply directly on our platform!`,
        links: [{ label: `✅ Apply for ${best.title}`, path: `/guides/${best.id}` }],
      };
    }
    if (q.includes('status') || q.includes('track') || q.includes('check')) {
      return {
        text: `You can track your ${best.title} application status right here on GoEase! Just enter your application/reference number.`,
        links: [{ label: `📊 Track ${best.title} Status`, path: `/status?doc=${best.id}` }],
      };
    }
    if (q.includes('document') || q.includes('required') || q.includes('kya chahiye')) {
      return {
        text: `For ${best.title}, you'll need:\n${best.requiredDocs.map(d => `• ${d}`).join('\n')}\n\nCheck the full guide for more details!`,
        links,
      };
    }
    if (q.includes('eligib') || q.includes('who can') || q.includes('kaun')) {
      return {
        text: `Eligibility for ${best.title}:\n${best.eligibility.map(e => `• ${e}`).join('\n')}`,
        links,
      };
    }

    return {
      text: `Here's what I know about ${best.title}:\n\n📄 ${best.description}\n💰 Fees: ${best.fees}\n⏱ Processing: ${best.processingTime}\n\nYou can apply, view the full guide, or track your status — all within GoEase!`,
      links,
    };
  }

  // General queries
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('namaste')) {
    return {
      text: `Hello! 👋 I'm Glifty, your government services assistant. Ask me about any Indian document — Aadhaar, PAN, Passport, DL, Voter ID, and more! I'll take you directly to the right page.`,
    };
  }
  if (q.includes('help') || q.includes('what can you do') || q.includes('kya kar sakte')) {
    return {
      text: `I can help you with:\n• How to apply for any document\n• Required documents & fees\n• Eligibility information\n• Track application status\n\nJust ask me about any service and I'll navigate you there!`,
      links: [
        { label: '📂 Browse All Services', path: '/documents' },
        { label: '📊 Track Status', path: '/status' },
      ],
    };
  }
  if (q.includes('all') && (q.includes('service') || q.includes('document'))) {
    return {
      text: `We cover 11 government services including Aadhaar, PAN, Driving License, Passport, Voter ID, Ration Card, Birth Certificate, and more!`,
      links: [{ label: '📂 View All Services', path: '/documents' }],
    };
  }
  if (q.includes('thank')) {
    return { text: `You're welcome! 😊 Let me know if you need anything else. I'm always here to help!` };
  }

  return {
    text: `I can help you with Indian government services like Aadhaar, PAN Card, Driving License, Passport, Voter ID, and more. Try asking something like "How to apply for PAN Card?" or "What are passport fees?"`,
    links: [{ label: '📂 Browse All Services', path: '/documents' }],
  };
}

export const GliftyChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: `Hi! 👋 I'm Glifty, your AI assistant for government services. Ask me anything and I'll take you right to the page you need!` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSend = (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const userMsg: Message = { role: 'user', text: msgText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getGliftyResponse(msgText);
      setMessages(prev => [...prev, { role: 'bot', text: response.text, links: response.links }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="glifty-panel" id="glifty-panel">
          <div className="glifty-header">
            <div className="glifty-avatar">
              <Sparkles size={18} />
            </div>
            <div className="glifty-header-info">
              <h3>Glifty</h3>
              <p>
                <span className="glifty-status-dot">Online</span> · AI Assistant
              </p>
            </div>
            <button
              className="glifty-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Glifty"
            >
              <X size={14} />
            </button>
          </div>

          <div className="glifty-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`glifty-msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
                <span style={{ whiteSpace: 'pre-line' }}>{msg.text}</span>
                {msg.links && msg.links.length > 0 && (
                  <div className="glifty-action-links">
                    {msg.links.map((link, li) => (
                      <button
                        key={li}
                        className="glifty-action-btn"
                        onClick={() => handleNavigate(link.path)}
                      >
                        {link.label}
                        <ArrowRight size={14} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="glifty-msg typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && !isTyping && (
            <div className="glifty-suggestions">
              {SUGGESTIONS.map((s, idx) => (
                <button key={idx} className="glifty-chip" onClick={() => handleSend(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="glifty-input-area">
            <input
              type="text"
              className="glifty-input"
              placeholder="Ask Glifty anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              id="glifty-input"
            />
            <button
              className="glifty-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              id="glifty-send-btn"
            >
              <SendHorizontal size={16} />
            </button>
          </div>

          <div className="glifty-powered">
            <Zap size={10} />
            Powered by Glifty AI
          </div>
        </div>
      )}

      {/* Tooltip */}
      {!isOpen && (
        <div className="glifty-tooltip">Ask Glifty ✨</div>
      )}

      <button
        className={`glifty-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close Glifty' : 'Ask Glifty AI'}
        id="glifty-fab"
      >
        {isOpen ? <X size={22} /> : <Sparkles size={22} />}
      </button>
    </>
  );
};
