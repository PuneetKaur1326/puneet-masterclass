import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Button,
  Img
} from '@react-email/components';

interface ConfirmationEmailProps {
  name: string;
  meetLink: string;
}

export const ConfirmationEmail = ({
  name,
  meetLink,
}: ConfirmationEmailProps) => {
  const previewText = `Registration Confirmed - The Psychology Behind Writing`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>You're In, {name.split(' ')[0]}! 🎉</Heading>
          
          <Text style={text}>
            Your registration for <strong>"The Psychology Behind Writing"</strong> Masterclass is confirmed. I'm thrilled to have you join us.
          </Text>

          <Section style={detailsSection}>
            <Text style={detailText}><strong>Date:</strong> Sunday, Upcoming</Text>
            <Text style={detailText}><strong>Time:</strong> 11:00 AM IST</Text>
            <Text style={detailText}><strong>Duration:</strong> 90 Minutes</Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={meetLink}>
              Join Google Meet
            </Button>
          </Section>

          <Text style={text}>
            Keep this link handy. I'll also send you a quick reminder 1 hour before we begin.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            See you inside,<br />
            Puneet Kaur Saluja
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmationEmail;

const main = {
  backgroundColor: '#FFFCF7',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '580px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #eaeaea',
  marginTop: '40px',
};

const h1 = {
  color: '#1F1F1F',
  fontSize: '24px',
  fontWeight: '700',
  lineHeight: '1.4',
  padding: '0',
  margin: '0 0 20px',
};

const text = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 20px',
};

const detailsSection = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px',
};

const detailText = {
  margin: '0 0 10px',
  color: '#333',
  fontSize: '16px',
};

const btnContainer = {
  textAlign: 'center' as const,
  marginBottom: '20px',
};

const button = {
  backgroundColor: '#F4B400',
  borderRadius: '6px',
  color: '#1F1F1F',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 24px',
  fontWeight: 'bold',
};

const hr = {
  borderColor: '#eaeaea',
  margin: '30px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '1.6',
};
