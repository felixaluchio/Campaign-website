import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  Bot, 
  RefreshCw, 
  ThumbsUp, 
  ThumbsDown, 
  ArrowRight, 
  Flag, 
  ExternalLink, 
  Globe, 
  Search,
  Sparkles 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { aiKnowledgeBase } from '../data/aiKnowledgeBase';

type ActionCard = {
  type: 'EVENT' | 'MANIFESTO' | 'COMMUNITY' | 'LINK';
  title: string;
  description?: string;
  url: string;
  buttonText: string;
};

type GroundingSource = {
  title: string;
  url: string;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: GroundingSource[];
  searchQueries?: string[];
  grounded?: boolean;
  actions?: ActionCard[];
  feedback?: 'positive' | 'negative' | null;
  timestamp: Date;
};

const SUGGESTED_PROMPTS = [
  "Who is Wakili Phyllis?",
  "What is her 4-pillar manifesto?",
  "How will she support Kiambu women?",
  "What are the First 100 Days priorities?"
];

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  text: "Hello! I am Wakili Phyllis Wangui's AI Digital Assistant, powered by Google Search Grounding.\n\nI can help you explore her published manifesto, Kiambu development priorities, verified civic information, upcoming events, and ways to volunteer.",
  timestamp: new Date()
};

