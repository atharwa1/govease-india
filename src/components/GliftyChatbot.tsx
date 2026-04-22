import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, SendHorizontal } from 'lucide-react';
import './GliftyChatbot.css';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const SUGGESTIONS = [
  'Apply for PAN Card',
  'Check Aadhaar status',
  'Renew Driving License',
  'Download Voter ID',
  'Passport fees?',
];

// Simple keyword-based responses for demonstration
function getGliftyResponse(input: string): string {
  const q = input.toLowerCase();

  if (q.includes('aadhaar')) {
    return `To apply or update your Aadhaar, visit the UIDAI portal (uidai.gov.in). You'll need a Proof of Identity and Proof of Address. Head to our Aadhaar guide for step-by-step instructions!`;
  }
  if (q.includes('pan')) {
    return 'You can apply for a new PAN card or make corrections through the NSDL or UTIITSL portal. The fee is ₹107 for Indian applicants. Check our PAN Card guide for the full walkthrough!';
  }
  if (q.includes('driving') || q.includes('license') || q.includes('dl')) {
    return `Driving License applications are handled through the Parivahan portal (parivahan.gov.in). You'll need to pass a driving test at your local RTO. Our DL guide has all the details!`;
  }
  if (q.includes('passport')) {
    return 'Apply for a passport through the Passport Seva portal (passportindia.gov.in). Fresh passport fees start at ₹1,500 for a 36-page booklet. Visit our Passport guide for the complete process!';
  }
  if (q.includes('voter') || q.includes('election')) {
    return `You can register for a Voter ID (EPIC) through the NVSP portal (nvsp.in). It's completely free! Check our Voter ID guide for step-by-step help.`;
  }
  if (q.includes('ration')) {
    return `Ration Card applications are managed by your state's Food & Civil Supplies department. You can apply online through your state portal. See our Ration Card guide for more details!`;
  }
  if (q.includes('birth')) {
    return `Birth Certificates are issued by local municipal authorities. You can often apply online through your state or city's e-district portal. Check our guide for the process!`;
  }
  if (q.includes('income')) {
    return `Income Certificates are issued by the Revenue/Tehsildar office. You can apply online through your state's e-district portal with salary slips or an employer certificate as proof.`;
  }
  if (q.includes('caste')) {
    return `Caste Certificates are issued by the SDM/Tehsildar office. Apply through your state's e-district portal with supporting documents from your family records.`;
  }
  if (q.includes('rc') || q.includes('vehicle') || q.includes('registration')) {
    return 'Vehicle Registration (RC) details can be checked on the Parivahan portal. For new registration, visit your local RTO with the vehicle invoice and insurance documents.';
  }
  if (q.includes('upi') || q.includes('payment') || q.includes('digital')) {
    return 'UPI payments are supported through apps like BHIM, Google Pay, PhonePe, and Paytm. For government-linked services, UPI can be used to pay fees directly on official portals.';
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello! 👋 I'm Glifty, your government services assistant. Ask me about any Indian document — Aadhaar, PAN, Passport, DL, Voter ID, and more!`;
  }
  if (q.includes('help') || q.includes('what can you do')) {
    return `I can help you with:\n• How to apply for documents\n• Required documents & fees\n• Status tracking guidance\n• Official portal links\n\nJust ask me about any service!`;
  }
  if (q.includes('thank')) {
    return `You're welcome! 😊 Let me know if you need anything else. I'm always here to help!`;
  }

  return 'I can help you with Indian government services like Aadhaar, PAN Card, Driving License, Passport, Voter ID, and more. Try asking something like "How to apply for PAN Card?" or "What are passport fees?"';
}

export const GliftyChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: `Hi! 👋 I'm Glifty, your AI assistant for government services. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const userMsg: Message = { role: 'user', text: msgText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponse = getGliftyResponse(msgText);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
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
      {/* Chat Panel */}
      {isOpen && (
        <div className="glifty-panel" id="glifty-panel">
          {/* Header */}
          <div className="glifty-header">
            <div className="glifty-avatar">
              <Sparkles size={18} />
            </div>
            <div className="glifty-header-info">
              <h3>Glifty</h3>
              <p>AI Government Services Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="glifty-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`glifty-msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.text}
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

          {/* Quick Suggestions (only show when few messages) */}
          {messages.length <= 2 && !isTyping && (
            <div className="glifty-suggestions">
              {SUGGESTIONS.map((s, idx) => (
                <button key={idx} className="glifty-chip" onClick={() => handleSend(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
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
        </div>
      )}

      {/* Floating Action Button */}
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
