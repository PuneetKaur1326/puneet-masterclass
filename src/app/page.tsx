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
        
        {/* Workshop Video Section */}
        <section className="bg-background py-8 md:py-12 border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-black aspect-video relative flex items-center justify-center">
              <video 
                className="w-full h-full outline-none"
                controls
                preload="metadata"
                controlsList="nodownload"
                poster="/images/hero/hero-new.png"
              >
                <source src="https://drive.google.com/uc?export=download&id=1raJdpUbujLePIZwXtBgZGEvnG3eXtt-q" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <PainSection />
        <DiscoverSection />
        <MentorSection />
        <PricingFaqSection />
      </main>
      <Footer />
    </>
  );
}
