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
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-black relative pt-[80%] sm:pt-[56.25%] min-h-[250px]">
              <iframe 
                src="https://drive.google.com/file/d/1raJdpUbujLePIZwXtBgZGEvnG3eXtt-q/preview"
                className="absolute top-0 left-0 w-full h-full border-0"
                style={{ width: '100%', minWidth: '100%' }}
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Workshop Video"
              ></iframe>
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
