
import { CelebrationsSection } from '@/components/wedding/CelebrationsSection'
import { CountdownSection } from '@/components/wedding/CountdownSection'
import { DateRevealSection } from '@/components/wedding/DateRevealSection'
import { HeroSection } from '@/components/wedding/HeroSection'
import { InvitationSection } from '@/components/wedding/InvitationSection'
import { MemoriesSection } from '@/components/wedding/MemoriesSection'
import { MusicPlayer } from '@/components/wedding/MusicPlayer'
import { WeddingMusicProvider } from '@/components/wedding/WeddingMusicContext'
import { ThankYouSection } from '@/components/wedding/ThankYouSection'

export default function Page() {
  return (
    <WeddingMusicProvider>
      <main>
        <HeroSection />
        <MemoriesSection />
        <InvitationSection />
        <DateRevealSection />
        <CountdownSection />
        <CelebrationsSection />
        <ThankYouSection />
      </main>

      <MusicPlayer />
    </WeddingMusicProvider>
  )
}
