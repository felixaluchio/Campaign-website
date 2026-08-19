import { Heart, Megaphone, MonitorSmartphone, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const involvementWays = [
  {
    title: 'Volunteer Locally',
    description: 'Join our grassroots team to mobilize communities in your ward.',
    icon: Heart
  },
  {
    title: 'Digital Support',
    description: 'Help amplify our message on social media and digital platforms.',
    icon: MonitorSmartphone
  },
  {
    title: 'Community Feedback',
    description: 'Host small group discussions to gather local insights and priorities.',
    icon: Megaphone
  },
  {
    title: 'Provide Expertise',
    description: 'Offer your professional skills (legal, tech, organizing) to the campaign.',
    icon: GraduationCap
  }
];

export function GetInvolved() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-[var(--color-brand-black)] mb-6">Get Involved</h2>
          <p className="text-gray-600 text-lg">
            Building a better Kiambu requires all of us. There are many ways to support the campaign and ensure Wakili Phyllis Wangui represents you effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {involvementWays.map((way, idx) => (
            <div key={idx} className="bg-[var(--color-soft-bg)] rounded-3xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[var(--color-primary-green)]">
                <way.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-brand-black)] mb-3">{way.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {way.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/join-the-movement"
            className="inline-block bg-[var(--color-brand-black)] text-white px-10 py-4 rounded-full font-bold hover:bg-gray-900 transition-colors shadow-md"
          >
            Register to Volunteer
          </Link>
        </div>

      </div>
    </section>
  );
}
