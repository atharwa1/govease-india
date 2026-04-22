import React, { useState } from 'react';
import {
  MessageSquareHeart,
  Send,
  Star,
  CheckCircle,
  RefreshCw,
  ThumbsUp,
  Lightbulb,
  TrendingUp,
  Sparkles,
  CircleCheckBig,
} from 'lucide-react';
import './Feedback.css';

type FeedbackCategory = 'General' | 'UI/Design' | 'New Feature' | 'Bug Report' | 'Content' | 'Accessibility';

const CATEGORIES: FeedbackCategory[] = ['General', 'UI/Design', 'New Feature', 'Bug Report', 'Content', 'Accessibility'];

interface Suggestion {
  id: number;
  text: string;
  votes: number;
  author: string;
  time: string;
}

const INITIAL_SUGGESTIONS: Suggestion[] = [
  { id: 1, text: 'Add DigiLocker integration to directly fetch documents', votes: 47, author: 'Rahul K.', time: '2 days ago' },
  { id: 2, text: 'Include regional language support beyond Hindi and English', votes: 35, author: 'Priya S.', time: '3 days ago' },
  { id: 3, text: 'Add notification alerts for application status changes', votes: 29, author: 'Ankit M.', time: '5 days ago' },
  { id: 4, text: 'Provide estimated fees breakdown for each service', votes: 22, author: 'Sneha R.', time: '1 week ago' },
  { id: 5, text: 'Add a document checklist feature before starting an application', votes: 18, author: 'Vikram P.', time: '1 week ago' },
];

const MAX_CHARS = 500;

export const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState<FeedbackCategory | ''>('');
  const [name, setName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set());

  const canSubmit = rating > 0 && feedbackText.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // If feedback text is substantive, add it as a community suggestion
    if (feedbackText.trim().length > 20) {
      const newSuggestion: Suggestion = {
        id: Date.now(),
        text: feedbackText.trim(),
        votes: 1,
        author: name.trim() || 'Anonymous',
        time: 'Just now',
      };
      setSuggestions(prev => [newSuggestion, ...prev]);
      setVotedIds(prev => new Set(prev).add(newSuggestion.id));
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setRating(0);
    setHoverRating(0);
    setCategory('');
    setName('');
    setFeedbackText('');
    setSubmitted(false);
  };

  const handleVote = (id: number) => {
    if (votedIds.has(id)) return;
    setSuggestions(prev =>
      prev.map(s => (s.id === id ? { ...s, votes: s.votes + 1 } : s)).sort((a, b) => b.votes - a.votes)
    );
    setVotedIds(prev => new Set(prev).add(id));
  };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <div className="feedback-page">
      <div className="container" style={{ maxWidth: '1100px' }}>

        {/* Header */}
        <div className="feedback-header">
          <div className="feedback-header-icon">
            <MessageSquareHeart size={28} />
          </div>
          <h1>Suggestions & Feedback</h1>
          <p>Help us improve GovEase India. Your voice shapes the future of this platform.</p>
        </div>

        {/* Layout: Form + Sidebar */}
        <div className="feedback-layout">

          {/* Main Form */}
          <div className="feedback-card">
            {!submitted ? (
              <form className="feedback-form" onSubmit={handleSubmit} id="feedback-form">

                {/* Rating */}
                <div className="form-group">
                  <label className="form-label">How would you rate your experience? *</label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star size={28} fill={star <= (hoverRating || rating) ? '#f59e0b' : 'none'} />
                      </button>
                    ))}
                    {(hoverRating || rating) > 0 && (
                      <span style={{ marginLeft: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: 500, alignSelf: 'center' }}>
                        {ratingLabels[hoverRating || rating]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="form-group">
                  <label className="form-label">What is this about?</label>
                  <p className="form-sublabel">Select a category (optional)</p>
                  <div className="feedback-categories">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        className={`feedback-cat-pill ${category === cat ? 'active' : ''}`}
                        onClick={() => setCategory(prev => prev === cat ? '' : cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name (optional) */}
                <div className="form-group">
                  <label className="form-label" htmlFor="feedback-name">Your Name</label>
                  <p className="form-sublabel">Optional — leave blank for anonymous</p>
                  <input
                    type="text"
                    id="feedback-name"
                    className="form-input"
                    placeholder="e.g., Rahul"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={50}
                  />
                </div>

                {/* Feedback Text */}
                <div className="form-group">
                  <label className="form-label" htmlFor="feedback-text">Your Feedback / Suggestion *</label>
                  <p className="form-sublabel">Tell us what you liked, what could be better, or suggest a new feature</p>
                  <textarea
                    id="feedback-text"
                    className="form-textarea"
                    placeholder="I think the platform would be even better if..."
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value.slice(0, MAX_CHARS))}
                    maxLength={MAX_CHARS}
                  />
                  <div className="char-counter">{feedbackText.length}/{MAX_CHARS}</div>
                </div>

                {/* Submit */}
                <button type="submit" className="feedback-submit-btn" disabled={!canSubmit} id="feedback-submit-btn">
                  <Send size={18} />
                  Submit Feedback
                </button>
              </form>
            ) : (
              <div className="feedback-success">
                <div className="feedback-success-icon">
                  <CheckCircle size={32} />
                </div>
                <h2>Thank you for your feedback!</h2>
                <p>
                  Your input helps us make GovEase India better for everyone.
                  {feedbackText.trim().length > 20 && ' Your suggestion has been added to the community board.'}
                </p>
                <button className="feedback-reset-btn" onClick={handleReset}>
                  <RefreshCw size={16} />
                  Submit Another
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="suggestions-sidebar">

            {/* Community Suggestions */}
            <div className="suggestions-card">
              <h3><TrendingUp size={18} /> Top Community Suggestions</h3>
              {suggestions.slice(0, 5).map(s => (
                <div key={s.id} className={`suggestion-item ${votedIds.has(s.id) ? 'voted' : ''}`} onClick={() => handleVote(s.id)}>
                  <button
                    className={`suggestion-vote-btn ${votedIds.has(s.id) ? 'voted' : ''}`}
                    onClick={e => { e.stopPropagation(); handleVote(s.id); }}
                    disabled={votedIds.has(s.id)}
                    aria-label={`Upvote suggestion: ${s.text}`}
                  >
                    <ThumbsUp size={16} />
                    <span>{s.votes}</span>
                  </button>
                  <div>
                    <div className="suggestion-text">{s.text}</div>
                    <div className="suggestion-meta">{s.author} · {s.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Card */}
            <div className="suggestions-card">
              <h3><Lightbulb size={18} /> Feedback Tips</h3>
              <div className="tips-list">
                <div className="tip-item">
                  <Sparkles size={16} className="tip-icon" />
                  <span>Be specific about what you liked or disliked</span>
                </div>
                <div className="tip-item">
                  <CircleCheckBig size={16} className="tip-icon" />
                  <span>Suggest features that would help your workflow</span>
                </div>
                <div className="tip-item">
                  <TrendingUp size={16} className="tip-icon" />
                  <span>Upvote existing suggestions you agree with</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
