const twilio = require('twilio');
require('dotenv').config({ path: '../.env' });


class TwilioService {
  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
    
    if (!this.accountSid || !this.authToken || !this.serviceSid) {
      console.error('❌ Missing Twilio configuration in environment variables');
      throw new Error('Twilio configuration is incomplete');
    }
    
    this.client = twilio(this.accountSid, this.authToken);
    console.log('✅ Twilio service initialized successfully');
  }

  async sendVerificationCode(phoneNumber) {
    try {
      console.log(`📤 Sending verification code to: ${phoneNumber}`);
      
      const verification = await this.client.verify.v2
        .services(this.serviceSid)
        .verifications
        .create({
          to: phoneNumber,
          channel: 'sms'
        });

      console.log(`✅ Verification sent successfully. SID: ${verification.sid}, Status: ${verification.status}`);
      
      return {
        success: true,
        sid: verification.sid,
        status: verification.status,
        to: verification.to,
        channel: verification.channel
      };
    } catch (error) {
      console.error('❌ Twilio Send Error:', error);
      
      // Handle specific Twilio errors
      let errorMessage = 'Failed to send verification code';
      
      if (error.code === 20003) {
        errorMessage = 'Authentication failed - check Twilio credentials';
      } else if (error.code === 20404) {
        errorMessage = 'Twilio service not found - check Service SID';
      } else if (error.code === 21211) {
        errorMessage = 'Invalid phone number format';
      } else if (error.code === 21608) {
        errorMessage = 'Phone number is not verified for trial account';
      } else if (error.code === 21610) {
        errorMessage = 'Phone number is blocked or invalid';
      } else if (error.code === 60200) {
        errorMessage = 'International SMS not allowed on trial account';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage,
        code: error.code,
        moreInfo: error.moreInfo
      };
    }
  }

  async verifyCode(phoneNumber, code) {
    try {
      console.log(`🔍 Verifying code for: ${phoneNumber}`);
      
      const verificationCheck = await this.client.verify.v2
        .services(this.serviceSid)
        .verificationChecks
        .create({
          to: phoneNumber,
          code: code
        });

      console.log(`✅ Verification check completed. Status: ${verificationCheck.status}`);
      
      const isValid = verificationCheck.status === 'approved';
      
      return {
        success: isValid,
        status: verificationCheck.status,
        to: verificationCheck.to,
        channel: verificationCheck.channel,
        ...(isValid ? {} : { error: 'Invalid or expired verification code' })
      };
    } catch (error) {
      console.error('❌ Twilio Verify Error:', error);
      
      // Handle specific Twilio errors
      let errorMessage = 'Failed to verify code';
      
      if (error.code === 20003) {
        errorMessage = 'Authentication failed - check Twilio credentials';
      } else if (error.code === 20404) {
        errorMessage = 'Verification not found or expired';
      } else if (error.code === 60202) {
        errorMessage = 'Maximum verification attempts reached';
      } else if (error.code === 60203) {
        errorMessage = 'Maximum verification code send attempts reached';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage,
        code: error.code,
        moreInfo: error.moreInfo
      };
    }
  }

  // Get verification status
  async getVerificationStatus(phoneNumber) {
    try {
      const verifications = await this.client.verify.v2
        .services(this.serviceSid)
        .verifications
        .list({ to: phoneNumber, limit: 1 });

      if (verifications.length > 0) {
        const verification = verifications[0];
        return {
          success: true,
          status: verification.status,
          to: verification.to,
          channel: verification.channel,
          dateCreated: verification.dateCreated,
          dateUpdated: verification.dateUpdated
        };
      } else {
        return {
          success: false,
          error: 'No verification found for this phone number'
        };
      }
    } catch (error) {
      console.error('❌ Get Verification Status Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get verification status'
      };
    }
  }
}

module.exports = new TwilioService();