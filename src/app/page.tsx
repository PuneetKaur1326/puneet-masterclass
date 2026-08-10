import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/app/components/HeroSection';
import PainSection from '@/app/components/PainSection';
import DiscoverSection from '@/app/components/DiscoverSection';
import MentorSection from '@/app/components/MentorSection';
import PricingFaqSection from '@/app/components/PricingFaqSection';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PainSection />
        <DiscoverSection />
        <MentorSection />
        <PricingFaqSection />
      </main>
      <Footer />
    </>
  );
}
