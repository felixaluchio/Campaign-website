import { LegalPageLayout } from '../../components/shared/LegalPageLayout';

export function CookiePolicy() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="May 1, 2026">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 text-amber-800">
        <strong className="block mb-2 font-bold">Placeholder Configuration</strong>
        <p className="text-sm m-0">This is a structural placeholder for the campaign's official Cookie Policy.</p>
      </div>

      <h2>What Are Cookies</h2>
      <p>
        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
      </p>

      <h2>How We Use Cookies</h2>
      <p>
        The Wakili Phyllis Wangui campaign uses cookies to understand how visitors interact with our website, to improve performance, and to remember your preferences (such as your cookie consent choice).
      </p>

      <h2>Types of Cookies We Use</h2>
      <ul>
        <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences.</li>
        <li><strong>Analytics Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.</li>
      </ul>

      <h2>Managing Cookies</h2>
      <p>
        You can control and manage cookies using your browser settings. Please note that removing or blocking cookies can impact your user experience and parts of this website may no longer be fully accessible.
      </p>

      <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-bold mt-0">Manage Your Preferences</h3>
        <p className="text-sm text-gray-600 mb-4">You can update your cookie preferences for this website at any time.</p>
        <button 
          onClick={() => {
            localStorage.removeItem('campaign_cookie_consent');
            window.location.reload();
          }}
          className="px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-semibold hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-colors"
        >
          Reset Cookie Preferences
        </button>
      </div>
    </LegalPageLayout>
  );
}
