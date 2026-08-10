import { Mail, Phone, Building } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Contact Us | The Psychology Behind Writing',
  description: 'Contact information for The Psychology Behind Writing masterclass by Puneet Kaur Saluja.',
};

export default function ContactPage() {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Contentatia';
  const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'puneet.contentatia@gmail.com';
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 74289 21087';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-24 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 to-transparent blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              Contact Us
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Have questions about the workshop? We're here to help. Reach out to us using the contact details below.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 relative overflow-hidden max-w-2xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Business Name</h3>
                  <p className="text-xl font-bold text-gray-900">{businessName}</p>
                  <p className="text-sm text-gray-500 mt-1">Parent Organisation of Puneet Kaur Saluja</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Email Address</h3>
                  <a href={`mailto:${businessEmail}`} className="text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors">
                    {businessEmail}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We typically reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Phone Number</h3>
                  <a href={`tel:${businessPhone.replace(/\s+/g, '')}`} className="text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors">
                    {businessPhone}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Available Monday to Friday, 10 AM - 6 PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
