import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, RefreshCw, ThumbsUp, ThumbsDown, ArrowRight, Flag, ExternalLink, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { aiKnowledgeBase } from '../data/aiKnowledgeBase';

type ActionCard = {
  type: 'EVENT' | 'MANIFESTO' | 'COMMUNITY' | 'LINK';
  title: string;
  description?: string;
  url: string;
  buttonText: string;
};

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  source?: { title: string; url: string };
  actions?: ActionCard[];
  feedback?: 'positive' | 'negative' | null;
  timestamp: Date;
};

const SUGGESTED_PROMPTS = [
  "Who is Phyllis?",
  "View the Manifesto",
  "First 100 Days",
  "Join the Movement"
];

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  text: "Hello. How Can I Help?\n\nI'm Phyllis Wangui's AI-powered digital assistant. I can help you explore her vision, manifesto, community priorities, upcoming events, and ways to get involved.",
  timestamp: new Date()
};

export function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      // Small timeout to ensure animation finishes
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleClearChat = () => {
    if (window.confirm('Start a new conversation?')) {
      setMessages([INITIAL_MESSAGE]);
    }
  };

  const processQuery = (query: string): Partial<Message> => {
    const lowerQuery = query.toLowerCase();
    
    // 1. Navigation / Handoffs
    if (lowerQuery.includes('report') || lowerQuery.includes('problem') || lowerQuery.includes('issue') || lowerQuery.includes('ripoti') || lowerQuery.includes('shida')) {
      return {
        text: "I'm sorry to hear that. I can help you report the issue through the campaign's community reporting system.",
        actions: [{ type: 'LINK', title: 'Report an Issue', url: '/report-issue', buttonText: 'Report an Issue' }]
      };
    }
    if (lowerQuery.includes('volunteer') || lowerQuery.includes('join') || lowerQuery.includes('help') || lowerQuery.includes('kujiunga') || lowerQuery.includes('saidia')) {
      return {
        text: "Thank you for your interest in contributing. You can choose how you'd like to participate and share your skills through the volunteer registration form. (Asante kwa kujitolea. Unaweza kujiunga hapa.)",
        actions: [{ type: 'LINK', title: 'Join the Movement', url: '/join-the-movement', buttonText: 'Join the Movement' }]
      };
    }
    if (lowerQuery.includes('contact') || lowerQuery.includes('wasiliana') || lowerQuery.includes('namba')) {
      return {
        text: "You can contact the campaign through WhatsApp, phone, email, or the online contact form.",
        actions: [{ type: 'LINK', title: 'Contact Us', url: '/contact', buttonText: 'Contact Campaign' }]
      };
    }
    if (lowerQuery.includes('event') || lowerQuery.includes('meeting') || lowerQuery.includes('mkutano')) {
      return {
        text: "You can find all upcoming community dialogues, rallies, and town halls on our Events page.",
        actions: [{ type: 'EVENT', title: 'Upcoming Events', url: '/events', buttonText: 'View Events' }]
      };
    }

    // 2. Knowledge Retrieval (Mock logic)
    if (lowerQuery.includes('who is') || lowerQuery.includes('biography') || lowerQuery.includes('about')) {
      return {
        text: aiKnowledgeBase.candidate.biography + " " + aiKnowledgeBase.candidate.background,
        source: { title: 'Meet Phyllis', url: '/#meet-phyllis' },
        actions: [{ type: 'LINK', title: 'Meet Phyllis', url: '/#meet-phyllis', buttonText: 'Read Full Biography' }]
      };
    }
    if (lowerQuery.includes('vision') || lowerQuery.includes('manifesto') || lowerQuery.includes('stand for') || lowerQuery.includes('plan')) {
      return {
        text: "Healthcare is addressed under the campaign's Development Pillars. " + aiKnowledgeBase.campaign.vision + "\n\n" + aiKnowledgeBase.campaign.manifesto,
        source: { title: 'Vision & Manifesto', url: '/#vision' },
        actions: [{ type: 'MANIFESTO', title: 'Vision & Manifesto', description: 'Explore the campaign priorities.', url: '/#vision', buttonText: 'Read Full Plan' }]
      };
    }
    if (lowerQuery.includes('100 days') || lowerQuery.includes('first 100') || lowerQuery.includes('priority')) {
      return {
        text: "According to the First 100 Days Plan, priorities include:\n- " + aiKnowledgeBase.first100Days.join('\n- '),
        source: { title: 'First 100 Days Plan', url: '/#100-days' }
      };
    }
    if (lowerQuery.includes('ward') || lowerQuery.includes('constituency') || lowerQuery.includes('community')) {
      return {
        text: "We are tracking priorities across all constituencies in Kiambu County, including " + aiKnowledgeBase.locations.constituencies.slice(0, 3).join(', ') + " and more. You can view local priorities in your specific ward.",
        actions: [{ type: 'COMMUNITY', title: 'Explore Community', url: '/#community', buttonText: 'View Community' }]
      };
    }

    // 3. Opponent / Election Neutrality
    if (lowerQuery.includes('vote for') || lowerQuery.includes('election') || lowerQuery.includes('better than')) {
      return {
        text: "Your vote is your choice. I can help you understand Phyllis Wangui's published vision, manifesto, and development priorities so you can make your own informed decision.",
        actions: [{ type: 'LINK', title: 'Explore Vision', url: '/#vision', buttonText: 'Explore Vision' }]
      };
    }

    // 4. Fallback
    return {
      text: "I don't have enough verified information to answer that accurately right now. You can check upcoming town halls and schedules in the Campaign Events section, or try asking something else.",
      actions: [{ type: 'LINK', title: 'Campaign Events & Town Halls', url: '/events', buttonText: 'View Events' }]
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      const response = processQuery(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: response.text || '',
        source: response.source,
        actions: response.actions,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleFeedback = (id: string, type: 'positive' | 'negative') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, feedback: type } : m));
  };

  const handleNavigate = (url: string) => {
    if (url.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(url.replace('/#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(url);
    }
    // Optionally close assistant on navigation?
    // setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-[var(--color-brand-black)] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
        aria-label="Open AI Assistant"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[400px] h-[100dvh] sm:h-[650px] sm:max-h-[85vh] bg-gray-50 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 font-sans"
          >
            {/* Header */}
            <div className="bg-[var(--color-brand-black)] text-white p-4 flex items-center justify-between shadow-sm z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 text-[var(--color-primary-green)]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Phyllis Wangui AI Assistant</h3>
                  <p className="text-[0.65rem] text-gray-400 uppercase tracking-widest mt-0.5">Digital Guide to the Campaign</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleClearChat}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="New Conversation"
                  aria-label="New Conversation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Disclaimer Bar */}
            <div className="bg-gray-100 px-4 py-2 text-[0.65rem] text-gray-500 text-center border-b border-gray-200 shrink-0">
              I'm an AI assistant and not Phyllis Wangui herself. AI-generated responses may occasionally contain errors.
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              {messages.map((msg, index) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-full`}>
                  
                  {/* Message Bubble */}
                  <div className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm flex items-start gap-3 ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-primary-green)] text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                  }`}>
                    {msg.role === 'assistant' && <Bot className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />}
                    <div className="leading-relaxed whitespace-pre-wrap flex-1">{msg.text}</div>
                  </div>

                  {/* Sources & Actions (Only for AI) */}
                  {msg.role === 'assistant' && (
                    <div className="mt-2 ml-2 space-y-2 w-full max-w-[85%]">
                      {/* Source Link */}
                      {msg.source && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-gray-400 uppercase tracking-wider text-[0.6rem]">Source:</span>
                          <button onClick={() => handleNavigate(msg.source!.url)} className="text-gray-600 hover:text-[var(--color-primary-green)] font-medium inline-flex items-center gap-1 transition-colors">
                            {msg.source.title} <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      {/* Action Cards */}
                      {msg.actions && msg.actions.map((action, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:border-[var(--color-primary-green)] transition-colors cursor-pointer" onClick={() => handleNavigate(action.url)}>
                           <div className="text-[0.65rem] font-bold text-[var(--color-primary-green)] uppercase tracking-widest mb-1">{action.type}</div>
                           <div className="font-bold text-gray-800 text-sm">{action.title}</div>
                           {action.description && <div className="text-xs text-gray-500 mt-1">{action.description}</div>}
                           <div className="mt-3 flex items-center justify-between text-xs font-bold text-[var(--color-brand-black)] group">
                             {action.buttonText}
                             <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary-green)] transition-colors" />
                           </div>
                        </div>
                      ))}

                      {/* Feedback UI (Only on last message if it's AI) */}
                      {index === messages.length - 1 && (
                        <div className="flex items-center gap-2 mt-3 text-gray-400">
                           <span className="text-[0.65rem] font-medium mr-1">Helpful?</span>
                           <button onClick={() => handleFeedback(msg.id, 'positive')} className={`p-1 rounded hover:bg-gray-200 transition-colors ${msg.feedback === 'positive' ? 'text-[var(--color-primary-green)] bg-green-50' : ''}`}>
                             <ThumbsUp className="w-3.5 h-3.5" />
                           </button>
                           <button onClick={() => handleFeedback(msg.id, 'negative')} className={`p-1 rounded hover:bg-gray-200 transition-colors ${msg.feedback === 'negative' ? 'text-red-500 bg-red-50' : ''}`}>
                             <ThumbsDown className="w-3.5 h-3.5" />
                           </button>
                           <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>
                           <button className="p-1 rounded hover:bg-gray-200 transition-colors flex items-center gap-1 text-[0.65rem]">
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
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-4 shadow-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts (Only show if no user messages yet) */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-4 flex flex-wrap gap-2 shrink-0">
                {SUGGESTED_PROMPTS.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-xs font-medium bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-colors shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
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
                  placeholder="Ask about the campaign..."
                  rows={1}
                  className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all resize-none max-h-32"
                  style={{ minHeight: '44px' }}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 bottom-2 w-8 h-8 rounded-xl bg-[var(--color-primary-green)] text-white flex items-center justify-center shrink-0 hover:bg-[var(--color-deep-green)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <div className="text-[0.6rem] text-center text-gray-400 mt-2 px-4 leading-tight">
                Please avoid sharing sensitive personal information. <Link to="/privacy-policy" className="underline hover:text-gray-600">Privacy Policy</Link>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
