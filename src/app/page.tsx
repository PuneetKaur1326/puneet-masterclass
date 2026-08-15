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
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-black aspect-video relative">
              <iframe 
                src="https://drive.google.com/file/d/1raJdpUbujLePIZwXtBgZGEvnG3eXtt-q/preview"
                className="w-full h-full absolute top-0 left-0 border-0"
                allow="autoplay"
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
