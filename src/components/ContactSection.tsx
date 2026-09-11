import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function ContactSection() {
  return (
    <section className="py-24 bg-[var(--color-soft-bg)] border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-4xl font-serif font-bold text-[var(--color-brand-black)] mb-6">Contact the Campaign</h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We are always ready to hear from you. Reach out to our campaign office or drop us a message online.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                  <MapPin className="w-5 h-5 text-[var(--color-primary-green)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-black)] mb-1">Campaign Secretariat</h4>
                  <p className="text-gray-600 text-sm">[Campaign info: Kiambu Town Headquarters Address]</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                  <Phone className="w-5 h-5 text-[var(--color-primary-green)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-black)] mb-1">Phone & WhatsApp</h4>
                  <p className="text-gray-600 text-sm">[Campaign info: Official phone numbers]</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                  <Mail className="w-5 h-5 text-[var(--color-primary-green)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-black)] mb-1">Email Address</h4>
                  <p className="text-gray-600 text-sm">[Campaign info: info@phylliswangui.com]</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                  <Clock className="w-5 h-5 text-[var(--color-primary-green)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-brand-black)] mb-1">Office Hours</h4>
                  <p className="text-gray-600 text-sm">Monday – Friday, 8:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-primary-green)] rounded-t-3xl"></div>
            <h3 className="text-2xl font-bold text-[var(--color-brand-black)] mb-8">Send a Message</h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all resize-none"
                  placeholder="How can we help?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[var(--color-primary-green)] hover:bg-[var(--color-deep-green)] text-white font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
