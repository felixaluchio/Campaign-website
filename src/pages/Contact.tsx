import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Phone, Mail, Facebook, Twitter, Linkedin, Youtube, 
  MapPin, Clock, ArrowRight, ChevronDown, CheckCircle2, ChevronRight, Share2, Info
} from 'lucide-react';
import { contactConfig } from '../data/contactConfig';
import { countyData } from '../data/locationData';

const MESSAGE_TYPES = [
  "General Inquiry",
  "Campaign Information",
  "Manifesto / Policy",
  "Community Engagement",
  "Event Information",
  "Volunteer Information",
  "Media Inquiry",
  "Partnership / Collaboration",
  "Website Feedback",
  "Other"
];

const FAQS = [
  {
    q: "How can I contact the campaign?",
    a: "You can reach out through this page using our contact form, or via our official phone number and email once published."
  },
  {
    q: "How can I report a community issue?",
    a: "Please use our dedicated 'Report an Issue' page to submit community concerns so they can be tracked properly."
  },
  {
    q: "How can I join the movement?",
    a: "Visit the 'Join the Movement' page to register as a volunteer or supporter."
  },
  {
    q: "How can I find upcoming events?",
    a: "Our 'Events' page lists all upcoming community dialogues and public forums."
  },
  {
    q: "How can I follow campaign updates?",
    a: "You can follow our official social media channels or subscribe to our newsletter."
  },
  {
    q: "How can I update my communication preferences?",
    a: "You can manage your subscriptions and contact methods via our Communication Preferences page."
  },
  {
    q: "How is my information handled?",
    a: "We take your privacy seriously. Your data is only used to respond to your inquiry or send updates if you have opted in."
  },
  {
    q: "When will I receive a response?",
    a: "We aim to respond as soon as reasonably possible. Response times may vary depending on the nature and volume of inquiries."
  }
];

