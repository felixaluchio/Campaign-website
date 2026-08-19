import { Hero } from '../components/Hero';
import { Biography } from '../components/Biography';
import { WhyRunning } from '../components/WhyRunning';
import { Vision } from '../components/Vision';
import { Manifesto } from '../components/Manifesto';
import { DevelopmentPillars } from '../components/DevelopmentPillars';
import { ManifestoCTA } from '../components/ManifestoCTA';
import { First100Days } from '../components/First100Days';
import { Community } from '../components/Community';
import { NewsAndEvents } from '../components/NewsAndEvents';
import { IssueReporting } from '../components/IssueReporting';
import { GetInvolved } from '../components/GetInvolved';
import { ContactSection } from '../components/ContactSection';
import { AssistantCTA } from '../components/AssistantCTA';

export function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Biography />
      <WhyRunning />
      <Vision />
      <Manifesto />
      <DevelopmentPillars />
      <ManifestoCTA />
      <First100Days />
      <Community />
      <IssueReporting />
      <NewsAndEvents />
      <GetInvolved />
      <AssistantCTA />
      <ContactSection />
    </div>
  );
}
