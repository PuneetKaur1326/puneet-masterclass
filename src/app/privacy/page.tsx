import { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Puneet Kaur Saluja',
  description: 'Read our Privacy Policy to understand how your information is collected, used and protected.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPolicyPage() {
  const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'puneet.contentatia@gmail.com';
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 74289 21087';

  return (
    <LegalPageLayout
      title="Privacy Policy"
      effectiveDate="August 8, 2026"
    >
      <h2 id="introduction">Introduction</h2>
      <p>This Privacy Policy describes how Puneet Kaur Saluja and its affiliates (collectively &quot;Puneet Kaur Saluja, we, our, us&quot;) collect, use, share, protect or otherwise process your information/personal data through our website https://puneetkaursaluja.com/ (hereinafter referred to as Platform). Please note that you may be able to browse certain sections of the Platform without registering with us.</p>
      <p>We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.</p>

      <h2 id="collection">Collection</h2>
      <p>We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship and related information provided from time to time.</p>
      <p>Some of the information that we may collect includes but is not limited to personal data/information provided to us during sign-up/registering or using our Platform such as name, address, telephone/mobile number, email ID and/or any such information voluntarily shared by you through registration forms, enquiries, customer support or other interactions with us.</p>
      <p>Some of the sensitive personal data may be collected with your consent, such as your bank account or credit or debit card or other payment instrument information or other information required for processing payments, etc., all of the above being in accordance with applicable law(s).</p>
      <p>We do not directly collect or store your debit card, credit card, UPI PIN, banking password or other confidential payment credentials when you make a payment through our payment partner. Such payment information is processed by the applicable payment service provider in accordance with its own policies and applicable laws.</p>
      <p>You always have the option to not provide information, by choosing not to use a particular service or feature on the Platform.</p>
      <p>We may track your behaviour, preferences, and other information that you choose to provide on our Platform. This information is compiled and analysed on an aggregated basis.</p>
      <p>We will also collect information related to your transactions on the Platform and such third-party business partner platforms. When such a third-party business partner collects your personal data directly from you, you will be governed by their privacy policies. We shall not be responsible for the third-party business partner&apos;s privacy practices or the content of their privacy policies, and we request you to read their privacy policies prior to disclosing any information.</p>
      <p>If you receive an email, a call or a message from a person/association claiming to be Puneet Kaur Saluja seeking any personal data like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such information. If you have already revealed such information, report it immediately to an appropriate law enforcement agency.</p>

      <h2 id="usage">Usage</h2>
      <p>We use personal data to provide the services you request.</p>
      <p>To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses.</p>
      <p>We use your personal data to assist in handling and fulfilling workshop registrations; processing and verifying payments; providing workshop access and related information; enhancing customer experience; resolving disputes; troubleshooting problems; informing you about online and offline offers, products, services, workshops, and updates; customising your experience; detecting and protecting us against error, fraud and other criminal activity; enforcing our terms and conditions; conducting marketing research, analysis and surveys; and as otherwise described to you at the time of collection of information.</p>
      <p>You understand that your access to these products/services may be affected in the event permission is not provided to us.</p>

      <h2 id="sharing">Sharing</h2>
      <p>We may share your personal data internally within our group entities, our other corporate entities, and affiliates to provide you access to the services and products offered by them. These entities and affiliates may market to you as a result of such sharing unless you explicitly opt-out.</p>
      <p>We may disclose personal data to third parties such as business partners, third-party service providers, payment service providers, webinar/event platforms, communication service providers and other service providers engaged by us.</p>
      <p>These disclosures may be required for us to provide you access to our services and workshops, process payments, send workshop-related communications, provide webinar access, comply with our legal obligations, enforce our user agreement, facilitate our marketing and advertising activities, and prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our services.</p>
      <p>We may disclose personal and sensitive personal data to government agencies or other authorised law enforcement agencies if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process.</p>
      <p>We may disclose personal data to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms of Use or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.</p>

      <h2 id="security-precautions">Security Precautions</h2>
      <p>To protect your personal data from unauthorised access or disclosure, loss or misuse we adopt reasonable security practices and procedures.</p>
      <p>Once your information is in our possession or whenever you access information provided through the Platform, we adhere to our security guidelines to protect it against unauthorised access and offer the use of a secure server.</p>
      <p>However, the transmission of information is not completely secure for reasons beyond our control.</p>
      <p>By using the Platform, the users accept the security implications of data transmission over the internet and the World Wide Web which cannot always be guaranteed as completely secure, and therefore, there would always remain certain inherent risks regarding use of the Platform.</p>
      <p>Users are responsible for ensuring the protection of any login and password records for their account, where applicable.</p>

      <h2 id="data-deletion-and-retention">Data Deletion and Retention</h2>
      <p>You may write to us at the contact information provided below to assist you with requests relating to deletion or removal of your personal information.</p>
      <p>We may, in event of any pending grievance, claims, payment disputes or any other services, refuse or delay deletion of information where such retention is reasonably necessary.</p>
      <p>We retain your personal data information for a period no longer than is required for the purpose for which it was collected or as required under any applicable law.</p>
      <p>However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse or for other legitimate purposes.</p>
      <p>We may continue to retain your data in anonymised form for analytical and research purposes.</p>

      <h2 id="your-rights">Your Rights</h2>
      <p>You may access, rectify, and update your personal data directly through the functionalities provided on the Platform, where such functionalities are available.</p>
      <p>You may also contact us using the contact information provided below for assistance with accessing, correcting, updating or requesting deletion of your personal information, subject to applicable law.</p>

      <h2 id="consent">Consent</h2>
      <p>By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information on the Platform in accordance with this Privacy Policy.</p>
      <p>If you disclose to us any personal data relating to other people, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy.</p>
      <p>You, while providing your personal data over the Platform or any partner platforms or establishments, consent to us (including our other corporate entities, affiliates, technology partners, marketing channels, business partners and other third parties) to contact you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy.</p>
      <p>These communications may include workshop registration confirmations, workshop reminders, access information, customer support communications, educational resources, updates, offers, future workshops and promotional communications.</p>
      <p>You have an option to withdraw your consent that you have already provided by writing to us at the contact information provided below. Please mention &quot;Withdrawal of consent for processing personal data&quot; in the subject line of your communication.</p>
      <p>We may verify such requests before acting on your request.</p>
      <p>However, please note that your withdrawal of consent will not be retrospective and will be in accordance with the Terms of Use, this Privacy Policy, and applicable laws.</p>
      <p>In the event you withdraw consent given to us under this Privacy Policy, we reserve the right to restrict or deny the provision of our services for which we consider such information to be necessary.</p>

      <h2 id="changes-to-this-privacy-policy">Changes to this Privacy Policy</h2>
      <p>Please check our Privacy Policy periodically for changes.</p>
      <p>We may update this Privacy Policy to reflect changes to our information practices.</p>
      <p>We may alert/notify you about the significant changes to the Privacy Policy, in the manner as may be required under applicable laws.</p>

      <h2 id="grievance-officer">Grievance Officer</h2>
      <p>
        Name: Puneet Kaur Saluja<br />
        Designation: Proprietor / Authorised Representative, Contentatia<br />
        Organisation: Contentatia<br />
        Address: New Delhi, India
      </p>

      <h2 id="contact-us">Contact Us</h2>
      <p>
        Puneet Kaur Saluja<br />
        Parent Organisation: Contentatia
      </p>
      <p>
        Website: https://puneetkaursaluja.com/<br />
        Email: <a href={`mailto:${businessEmail}`}>{businessEmail}</a><br />
        Phone: {businessPhone}<br />
        Location: New Delhi, India
      </p>

    </LegalPageLayout>
  );
}
