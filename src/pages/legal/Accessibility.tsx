import { LegalPageLayout } from '../../components/shared/LegalPageLayout';

export function Accessibility() {
  return (
    <LegalPageLayout title="Accessibility Statement" lastUpdated="May 1, 2026">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 text-amber-800">
        <strong className="block mb-2 font-bold">Placeholder Configuration</strong>
        <p className="text-sm m-0">This is a structural placeholder for the campaign's official Accessibility statement.</p>
      </div>

      <h2>Our Commitment</h2>
      <p>
        The Wakili Phyllis Wangui campaign is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
      </p>

      <h2>Measures to Support Accessibility</h2>
      <p>
        We take the following measures to ensure accessibility:
      </p>
      <ul>
        <li>Include accessibility throughout our internal policies.</li>
        <li>Integrate accessibility into our procurement practices.</li>
        <li>Provide clear, semantic HTML structures for screen readers.</li>
        <li>Ensure sufficient color contrast across the website.</li>
        <li>Support keyboard navigation.</li>
      </ul>

      <h2>Conformance Status</h2>
      <p>
        We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA. These guidelines explain how to make web content more accessible for people with disabilities, and user friendly for everyone.
      </p>

      <h2>Feedback</h2>
      <p>
        We welcome your feedback on the accessibility of our campaign website. Please let us know if you encounter accessibility barriers by contacting us through our official communication channels.
      </p>
    </LegalPageLayout>
  );
}
