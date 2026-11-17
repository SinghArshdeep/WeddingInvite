import { CelebrationsSection } from '@/components/wedding/CelebrationsSection'
import { CountdownSection } from '@/components/wedding/CountdownSection'
import { DateRevealSection } from '@/components/wedding/DateRevealSection'
import { HeroSection } from '@/components/wedding/HeroSection'
import { InvitationSection } from '@/components/wedding/InvitationSection'
import { MemoriesSection } from '@/components/wedding/MemoriesSection'
import { MusicPlayer } from '@/components/wedding/MusicPlayer'
import { RSVPSection } from '@/components/wedding/RSVPSection'
import { ThankYouSection } from '@/components/wedding/ThankYouSection'

export default function Page() {
  return (
    <>
      <main>
        <HeroSection />
        <MemoriesSection />
        <InvitationSection />
        <DateRevealSection />
        <CountdownSection />
        <CelebrationsSection />
        <RSVPSection />
        <ThankYouSection />
      </main>
      <MusicPlayer />
    </>
  )
}
