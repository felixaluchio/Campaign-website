import { LegalPageLayout } from '../../components/shared/LegalPageLayout';

export function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="May 1, 2026">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 text-amber-800">
        <strong className="block mb-2 font-bold">Placeholder Configuration</strong>
        <p className="text-sm m-0">This is a structural placeholder for the campaign's official Privacy Policy. The actual legal text must be provided by the campaign's legal team.</p>
      </div>

      <h2>1. Information We Collect</h2>
      <p>
        When you interact with the Wakili Phyllis Wangui campaign, we may collect information that you voluntarily provide to us, such as your name, email address, phone number, and physical address. This occurs when you sign up to volunteer, subscribe to our newsletter, or report an issue.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use the information we collect to communicate with you about campaign updates, events, and volunteer opportunities. We may also use this information to respond to your inquiries and improve our digital services.
      </p>

      <h2>3. Information Sharing and Disclosure</h2>
      <p>
        We do not sell, rent, or trade your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our campaign, provided they agree to keep this information confidential.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal information. If you would like to exercise these rights, please contact us using the information provided below.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact the campaign through our official contact channels.
      </p>
    </LegalPageLayout>
  );
}
