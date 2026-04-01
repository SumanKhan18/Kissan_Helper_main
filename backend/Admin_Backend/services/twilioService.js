import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

let twilioClient = null;
let twilioModule = null;

// Lazy load Twilio (optional dependency)
const getTwilioClient = async () => {
  if (twilioClient) return twilioClient;
  
  if (!twilioModule) {
    try {
      twilioModule = await import('twilio');
    } catch (error) {
      console.warn('⚠️ Twilio package not installed. SMS OTP will be simulated. Install with: npm install twilio');
      return null;
    }
  }
  
  if (accountSid && authToken && twilioModule) {
    twilioClient = twilioModule.default(accountSid, authToken);
    return twilioClient;
  } else {
    console.warn('⚠️ Twilio credentials not found. SMS OTP will be simulated.');
    return null;
  }
};

/**
 * Sends SMS OTP via Twilio Verify service
 * @param {string} phoneNumber - Phone number (10 digits, will be formatted to +91)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const sendSMSOTP = async (phoneNumber) => {
  try {
    const client = await getTwilioClient();
    
    if (!client || !serviceSid) {
      console.log(`📱 [SIMULATED] SMS OTP would be sent to +91${phoneNumber}`);
      return { success: true };
    }

    // Format phone number (ensure +91 prefix for India)
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications
      .create({
        to: formattedPhone,
        channel: 'sms'
      });

    console.log(`✅ SMS OTP sent to ${formattedPhone}, SID: ${verification.sid}`);
    return { success: true, sid: verification.sid };

  } catch (error) {
    console.error('❌ Error sending SMS OTP:', error);
    return {
      success: false,
      error: error.message || 'Failed to send SMS OTP'
    };
  }
};

/**
 * Verifies SMS OTP via Twilio Verify service
 * @param {string} phoneNumber - Phone number
 * @param {string} otp - OTP code to verify
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const verifySMSOTP = async (phoneNumber, otp) => {
  try {
    const client = await getTwilioClient();
    
    if (!client || !serviceSid) {
      console.log(`📱 [SIMULATED] SMS OTP verification for +91${phoneNumber}: ${otp}`);
      // In simulation mode, accept any 6-digit OTP
      if (/^\d{6}$/.test(otp)) {
        return { success: true };
      }
      return { success: false, error: 'Invalid OTP format' };
    }

    // Format phone number
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks
      .create({
        to: formattedPhone,
        code: otp
      });

    if (verificationCheck.status === 'approved') {
      console.log(`✅ SMS OTP verified for ${formattedPhone}`);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid OTP' };
    }

  } catch (error) {
    console.error('❌ Error verifying SMS OTP:', error);
    return {
      success: false,
      error: error.message || 'Failed to verify SMS OTP'
    };
  }
};

