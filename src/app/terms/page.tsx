import { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Puneet Kaur Saluja',
  description: 'Read the Terms & Conditions governing the use of this website and workshop registrations.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'puneet.contentatia@gmail.com';
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 74289 21087';

  const toc = [
    { id: 'section-1', title: '1. Eligibility' },
    { id: 'section-2', title: '2. Workshop Registration' },
    { id: 'section-3', title: '3. Webinar Access' },
    { id: 'section-4', title: '4. Intellectual Property' },
    { id: 'section-5', title: '5. Sharing of Access' },
    { id: 'section-6', title: '6. Participant Conduct' },
    { id: 'section-7', title: '7. Payments' },
    { id: 'section-8', title: '8. Refunds & Cancellations' },
    { id: 'section-9', title: '9. Rescheduling' },
    { id: 'section-10', title: '10. Educational Purpose' },
    { id: 'section-11', title: '11. Disclaimer of Warranties' },
    { id: 'section-12', title: '12. Limitation of Liability' },
    { id: 'section-13', title: '13. Third-Party Services' },
    { id: 'section-14', title: '14. Changes to These Terms' },
    { id: 'section-15', title: '15. Governing Law' },
    { id: 'section-16', title: '16. Contact Us' },
  ];

  return (
    <LegalPageLayout
      title="Terms & Conditions"
      effectiveDate="16 July 2026"
      subtitle={<>Welcome to <strong>puneetkaursaluja.com</strong>, owned and operated by <strong>Puneet Kaur Saluja</strong>, under the registered business name <strong>Contentatia</strong> ("we", "our", "us").</>}
      toc={toc}
    >
      <p>
        These Terms & Conditions govern your access to our website, products, workshops, webinars, and services. By accessing our website or purchasing any product or service, you agree to be bound by these Terms.
      </p>
      <p>
        If you do not agree with these Terms, please refrain from using our website or services.
      </p>

      <h2 id="section-1">1. Eligibility</h2>
      <p>By registering for any workshop or using our services, you confirm that:</p>
      <ul>
        <li>You are at least 18 years of age or have the consent of a parent or legal guardian.</li>
        <li>The information provided during registration is accurate and complete.</li>
        <li>You will use our services only for lawful purposes.</li>
      </ul>

      <h2 id="section-2">2. Workshop Registration</h2>
      <p>Your registration is confirmed only after successful payment.</p>
      <p>
        Once your registration is confirmed, webinar access details will be shared via your registered email address before the scheduled session.
      </p>
      <p>
        Participants are responsible for providing a valid email address and ensuring they have access to a stable internet connection and a compatible device.
      </p>

      <h2 id="section-3">3. Webinar Access</h2>
      <p>Our workshops are conducted live through <strong>Zoho Webinar</strong>.</p>
      <p>
        Participants are solely responsible for joining the webinar on time using the access details shared by us.
      </p>
      <p>
        Failure to attend due to internet issues, device incompatibility, incorrect email details, or personal scheduling conflicts shall not make the participant eligible for a refund or compensation.
      </p>
      <p>Workshop recordings are <strong>not provided</strong> unless explicitly stated otherwise.</p>

      <h2 id="section-4">4. Intellectual Property</h2>
      <p>
        All workshop content, presentations, frameworks, exercises, templates, worksheets, videos, graphics, branding, and written material are the exclusive intellectual property of <strong>Puneet Kaur Saluja (Contentatia)</strong> unless otherwise stated.
      </p>
      <p>
        Your purchase grants you a limited, non-transferable licence to access the workshop for your personal learning only.
      </p>
      <p>You may not:</p>
      <ul>
        <li>Record the workshop in any form.</li>
        <li>Screenshot or reproduce substantial portions of the presentation for commercial use.</li>
        <li>Copy, modify, distribute, sell, republish, or commercially exploit any workshop material.</li>
        <li>Teach, resell, or recreate our proprietary frameworks as your own.</li>
      </ul>
      <p>Any unauthorised use may result in legal action under applicable intellectual property laws.</p>

      <h2 id="section-5">5. Sharing of Access</h2>
      <p>Each registration is valid for one participant only.</p>
      <p>
        Sharing webinar links, login credentials, or allowing multiple individuals to attend using a single registration is strictly prohibited.
      </p>
      <p>We reserve the right to remove participants found violating this policy without refund.</p>

      <h2 id="section-6">6. Participant Conduct</h2>
      <p>We strive to maintain a respectful learning environment.</p>
      <p>Participants are expected to:</p>
      <ul>
        <li>Maintain respectful behaviour throughout the session.</li>
        <li>Refrain from abusive, discriminatory, offensive, or disruptive conduct.</li>
        <li>Avoid spam, self-promotion, or solicitation during the workshop.</li>
      </ul>
      <p>We reserve the right to remove any participant whose behaviour adversely affects the learning experience of others.</p>

      <h2 id="section-7">7. Payments</h2>
      <p>All payments are processed securely through authorised payment partners.</p>
      <p>Prices displayed on our website are in Indian Rupees (INR) unless otherwise specified.</p>
      <p>
        Contentatia is not responsible for delays or failures caused by payment gateway providers or banking institutions.
      </p>

      <h2 id="section-8">8. Refunds & Cancellations</h2>
      <p>
        All purchases are subject to our <strong>Refund & Cancellation Policy</strong>, available separately on this website.
      </p>
      <p>
        By completing your purchase, you acknowledge that you have read and accepted that policy.
      </p>

      <h2 id="section-9">9. Rescheduling</h2>
      <p>
        In the event that a workshop is postponed due to unforeseen circumstances, participants will be informed via their registered email address.
      </p>
      <p>Your registration will remain valid for the rescheduled session.</p>

      <h2 id="section-10">10. Educational Purpose</h2>
      <p>Our workshops are intended solely for educational and informational purposes.</p>
      <p>
        While we share practical insights and strategies, we do not guarantee any specific business results, financial outcomes, client acquisition, social media growth, or revenue.
      </p>
      <p>
        Your success depends on numerous factors, including your implementation, experience, market conditions, and individual efforts.
      </p>

      <h2 id="section-11">11. Disclaimer of Warranties</h2>
      <p>Our website, workshops, and services are provided on an "as is" and "as available" basis.</p>
      <p>
        We make no warranties, express or implied, regarding uninterrupted access, accuracy, completeness, or suitability for any particular purpose.
      </p>

      <h2 id="section-12">12. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Puneet Kaur Saluja (Contentatia) shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from the use of our website, workshops, or services.
      </p>
      <p>
        Our total liability, if any, shall not exceed the amount paid by the participant for the specific workshop or service giving rise to the claim.
      </p>

      <h2 id="section-13">13. Third-Party Services</h2>
      <p>
        Our website may integrate or link to third-party services including payment gateways, webinar platforms, analytics tools, or external websites.
      </p>
      <p>
        We are not responsible for the content, functionality, or privacy practices of such third-party services.
      </p>

      <h2 id="section-14">14. Changes to These Terms</h2>
      <p>We reserve the right to update or modify these Terms & Conditions at any time.</p>
      <p>
        The updated version will be published on this page along with the revised effective date.
      </p>
      <p>
        Continued use of our website or services after such changes constitutes acceptance of the revised Terms.
      </p>

      <h2 id="section-15">15. Governing Law</h2>
      <p>
        These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India.
      </p>
      <p>
        Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>New Delhi, India</strong>.
      </p>

      <h2 id="section-16">16. Contact Us</h2>
      <p>
        For any questions regarding these Terms & Conditions, please contact:
      </p>
      <p><strong>Puneet Kaur Saluja (Contentatia)</strong></p>
      <p>Website: puneetkaursaluja.com</p>
      <p>Email: <a href={`mailto:${businessEmail}`}>{businessEmail}</a></p>
      <p>Phone: {businessPhone}</p>
      <p>Location: New Delhi, India</p>
    </LegalPageLayout>
  );
}
