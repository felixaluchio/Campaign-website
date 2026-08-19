import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import { countyData } from '../../data/locationData';

const INTERESTS = ["Community Volunteer", "Digital Volunteer", "Event Support", "Community Listener", "Professional / Skills", "Content & Creative", "Research & Policy", "Other"];
const SKILLS = ["Communication", "Technology", "Graphic Design", "Photography", "Video", "Writing", "Research", "Event Organization", "Community Mobilization", "Public Speaking", "Administration", "Other"];

export function VolunteerRegistration() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [volunteerRef, setVolunteerRef] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    county: 'Kiambu County', constituency: '', ward: '',
    interests: [] as string[], skills: [] as string[],
    availability: '', hoursPreference: '',
    consentEmail: false, consentSMS: false, consentWhatsApp: false
  });

  const updateForm = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
  
  const toggleArrayItem = (field: 'interests' | 'skills', item: string) => {
    setFormData(prev => {
      const array = prev[field];
      return array.includes(item) ? { ...prev, [field]: array.filter(i => i !== item) } : { ...prev, [field]: [...array, item] };
    });
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setVolunteerRef(`VOL-2026-${Math.floor(Math.random() * 10000).toString().padStart(6, '0')}`);
      setIsSuccess(true);
    }, 1500);
  };

  const selectedConstituency = countyData.constituencies.find(c => c.name === formData.constituency);

  if (isSuccess) {
    return (
      <section id="register" className="py-24 bg-gray-50 relative text-center">
        <div className="max-w-2xl mx-auto px-4">
           <CheckCircle2 className="w-16 h-16 text-[var(--color-primary-green)] mx-auto mb-6" />
           <h2 className="text-4xl font-serif font-bold mb-4">Welcome to the Movement.</h2>
           <p className="text-gray-600 mb-8">Thank you for expressing your interest.</p>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
             <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Volunteer Reference</div>
             <div className="text-3xl font-mono font-bold mb-6">{volunteerRef}</div>
             <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Location</div>
             <div className="text-lg font-medium">{formData.ward} Ward, {formData.constituency}</div>
           </div>
           <div className="flex justify-center gap-4">
             <a href="#opportunities" className="bg-[var(--color-primary-green)] text-white px-8 py-4 rounded-full font-bold">Explore Campaign Priorities</a>
           </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-24 bg-gray-50 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-xl overflow-hidden">
          <div className="bg-[var(--color-primary-green)] text-white p-8 md:p-12">
            <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-light-green)] mb-4">Step {step} of 7</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Join the Movement</h2>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                <div key={num} className={`h-1.5 flex-1 rounded-full ${num === step ? 'bg-white' : num < step ? 'bg-white/40' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
          <div className="p-8 md:p-12">
            <form onSubmit={step === 7 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
              
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">About You</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                      <input required type="text" value={formData.firstName} onChange={e => updateForm('firstName', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                      <input required type="text" value={formData.lastName} onChange={e => updateForm('lastName', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                      <input required type="tel" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                      <input required type="email" value={formData.email} onChange={e => updateForm('email', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Find Your Community</h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Constituency *</label>
                    <select required value={formData.constituency} onChange={e => { updateForm('constituency', e.target.value); updateForm('ward', ''); }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                      <option value="">Select Constituency</option>
                      {countyData.constituencies.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ward *</label>
                    <select required disabled={!formData.constituency} value={formData.ward} onChange={e => updateForm('ward', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                      <option value="">Select Ward</option>
                      {selectedConstituency?.wards.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">How Would You Like to Help?</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {INTERESTS.map(interest => (
                      <label key={interest} className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.interests.includes(interest) ? 'border-[var(--color-primary-green)] bg-[var(--color-light-green)]' : 'border-gray-100 bg-white'}`}>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${formData.interests.includes(interest) ? 'bg-[var(--color-primary-green)] border-[var(--color-primary-green)]' : 'border-gray-300'}`}>
                          {formData.interests.includes(interest) && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <span className="font-semibold text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Share Your Skills (Optional)</h3>
                  <div className="flex flex-wrap gap-3">
                    {SKILLS.map(skill => (
                      <button type="button" key={skill} onClick={() => toggleArrayItem('skills', skill)} className={`px-5 py-2.5 rounded-full text-sm font-bold ${formData.skills.includes(skill) ? 'bg-[var(--color-brand-black)] text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Your Availability</h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">When are you generally available? *</label>
                    <div className="grid gap-3">
                      {['Weekdays', 'Weekday evenings', 'Weekends', 'Occasionally', 'Flexible'].map(opt => (
                        <label key={opt} className="flex items-center gap-3">
                          <input required type="radio" name="availability" value={opt} checked={formData.availability === opt} onChange={e => updateForm('availability', e.target.value)} className="w-5 h-5 text-[var(--color-primary-green)]" />
                          <span className="text-gray-700 font-medium">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Communication Preferences</h3>
                  <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                    <input type="checkbox" checked={formData.consentEmail} onChange={e => updateForm('consentEmail', e.target.checked)} className="mt-1 w-5 h-5 text-[var(--color-primary-green)]" />
                    <div><div className="font-bold">Email Updates</div></div>
                  </label>
                  <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                    <input type="checkbox" checked={formData.consentSMS} onChange={e => updateForm('consentSMS', e.target.checked)} className="mt-1 w-5 h-5 text-[var(--color-primary-green)]" />
                    <div><div className="font-bold">SMS Notifications</div></div>
                  </label>
                  <label className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                    <input type="checkbox" checked={formData.consentWhatsApp} onChange={e => updateForm('consentWhatsApp', e.target.checked)} className="mt-1 w-5 h-5 text-[var(--color-primary-green)]" />
                    <div><div className="font-bold">WhatsApp Messages</div></div>
                  </label>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Review & Join</h3>
                  <div className="bg-gray-50 rounded-2xl p-6 text-sm space-y-4">
                    <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                    <div><strong>Location:</strong> {formData.ward} Ward, {formData.constituency}</div>
                    <div><strong>Interests:</strong> {formData.interests.join(", ")}</div>
                  </div>
                  <p className="text-xs text-gray-500">I agree to be contacted based on the preferences selected.</p>
                </div>
              )}

              <div className="mt-12 flex justify-between">
                {step > 1 ? <button type="button" onClick={prevStep} className="font-bold text-gray-500">Back</button> : <div/>}
                {step < 7 ? (
                  <button type="submit" disabled={step === 3 && formData.interests.length === 0} className="bg-[var(--color-brand-black)] text-white px-8 py-3 rounded-full font-bold">Next</button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="bg-[var(--color-campaign-red)] text-white px-8 py-3 rounded-full font-bold">{isSubmitting ? 'Processing...' : 'Join the Movement'}</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