export function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-assistant', handleOpen);
    return () => window.removeEventListener('open-ai-assistant', handleOpen);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleClearChat = () => {
    if (window.confirm('Start a new conversation?')) {
      setMessages([INITIAL_MESSAGE]);
    }
  };

  // Local fallback knowledge processing if API is offline
  const getLocalKnowledgeFallback = (query: string): { text: string; actions?: ActionCard[]; sources?: GroundingSource[] } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('report') || lowerQuery.includes('problem') || lowerQuery.includes('issue') || lowerQuery.includes('ripoti') || lowerQuery.includes('shida')) {
      return {
        text: "I can help you report this directly to the campaign's community response team for Kiambu County.",
        actions: [{ type: 'LINK', title: 'Report an Issue', url: '/report-issue', buttonText: 'Open Issue Portal' }]
      };
    }
    if (lowerQuery.includes('volunteer') || lowerQuery.includes('join') || lowerQuery.includes('help') || lowerQuery.includes('kujiunga') || lowerQuery.includes('saidia')) {
      return {
        text: "Thank you for standing with us! You can sign up to support grassroots mobilization, event coordination, or youth outreach.",
        actions: [{ type: 'LINK', title: 'Join the Movement', url: '/join-the-movement', buttonText: 'Volunteer with Us' }]
      };
    }
    if (lowerQuery.includes('contact') || lowerQuery.includes('wasiliana') || lowerQuery.includes('namba')) {
      return {
        text: "You can reach the campaign via WhatsApp (+254 700 000 000), official email, or our contact form.",
        actions: [{ type: 'LINK', title: 'Contact Us', url: '/contact', buttonText: 'Get in Touch' }]
      };
    }
    if (lowerQuery.includes('event') || lowerQuery.includes('meeting') || lowerQuery.includes('mkutano')) {
      return {
        text: "Find our upcoming community town halls, women empowerment forums, and ward meet-and-greets on our Events page.",
        actions: [{ type: 'EVENT', title: 'Upcoming Events', url: '/events', buttonText: 'Browse Events' }]
      };
    }

    if (lowerQuery.includes('who is') || lowerQuery.includes('biography') || lowerQuery.includes('about')) {
      return {
        text: `${aiKnowledgeBase.candidate.biography} ${aiKnowledgeBase.candidate.background}`,
        sources: [{ title: 'Meet Phyllis - Official Bio', url: '/#meet-phyllis' }],
        actions: [{ type: 'LINK', title: 'Meet Phyllis', url: '/#meet-phyllis', buttonText: 'Read Full Biography' }]
      };
    }
    if (lowerQuery.includes('vision') || lowerQuery.includes('manifesto') || lowerQuery.includes('stand for') || lowerQuery.includes('pillar')) {
      return {
        text: `Wakili Phyllis Wangui's vision is "Pamoja Tujenge Kiambu Bora Kwa Wote", anchored on four core pillars:\n\n1. Empowering Women with capital & markets\n2. Educating Our Girl Child & Youth\n3. Growing Our Local Economy & Agri-business\n4. Uniting Our Communities with accountable representation.`,
        sources: [{ title: 'Vision & Manifesto', url: '/#vision' }],
        actions: [{ type: 'MANIFESTO', title: 'Vision & Manifesto', url: '/#vision', buttonText: 'Explore 4 Pillars' }]
      };
    }
    if (lowerQuery.includes('100 days') || lowerQuery.includes('first 100')) {
      return {
        text: `First 100 Days Priorities:\n- ${aiKnowledgeBase.first100Days.join('\n- ')}`,
        sources: [{ title: 'First 100 Days Action Plan', url: '/#100-days' }]
      };
    }

    return {
      text: "Wakili Phyllis Wangui Kamau is an Advocate of the High Court dedicated to 'Law with purpose, Leadership with impact' as candidate for Kiambu County Woman Representative (2027). You can explore her full agenda across education, enterprise, women empowerment, and community representation.",
      actions: [{ type: 'LINK', title: 'View Manifesto & Priorities', url: '/#vision', buttonText: 'Read Manifesto' }]
    };
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Build conversation history for context
      const history = messages.slice(-5).map(m => ({
        role: m.role,
        text: m.text
      }));

      // Call server endpoint with Gemini Search Grounding
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      // Determine local quick actions if applicable
      const lowerText = text.toLowerCase();
      let actions: ActionCard[] | undefined;
      if (lowerText.includes('event') || lowerText.includes('mkutano')) {
        actions = [{ type: 'EVENT', title: 'Campaign Events', url: '/events', buttonText: 'View Events' }];
      } else if (lowerText.includes('volunteer') || lowerText.includes('join')) {
        actions = [{ type: 'LINK', title: 'Join the Movement', url: '/join-the-movement', buttonText: 'Volunteer' }];
      } else if (lowerText.includes('report') || lowerText.includes('issue')) {
        actions = [{ type: 'LINK', title: 'Report an Issue', url: '/report-issue', buttonText: 'Community Report' }];
      } else if (lowerText.includes('manifesto') || lowerText.includes('vision') || lowerText.includes('plan')) {
        actions = [{ type: 'MANIFESTO', title: 'Vision & 4 Pillars', url: '/#vision', buttonText: 'Read Manifesto' }];
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply || "Thank you for reaching out. Please feel free to ask any question about Wakili Phyllis Wangui's campaign.",
        sources: data.sources && data.sources.length > 0 ? data.sources : undefined,
        searchQueries: data.searchQueries && data.searchQueries.length > 0 ? data.searchQueries : undefined,
        grounded: data.grounded,
        actions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.warn('Live API request notice, using local knowledge base:', err);
      const fallback = getLocalKnowledgeFallback(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: fallback.text,
        sources: fallback.sources,
        actions: fallback.actions,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFeedback = (id: string, type: 'positive' | 'negative') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, feedback: type } : m));
  };

  const handleNavigate = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (url.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(url.replace('/#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(url);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        id="ai-assistant-toggle-btn"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-[var(--color-brand-black)] text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2.5 border border-white/20 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <Bot className="w-6 h-6 text-[var(--color-primary-green)]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-campaign-red)] rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-campaign-red)] rounded-full"></span>
        </div>
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider pr-1">Ask AI Guide</span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[420px] h-[100dvh] sm:h-[650px] sm:max-h-[88vh] bg-slate-50 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 font-sans"
          >
            {/* Header */}
            <div className="bg-[var(--color-brand-black)] text-white p-4 flex items-center justify-between shadow-sm z-10 shrink-0 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <Bot className="w-6 h-6 text-[var(--color-primary-green)]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-sm leading-tight text-white">Phyllis Wangui AI Guide</h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[var(--color-primary-green)]/20 text-[var(--color-primary-green)] border border-[var(--color-primary-green)]/30 flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" /> Grounded
                    </span>
                  </div>
                  <p className="text-[0.65rem] text-gray-400 mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-yellow-400" /> Powered by Google Search Grounding
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleClearChat}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  title="New Conversation"
                  aria-label="New Conversation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  aria-label="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="bg-gray-100 px-4 py-1.5 text-[0.65rem] text-gray-500 text-center border-b border-gray-200 shrink-0 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-green)]"></span>
              <span>Live AI assistant with real-time web & campaign fact grounding.</span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
              {messages.map((msg, index) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-full`}>
                  
                  {/* Message Bubble */}
                  <div className={`relative max-w-[88%] rounded-2xl px-4 py-3 text-sm shadow-sm flex items-start gap-2.5 ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-primary-green)] text-white rounded-tr-sm' 
                      : 'bg-white border border-slate-200 text-gray-800 rounded-tl-sm'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="w-5 h-5 rounded-full bg-[var(--color-light-green)] flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-[var(--color-primary-green)]" />
                      </div>
                    )}
                    <div className="leading-relaxed whitespace-pre-wrap flex-1 text-[13.5px]">{msg.text}</div>
                  </div>

                  {/* Sources & Grounding Chips (Only for AI) */}
                  {msg.role === 'assistant' && (
                    <div className="mt-2 ml-1 space-y-2 w-full max-w-[88%]">
                      
                      {/* Search Queries badge */}
                      {msg.searchQueries && msg.searchQueries.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500 pt-0.5">
                          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                            <Search className="w-3 h-3 text-[var(--color-primary-green)]" /> Grounded on:
                          </span>
                          {msg.searchQueries.map((sq, sqIdx) => (
                            <span key={sqIdx} className="px-2 py-0.5 rounded-full bg-slate-200/70 text-gray-700 text-[10px]">
                              "{sq}"
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Source Web Citations */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="p-2.5 bg-white/80 border border-slate-200/80 rounded-xl space-y-1.5 shadow-xs">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                            <Globe className="w-3 h-3 text-[var(--color-primary-green)]" /> Verified Web Sources:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.sources.map((src, srcIdx) => (
                              <button 
                                key={srcIdx}
                                onClick={() => handleNavigate(src.url)}
                                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-gray-700 hover:text-[var(--color-primary-green)] font-medium px-2 py-1 rounded-lg inline-flex items-center gap-1 transition-colors border border-slate-200 max-w-full truncate"
                              >
                                <span className="truncate">{src.title}</span>
                                <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Cards */}
                      {msg.actions && msg.actions.map((action, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs hover:border-[var(--color-primary-green)] transition-all cursor-pointer group" 
                          onClick={() => handleNavigate(action.url)}
                        >
                          <div className="text-[0.65rem] font-bold text-[var(--color-primary-green)] uppercase tracking-widest mb-1">{action.type}</div>
                          <div className="font-bold text-gray-900 text-xs sm:text-sm">{action.title}</div>
                          {action.description && <div className="text-xs text-gray-500 mt-1">{action.description}</div>}
                          <div className="mt-2.5 flex items-center justify-between text-xs font-bold text-[var(--color-brand-black)]">
                            <span className="group-hover:text-[var(--color-primary-green)] transition-colors">{action.buttonText}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[var(--color-primary-green)] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      ))}

                      {/* Feedback UI (Only on last message if it's AI) */}
                      {index === messages.length - 1 && (
                        <div className="flex items-center gap-2 mt-2 text-gray-400">
                          <span className="text-[0.65rem] font-medium mr-1">Helpful?</span>
                          <button 
                            onClick={() => handleFeedback(msg.id, 'positive')} 
                            className={`p-1 rounded-md hover:bg-gray-200 transition-colors ${msg.feedback === 'positive' ? 'text-[var(--color-primary-green)] bg-green-50' : ''}`}
                            aria-label="Helpful"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleFeedback(msg.id, 'negative')} 
                            className={`p-1 rounded-md hover:bg-gray-200 transition-colors ${msg.feedback === 'negative' ? 'text-red-500 bg-red-50' : ''}`}
                            aria-label="Not Helpful"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>
                          <button 
                            onClick={() => alert('Thank you. Feedback submitted to the campaign team.')}
                            className="p-1 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1 text-[0.65rem]"
                          >
                            <Flag className="w-3 h-3" /> Report
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-xs flex gap-2 items-center text-xs text-gray-500 font-medium">
                    <span className="w-2 h-2 bg-[var(--color-primary-green)] rounded-full animate-ping"></span>
                    <span>Searching verified web & campaign facts...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts (Only show if no user messages yet) */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5 shrink-0">
                {SUGGESTED_PROMPTS.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-xs font-medium bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-all shadow-xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3.5 bg-white border-t border-gray-200 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="relative flex items-end gap-2">
                <textarea 
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(input);
                    }
                  }}
                  placeholder="Ask any question about Kiambu, elections, or manifesto..."
                  rows={1}
                  className="w-full bg-slate-50 border border-gray-300 rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all resize-none max-h-28"
                  style={{ minHeight: '44px' }}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 bottom-2 w-8 h-8 rounded-xl bg-[var(--color-primary-green)] text-white flex items-center justify-center shrink-0 hover:bg-[var(--color-deep-green)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <div className="text-[0.65rem] text-center text-gray-400 mt-2 px-2 leading-tight flex items-center justify-center gap-1">
                <span>Grounded with Google Search •</span>
                <Link to="/legal/terms" className="underline hover:text-gray-600">Privacy & Terms</Link>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
