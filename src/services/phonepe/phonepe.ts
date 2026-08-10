import crypto from 'crypto';

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || '';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || '';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const ENVIRONMENT = process.env.PHONEPE_ENVIRONMENT || 'UAT';

const BASE_URL = ENVIRONMENT === 'PRODUCTION'
  ? 'https://api.phonepe.com/apis/hermes'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

export interface PhonePePaymentRequest {
  merchantTransactionId: string;
  merchantUserId: string;
  amount: number; // in paise
  redirectUrl: string;
  redirectMode: 'REDIRECT' | 'POST';
  callbackUrl: string;
  mobileNumber?: string;
  paymentInstrument: {
    type: 'PAY_PAGE';
  };
}

export class PhonePeService {
  /**
   * Generates the X-VERIFY checksum for a given payload and endpoint
   */
  static generateChecksum(base64Payload: string, endpoint: string): string {
    const stringToHash = base64Payload + endpoint + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    return `${sha256}###${SALT_INDEX}`;
  }

  /**
   * Creates a payment order via PhonePe API
   */
  static async createPayment(payload: PhonePePaymentRequest) {
    const endpoint = '/pg/v1/pay';
    
    // Add merchant ID if not present
    const fullPayload = {
      ...payload,
      merchantId: MERCHANT_ID,
    };

    const base64Payload = Buffer.from(JSON.stringify(fullPayload)).toString('base64');
    const checksum = this.generateChecksum(base64Payload, endpoint);

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': MERCHANT_ID,
        },
        body: JSON.stringify({ request: base64Payload }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('PhonePe Create Payment Error:', error);
      throw new Error('Failed to initiate payment with PhonePe');
    }
  }

  /**
   * Verifies the callback signature
   */
  static verifyCallback(base64Response: string, xVerifyHeader: string): boolean {
    const generatedChecksum = crypto.createHash('sha256').update(base64Response + SALT_KEY).digest('hex') + '###' + SALT_INDEX;
    return generatedChecksum === xVerifyHeader;
  }

  /**
   * Checks payment status
   */
  static async checkStatus(merchantTransactionId: string) {
    const endpoint = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
    const checksum = this.generateChecksum('', endpoint);

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': MERCHANT_ID,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('PhonePe Check Status Error:', error);
      throw new Error('Failed to check payment status with PhonePe');
    }
  }
}
