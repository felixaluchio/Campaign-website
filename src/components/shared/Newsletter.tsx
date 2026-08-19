import { useState, FormEvent } from 'react';

export function Newsletter() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    consentEmail: false,
    consentSMS: false,
    consentWhatsApp: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate backend call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ email: '', phone: '', consentEmail: false, consentSMS: false, consentWhatsApp: false });
    }, 1500);
  };

  return (
    <section className="py-24 bg-[var(--color-primary-green)] text-white relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Stay Connected to the Journey.</h2>
          <p className="text-[var(--color-light-green)] text-lg">Join our mailing list to receive the latest news, community updates, and event invitations directly to your inbox or phone.</p>
        </div>

        {isSuccess ? (
          <div className="bg-white/10 border border-white/20 p-8 rounded-2xl text-center backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-2">Thank You for Subscribing!</h3>
            <p className="text-white/80">You're now on our updates list. We'll be in touch soon.</p>
            <button onClick={() => setIsSuccess(false)} className="mt-6 text-sm font-bold underline hover:text-[var(--color-light-green)] transition-colors">
              Subscribe another person
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-[32px] text-[var(--color-brand-black)] shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)] transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number (Optional)</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)] transition-colors" placeholder="e.g. 0712 345 678" />
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-bold text-gray-700 mb-4">How would you like to hear from us?</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.consentEmail} onChange={e => setFormData({...formData, consentEmail: e.target.checked})} className="w-5 h-5 text-[var(--color-primary-green)] rounded focus:ring-[var(--color-primary-green)]" />
                  <span className="text-sm font-medium">Email Updates</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.consentSMS} onChange={e => setFormData({...formData, consentSMS: e.target.checked})} className="w-5 h-5 text-[var(--color-primary-green)] rounded focus:ring-[var(--color-primary-green)]" />
                  <span className="text-sm font-medium">SMS</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.consentWhatsApp} onChange={e => setFormData({...formData, consentWhatsApp: e.target.checked})} className="w-5 h-5 text-[var(--color-primary-green)] rounded focus:ring-[var(--color-primary-green)]" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </label>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting || (!formData.consentEmail && !formData.consentSMS && !formData.consentWhatsApp)} className="w-full bg-[var(--color-brand-black)] text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Subscribing...' : 'Stay Connected'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              By subscribing, you agree to receive communications based on your selected preferences. You can opt out at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
