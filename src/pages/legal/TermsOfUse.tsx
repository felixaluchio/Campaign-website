import { LegalPageLayout } from '../../components/shared/LegalPageLayout';

export function TermsOfUse() {
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="May 1, 2026">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 text-amber-800">
        <strong className="block mb-2 font-bold">Placeholder Configuration</strong>
        <p className="text-sm m-0">This is a structural placeholder for the campaign's official Terms of Use. The actual legal text must be provided by the campaign's legal team.</p>
      </div>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
      </p>

      <h2>2. Use of Website</h2>
      <p>
        This website is provided for informational purposes regarding the Wakili Phyllis Wangui campaign. You agree to use this site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All content on this website, including text, graphics, logos, images, and software, is the property of the campaign or its content suppliers and is protected by copyright laws.
      </p>

      <h2>4. User Contributions</h2>
      <p>
        Users may have the opportunity to submit issues, messages, or other content. By submitting content, you grant the campaign a non-exclusive, royalty-free license to use, reproduce, and distribute that content in connection with the campaign.
      </p>

      <h2>5. Disclaimer of Warranties</h2>
      <p>
        This website is provided "as is" without any representations or warranties, express or implied. The campaign makes no representations or warranties in relation to this website or the information and materials provided on this website.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        The campaign will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special, or consequential loss.
      </p>
    </LegalPageLayout>
  );
}
