import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, ArrowRight, MapPin, FileText, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { countyData } from '../data/locationData';

export function ReportIssue() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    constituency: '',
    ward: '',
    description: '',
    name: '',
    phone: '',
    evidence: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reference, setReference] = useState('');

  const selectedConstituency = countyData.constituencies.find(c => c.name === formData.constituency);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setReference(`ISS-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1500);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center">
          <div className="w-20 h-20 bg-[var(--color-light-green)] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--color-primary-green)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Report Submitted</h2>
          <p className="text-gray-600 mb-8">
            Thank you for bringing this to our attention. Your report has been securely logged.
          </p>
          <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">Your Reference Number</p>
            <p className="text-3xl font-mono font-bold text-[var(--color-primary-green)]">{reference}</p>
          </div>
          <Link
            to="/"
            className="inline-flex justify-center w-full bg-[var(--color-brand-black)] text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-campaign-red)] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <AlertTriangle className="w-4 h-4" />
            Direct Action
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Report an Issue</h1>
          <p className="text-lg text-gray-600">Help us identify and address community challenges in Kiambu County.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="flex border-b border-gray-100">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`flex-1 h-2 transition-colors ${step >= num ? 'bg-[var(--color-primary-green)]' : 'bg-gray-100'}`} />
            ))}
          </div>

          <div className="p-8 md:p-12">
            <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
              
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold flex items-center gap-2"><MapPin className="text-[var(--color-primary-green)]" /> Location & Category</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Constituency</label>
                        <select 
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]"
                          value={formData.constituency}
                          onChange={(e) => setFormData({...formData, constituency: e.target.value, ward: ''})}
                        >
                          <option value="">Select Constituency</option>
                          {countyData.constituencies.map(c => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      {selectedConstituency && (
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Ward</label>
                          <select 
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]"
                            value={formData.ward}
                            onChange={(e) => setFormData({...formData, ward: e.target.value})}
                          >
                            <option value="">Select Ward</option>
                            {selectedConstituency.wards.map(w => (
                              <option key={w} value={w}>{w}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Issue Category</label>
                        <select 
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                          <option value="">Select Category</option>
                          <option value="Healthcare">Healthcare & Hospitals</option>
                          <option value="Infrastructure">Roads & Infrastructure</option>
                          <option value="Water">Water & Sanitation</option>
                          <option value="Education">Education & Youth</option>
                          <option value="Business">Business & Markets</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold flex items-center gap-2"><FileText className="text-[var(--color-primary-green)]" /> Details & Evidence</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                        <textarea 
                          required
                          rows={4}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]"
                          placeholder="Please describe the issue in detail..."
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Evidence (Optional)</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[var(--color-primary-green)] transition-colors cursor-pointer bg-gray-50">
                          <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-semibold text-gray-600">Click to upload photos</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold flex items-center gap-2"><AlertTriangle className="text-[var(--color-primary-green)]" /> Contact & Review</h3>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                      Your contact details remain confidential and will only be used to follow up on this specific issue.
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input 
                          required
                          type="text"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                        <input 
                          required
                          type="tel"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Back
                  </button>
                ) : <div></div>}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--color-primary-green)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--color-deep-green)] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? 'Processing...' : step === 3 ? 'Submit Report' : 'Continue'}
                  {!isSubmitting && step < 3 && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
