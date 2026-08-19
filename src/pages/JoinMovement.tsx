import { MovementHero } from '../components/volunteer/MovementHero';
import { MovementMessage } from '../components/volunteer/MovementMessage';
import { WhyJoin } from '../components/volunteer/WhyJoin';
import { WaysToParticipate } from '../components/volunteer/WaysToParticipate';
import { VolunteerRegistration } from '../components/volunteer/VolunteerRegistration';
import { MovementStats } from '../components/volunteer/MovementStats';
import { Opportunities } from '../components/volunteer/Opportunities';
import { CommunityReach } from '../components/volunteer/CommunityReach';
import { ShareSkills } from '../components/volunteer/ShareSkills';
import { CommunityStories } from '../components/volunteer/CommunityStories';
import { ReferFriend } from '../components/volunteer/ReferFriend';

export function JoinMovement() {
  return (
    <div className="flex flex-col pt-20">
      <MovementHero />
      <MovementMessage />
      <WhyJoin />
      <WaysToParticipate />
      <VolunteerRegistration />
      <Opportunities />
      <MovementStats />
      <CommunityReach />
      <ShareSkills />
      <CommunityStories />
      <ReferFriend />
    </div>
  );
}
