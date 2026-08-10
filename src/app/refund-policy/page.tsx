import { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Puneet Kaur Saluja',
  description: 'Learn about our refund, cancellation and workshop registration policies.',
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicyPage() {
  const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'puneet.contentatia@gmail.com';
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 74289 21087';

  const toc = [
    { id: 'section-1', title: '1. Workshop Registration' },
    { id: 'section-2', title: '2. Cancellation by the Participant' },
    { id: 'section-3', title: '3. Refund Eligibility' },
    { id: 'section-4', title: '4. Workshop Cancellation or Postponement by the Organiser' },
    { id: 'section-5', title: '5. Technical Issues' },
    { id: 'section-6', title: '6. Refund Processing' },
    { id: 'section-7', title: '7. Payment Gateway and Transaction Information' },
    { id: 'section-8', title: '8. How to Request a Refund' },
    { id: 'section-9', title: '9. Refund Decisions' },
    { id: 'section-10', title: '10. Changes to This Policy' },
    { id: 'section-11', title: '11. Contact Us' },
  ];

  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      effectiveDate="16 July 2026"
      toc={toc}
    >
      <p>This Refund & Cancellation Policy explains how you may cancel your registration or request a refund for The Psychology Behind Writing – Live Online Masterclass purchased through puneetkaursaluja.com.</p>
      <p>The workshop is a digital, live online service and does not involve the shipment or delivery of physical products.</p>

      <h2 id="section-1">1. Workshop Registration</h2>
      <p>Registration for the workshop is confirmed only after successful completion of the registration and payment process.</p>
      <p>The applicable workshop fee is displayed on the website at the time of registration.</p>
      <p>Once payment has been successfully completed, the participant may receive registration confirmation and workshop-related information through email, WhatsApp, or other communication channels.</p>

      <h2 id="section-2">2. Cancellation by the Participant</h2>
      <p>A participant may request cancellation of their registration by contacting us at:</p>
      <p><a href={`mailto:${businessEmail}`}>{businessEmail}</a></p>
      <p>Cancellation requests should include the participant's name, registered email address, phone number, and payment/transaction reference, where available.</p>
      <p>Because the workshop is a scheduled live digital service, cancellation requests may be subject to the timing of the request and whether the workshop has already commenced.</p>
      <p>Cancellation requests received before the workshop begins may be considered for a refund.</p>
      <p>Once the live workshop has commenced, cancellation or refund requests will generally not be accepted, except where required by applicable law or where otherwise approved by the organiser.</p>

      <h2 id="section-3">3. Refund Eligibility</h2>
      <p>A refund may be considered in the following circumstances:</p>
      <ul>
        <li>The participant cancels before the workshop begins and the cancellation meets the applicable cancellation conditions.</li>
        <li>The organiser cancels the workshop.</li>
        <li>The organiser is unable to provide the workshop for reasons attributable to the organiser.</li>
        <li>A technical or operational issue attributable to the organiser prevents the participant from reasonably accessing the workshop, subject to verification of the issue.</li>
        <li>Any other circumstance where a refund is required under applicable law.</li>
      </ul>
      <p>Refunds are not generally available merely because a participant:</p>
      <ul>
        <li>Changes their mind after the workshop has started.</li>
        <li>Does not attend the live session after successfully registering.</li>
        <li>Misses the workshop due to personal circumstances.</li>
        <li>Experiences technical issues caused by their own device, internet connection, browser, or third-party service, where the workshop itself was available.</li>
      </ul>

      <h2 id="section-4">4. Workshop Cancellation or Postponement by the Organiser</h2>
      <p>If the workshop is cancelled by Puneet Kaur Saluja / Contentatia, registered participants will be notified using the contact information provided during registration.</p>
      <p>Depending on the circumstances, participants may be offered:</p>
      <ul>
        <li>A full refund; or</li>
        <li>An alternative date/session.</li>
      </ul>
      <p>If a participant does not wish to attend the rescheduled session and a refund is offered, the refund will be processed according to the applicable refund procedure.</p>

      <h2 id="section-5">5. Technical Issues</h2>
      <p>The workshop is delivered online and requires a compatible device and a stable internet connection.</p>
      <p>If you experience difficulty accessing the workshop, please contact us as soon as possible at:</p>
      <p><a href={`mailto:${businessEmail}`}>{businessEmail}</a></p>
      <p>We will make reasonable efforts to help resolve genuine access or technical issues relating to the workshop.</p>
      <p>Issues caused by the participant's own internet connection, device, browser, software, or third-party services may not qualify for a refund.</p>

      <h2 id="section-6">6. Refund Processing</h2>
      <p>Where a refund is approved, it will generally be processed to the original payment method used for the transaction.</p>
      <p>The time taken for the refunded amount to appear in the participant's account may depend on the payment provider, bank, or financial institution involved.</p>
      <p>We will initiate the refund within the applicable processing period after approval.</p>

      <h2 id="section-7">7. Payment Gateway and Transaction Information</h2>
      <p>Payments may be processed through PhonePe or another payment service provider made available through the website.</p>
      <p>We do not directly store your card details, UPI PIN, banking password, or other payment credentials.</p>
      <p>Refunds relating to successful transactions may be processed through the applicable payment gateway or payment provider.</p>

      <h2 id="section-8">8. How to Request a Refund</h2>
      <p>To request a cancellation or refund, contact:</p>
      <p>
        Puneet Kaur Saluja<br />
        Parent Organisation: Contentatia
      </p>
      <p>
        Email: <a href={`mailto:${businessEmail}`}>{businessEmail}</a><br />
        Phone: {businessPhone}
      </p>
      <p>Please provide:</p>
      <ul>
        <li>Full name</li>
        <li>Registered email address</li>
        <li>Registered phone number</li>
        <li>Date of purchase</li>
        <li>Transaction/reference ID</li>
        <li>Reason for requesting the refund</li>
      </ul>
      <p>We may request additional information where reasonably necessary to verify the transaction.</p>

      <h2 id="section-9">9. Refund Decisions</h2>
      <p>Each refund request will be reviewed according to this policy, the circumstances of the request, and applicable law.</p>
      <p>Nothing in this policy is intended to restrict any consumer rights or remedies that cannot legally be excluded.</p>

      <h2 id="section-10">10. Changes to This Policy</h2>
      <p>We may update this Refund & Cancellation Policy from time to time.</p>
      <p>Any changes will be published on this page with an updated effective date.</p>

      <h2 id="section-11">11. Contact Us</h2>
      <p>For questions regarding cancellations, refunds, or workshop registrations, please contact:</p>
      <p>
        Puneet Kaur Saluja<br />
        Parent Organisation: Contentatia
      </p>
      <p>
        Website: puneetkaursaluja.com<br />
        Email: <a href={`mailto:${businessEmail}`}>{businessEmail}</a><br />
        Phone: {businessPhone}<br />
        Location: New Delhi, India
      </p>
    </LegalPageLayout>
  );
}