export function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    messageType: 'General Inquiry',
    priority: 'General',
    constituency: '',
    ward: '',
    message: '',
    consent: false
  });

  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [reference, setReference] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedConstituency = countyData.constituencies.find(c => c.name === formData.constituency);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReview = (e: FormEvent) => {
    e.preventDefault();
    if (formData.messageType === 'Report an Issue') {
      navigate('/report-issue');
      return;
    }
    setStep('review');
  };

  const handleSubmit = () => {
    setReference(`MSG-2026-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`);
    setStep('success');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero */}
      <section className="bg-[var(--color-brand-black)] py-20 border-b border-gray-100 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-primary-green)] rounded-full"></span>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-gray-300">Let's Connect</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Your Voice Matters.<br />We're Listening.
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Whether you have a question, an idea for Kiambu, or want to partner with us, we are here to listen.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact-form" className="px-8 py-4 rounded-full font-bold transition-all bg-[var(--color-primary-green)] hover:bg-[var(--color-deep-green)] text-white shadow-lg">Send a Message</a>
              {contactConfig.whatsapp.enabled ? (
                <a href={`https://wa.me/${contactConfig.whatsapp.number}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all">
                  Chat on WhatsApp
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-white/5 border border-white/10 text-white/50 cursor-not-allowed">
                  Official WhatsApp coming soon
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
        
        {/* Smart Routing */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-16">
          <h2 className="text-lg font-bold mb-4 text-center">Not Sure Where to Start?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/report-issue" className="px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-bold hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-all">I want to report an issue</Link>
            <Link to="/join-the-movement" className="px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-bold hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-all">I want to volunteer</Link>
            <Link to="/events" className="px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-bold hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-all">I want to attend an event</Link>
            <Link to="/events" className="px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-bold hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-all">I want to view town hall schedules</Link>
            <Link to="/track-message" className="px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-bold hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-all">I want to track a message</Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Contact Form Area */}
          <div className="flex-1" id="contact-form">
            <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-black)] mb-8">Send Us a Message</h2>
            
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl">
              
              {step === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-20 h-20 text-[var(--color-primary-green)] mx-auto mb-6" />
                  <h3 className="text-3xl font-serif font-bold mb-4">Thank You for Reaching Out.</h3>
                  <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">Your message has been received by the campaign team. We aim to respond as soon as reasonably possible.</p>
                  
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 inline-block mb-10 text-left min-w-[300px]">
                    <div className="mb-4">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Reference Number</div>
                      <div className="font-mono font-bold text-xl">{reference}</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Date Submitted</div>
                      <div className="font-bold">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Subject</div>
                      <div className="font-bold line-clamp-1">{formData.subject}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/" className="px-8 py-3 rounded-full font-bold bg-[var(--color-brand-black)] text-white hover:bg-gray-800 transition-colors">Return Home</Link>
                    <Link to="/report-issue" className="px-8 py-3 rounded-full font-bold bg-gray-100 text-[var(--color-brand-black)] hover:bg-gray-200 transition-colors">Report a Community Issue</Link>
                  </div>
                </div>
              ) : step === 'review' ? (
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200">
                    <h3 className="text-xl font-bold mb-6 border-b border-gray-200 pb-4">Review Your Message</h3>
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      <div><span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Name</span><span className="font-medium">{formData.name}</span></div>
                      <div><span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Email</span><span className="font-medium">{formData.email}</span></div>
                      <div><span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Phone</span><span className="font-medium">{formData.phone || 'N/A'}</span></div>
                      <div><span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Priority</span><span className="font-medium">{formData.priority}</span></div>
                    </div>
                    {(formData.constituency || formData.ward) && (
                      <div className="grid sm:grid-cols-2 gap-6 mb-6">
                        <div><span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Constituency</span><span className="font-medium">{formData.constituency || 'N/A'}</span></div>
                        <div><span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Ward</span><span className="font-medium">{formData.ward || 'N/A'}</span></div>
                      </div>
                    )}
                    <div className="mb-6"><span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Message Type</span><span className="font-medium">{formData.messageType}</span></div>
                    <div className="mb-6"><span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Subject</span><span className="font-bold">{formData.subject}</span></div>
                    <div><span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Message</span><p className="whitespace-pre-wrap text-gray-700">{formData.message}</p></div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer p-4 bg-[var(--color-soft-bg)] rounded-xl border border-[var(--color-light-green)]">
                    <input type="checkbox" required checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} className="mt-1 w-5 h-5 text-[var(--color-primary-green)] rounded focus:ring-[var(--color-primary-green)]" />
                    <span className="text-sm font-medium text-gray-700 leading-relaxed">I agree that the campaign team may use the information provided to respond to my message.</span>
                  </label>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                    <button onClick={() => setStep('form')} className="px-8 py-4 rounded-xl font-bold bg-gray-100 text-[var(--color-brand-black)] hover:bg-gray-200 transition-colors">Edit Details</button>
                    <button onClick={handleSubmit} disabled={!formData.consent} className="flex-1 px-8 py-4 rounded-xl font-bold bg-[var(--color-brand-black)] text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Send Message</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReview} className="space-y-6">
                  
                  {/* Message Type Routing Alert */}
                  {formData.messageType === 'Other' && (
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-200 text-sm font-medium flex justify-between items-center">
                      Need to report a community issue? 
                      <Link to="/report-issue" className="font-bold underline ml-2">Report an Issue</Link>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Message Type</label>
                      <div className="relative">
                        <select value={formData.messageType} onChange={e => setFormData({...formData, messageType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[var(--color-primary-green)] font-medium">
                          {MESSAGE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                      <div className="relative">
                        <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[var(--color-primary-green)] font-medium">
                          <option value="General">General</option>
                          <option value="Time Sensitive">Time Sensitive</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {formData.priority === 'Time Sensitive' && (
                    <p className="text-xs text-orange-600 font-bold">Please note that this contact form is not an emergency service.</p>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Constituency (Optional)</label>
                      <div className="relative">
                        <select value={formData.constituency} onChange={e => { setFormData({...formData, constituency: e.target.value, ward: ''}); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[var(--color-primary-green)]">
                          <option value="">Select Constituency</option>
                          {countyData.constituencies.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Ward (Optional)</label>
                      <div className="relative">
                        <select disabled={!formData.constituency} value={formData.ward} onChange={e => setFormData({...formData, ward: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[var(--color-primary-green)] disabled:opacity-50">
                          <option value="">Select Ward</option>
                          {selectedConstituency?.wards.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                    <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                    <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)] resize-none" placeholder="How can we help?"></textarea>
                  </div>

                  <div className="pt-6">
                    <button type="submit" className="w-full bg-[var(--color-brand-black)] text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors flex justify-center items-center gap-2">
                      Review Message <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4 max-w-sm mx-auto">
                      Submitting a message does not guarantee a particular action or outcome.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[400px] shrink-0 space-y-8">
            
            {/* Communication Channels */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Choose How You'd Like to Connect</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="w-5 h-5 text-[var(--color-primary-green)]" />
                    <h4 className="font-bold">WhatsApp</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Connect with the campaign team directly.</p>
                  {contactConfig.whatsapp.enabled ? (
                    <a href={`https://wa.me/${contactConfig.whatsapp.number}`} target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--color-primary-green)] hover:underline">Open WhatsApp</a>
                  ) : (
                    <span className="text-xs font-bold text-gray-400">Official WhatsApp coming soon.</span>
                  )}
                </div>
                
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-[var(--color-primary-green)]" />
                    <h4 className="font-bold">Phone</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Speak with the campaign office.</p>
                  {contactConfig.phone.enabled ? (
                    <a href={`tel:${contactConfig.phone.number}`} className="text-sm font-bold text-[var(--color-primary-green)] hover:underline">Call the Campaign</a>
                  ) : (
                    <span className="text-xs font-bold text-gray-400">Official phone contact coming soon.</span>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-[var(--color-primary-green)]" />
                    <h4 className="font-bold">Email</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Send a detailed message to the campaign team.</p>
                  {contactConfig.email.enabled ? (
                    <a href={`mailto:${contactConfig.email.address}`} className="text-sm font-bold text-[var(--color-primary-green)] hover:underline">Send an Email</a>
                  ) : (
                    <span className="text-xs font-bold text-gray-400">Official email coming soon.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Campaign Information */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Campaign Information</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest mb-2"><MapPin className="w-4 h-4" /> Campaign Office</div>
                  {contactConfig.office.address ? (
                    <p className="text-gray-700 font-medium">{contactConfig.office.address}</p>
                  ) : (
                    <p className="text-gray-400 text-sm">Official office details coming soon.</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest mb-2"><Clock className="w-4 h-4" /> Office Hours</div>
                  {contactConfig.office.hours.length > 0 ? (
                    <ul className="text-gray-700 text-sm space-y-1">
                      {contactConfig.office.hours.map((h, i) => <li key={i} className="flex justify-between"><span>{h.day}</span><span className="font-medium">{h.time}</span></li>)}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm">Official office hours will be published soon.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Media & Press */}
            <div className="bg-[var(--color-soft-bg)] p-8 rounded-3xl border border-[var(--color-light-green)] shadow-sm">
              <h3 className="text-xl font-bold mb-3">Media & Press</h3>
              <p className="text-sm text-gray-600 mb-4">For media inquiries, interview requests and official campaign information.</p>
              {contactConfig.media.email || contactConfig.media.phone ? (
                <div className="text-sm font-medium text-gray-700 space-y-2 mb-4">
                  {contactConfig.media.contactPerson && <div>Contact: {contactConfig.media.contactPerson}</div>}
                  {contactConfig.media.email && <div>Email: {contactConfig.media.email}</div>}
                  {contactConfig.media.phone && <div>Phone: {contactConfig.media.phone}</div>}
                </div>
              ) : (
                <p className="text-xs text-gray-500 font-bold mb-4">Official media contact information coming soon.</p>
              )}
              <button onClick={() => { setFormData({...formData, messageType: 'Media Inquiry'}); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth'}); }} className="w-full bg-white border border-[var(--color-primary-green)] text-[var(--color-primary-green)] py-2 rounded-xl font-bold hover:bg-[var(--color-primary-green)] hover:text-white transition-colors text-sm">Media Inquiry</button>
            </div>

            {/* Social Media */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Follow the Journey</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(contactConfig.social).map(([platform, url]) => {
                  if (!url) return null;
                  const Icon = platform === 'facebook' ? Facebook : platform === 'twitter' || platform === 'x' ? Twitter : platform === 'linkedin' ? Linkedin : platform === 'youtube' ? Youtube : Share2;
                  return (
                    <a key={platform} href={url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 text-gray-600 hover:text-[var(--color-primary-green)]">
                      <Icon className="w-6 h-6 mb-2" />
                      <span className="text-xs font-bold capitalize">{platform}</span>
                    </a>
                  );
                })}
                {Object.values(contactConfig.social).every(url => !url) && (
                  <div className="col-span-2 text-center text-sm text-gray-400 py-4">Official channels will be added soon.</div>
                )}
              </div>
            </div>
            
            {/* Communication Preferences Link */}
            <div className="text-center">
              <Link to="/communication-preferences" className="text-sm font-bold text-gray-500 hover:text-[var(--color-primary-green)] underline">Manage Communication Preferences</Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Common questions about connecting with the campaign.</p>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)} 
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-5 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-20 bg-[var(--color-brand-black)] text-white p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto">
          <Info className="w-8 h-8 text-[var(--color-primary-green)] mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold mb-4">Your Information Matters</h2>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed mb-6">
            We collect your name, email, and contact details solely to respond to your inquiries or provide requested campaign updates. Your information is accessed only by authorized campaign staff and is never sold to third parties. You may request deletion or update your preferences at any time.
          </p>
          <div className="flex justify-center gap-6 text-sm font-bold">
            <Link to="/privacy-policy" className="hover:text-[var(--color-primary-green)] underline">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover:text-[var(--color-primary-green)] underline">Terms of Use</Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
