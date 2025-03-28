import crypto from 'crypto';

/**
 * Validates the Paystack webhook signature
 * 
 * @param signature The signature from the x-paystack-signature header
 * @param payload The webhook payload
 * @returns boolean indicating if the signature is valid
 */
export function validatePaystackSignature(signature: string, payload: any): boolean {
  if (!signature) return false;
  
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  
  if (!secretKey) {
    console.error('PAYSTACK_SECRET_KEY environment variable not set');
    return false;
  }
  
  // Create HMAC hash using SHA512 and the secret key
  const hash = crypto.createHmac('sha512', secretKey)
                    .update(JSON.stringify(payload))
                    .digest('hex');
  
  // Check if computed hash matches the one in the HTTP header
  return hash === signature;
}
