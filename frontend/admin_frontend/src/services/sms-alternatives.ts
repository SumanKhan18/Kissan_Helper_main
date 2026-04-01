// Alternative SMS Service Implementations
// Choose one based on your requirements and budget

export interface SMSProvider {
  sendOTP: (phoneNumber: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<{ success: boolean; error?: string }>;
}

// 1. TextLocal (Popular in India, good rates)
export class TextLocalSMS implements SMSProvider {
  private apiKey: string;
  private sender: string;

  constructor(apiKey: string, sender: string = 'KISSAN') {
    this.apiKey = apiKey;
    this.sender = sender;
  }

  async sendOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('https://api.textlocal.in/send/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          apikey: this.apiKey,
          numbers: phoneNumber,
          message: `Your KissanHelper OTP is: ${otp}. Valid for 10 minutes. Do not share with anyone.`,
          sender: this.sender
        })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        return { success: true };
      } else {
        return { success: false, error: result.errors?.[0]?.message || 'Failed to send SMS' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Network error' };
    }
  }

  async verifyOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
    // TextLocal doesn't have built-in OTP verification, so you'd need to implement your own storage
    // This would typically be handled by your backend
    return { success: true }; // Implement your verification logic
  }
}

// 2. MSG91 (Indian SMS provider with OTP services)
export class MSG91SMS implements SMSProvider {
  private authKey: string;
  private templateId: string;

  constructor(authKey: string, templateId: string) {
    this.authKey = authKey;
    this.templateId = templateId;
  }

  async sendOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`https://api.msg91.com/api/v5/otp?template_id=${this.templateId}&mobile=${phoneNumber}&authkey=${this.authKey}&otp=${otp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();
      
      if (result.type === 'success') {
        return { success: true };
      } else {
        return { success: false, error: result.message || 'Failed to send OTP' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Network error' };
    }
  }

  async verifyOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`https://api.msg91.com/api/v5/otp/verify?mobile=${phoneNumber}&otp=${otp}&authkey=${this.authKey}`, {
        method: 'POST'
      });

      const result = await response.json();
      
      if (result.type === 'success') {
        return { success: true };
      } else {
        return { success: false, error: result.message || 'Invalid OTP' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Verification failed' };
    }
  }
}

// 3. Firebase Phone Authentication (Google's solution)
export class FirebasePhoneAuth implements SMSProvider {
  // This would require Firebase SDK setup
  async sendOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Firebase Phone Auth implementation
      // import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
      // const auth = getAuth();
      // const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async verifyOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      // confirmationResult.confirm(otp);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid OTP' };
    }
  }
}

// 4. AWS SNS (Amazon's SMS service)
export class AWSSNS implements SMSProvider {
  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;

  constructor(accessKeyId: string, secretAccessKey: string, region: string = 'ap-south-1') {
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.region = region;
  }

  async sendOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
    try {
      // AWS SNS implementation would go here
      // This requires AWS SDK and proper authentication
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async verifyOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
    // AWS SNS doesn't have built-in OTP verification
    // You'd need to implement your own storage and verification
    return { success: true };
  }
}

// Usage example:
/*
// In your environment variables:
// TEXTLOCAL_API_KEY=your_textlocal_api_key
// MSG91_AUTH_KEY=your_msg91_auth_key
// MSG91_TEMPLATE_ID=your_template_id

// In your code:
const smsProvider = new TextLocalSMS(process.env.TEXTLOCAL_API_KEY);
// or
const smsProvider = new MSG91SMS(process.env.MSG91_AUTH_KEY, process.env.MSG91_TEMPLATE_ID);

// Send OTP
const result = await smsProvider.sendOTP('+919876543210', '123456');

// Verify OTP
const verification = await smsProvider.verifyOTP('+919876543210', '123456');
*/

// Cost comparison (approximate, as of 2024):
// TextLocal: ₹0.15-0.25 per SMS
// MSG91: ₹0.15-0.20 per SMS  
// Twilio: ₹0.50-0.70 per SMS
// AWS SNS: ₹0.60-0.80 per SMS
// Firebase: Free tier available, then pay-per-use