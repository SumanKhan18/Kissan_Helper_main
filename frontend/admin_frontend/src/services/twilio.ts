// // Twilio SMS Service Configuration
// export const TWILIO_CONFIG = {
// const accountSid = process.env.ACCOUNT_SID;
// const authToken = process.env.AUTH_TOKEN;
// const serviceSid = process.env.SERVICE_SID;
//   // Note: Auth token should be stored securely in environment variables
//   // For client-side apps, you'll need a backend endpoint to handle Twilio calls
// };

// // Since Twilio requires server-side authentication, we'll create a mock service
// // that simulates the Twilio API call structure for now
// export const sendSMSOTP = async (phoneNumber: string): Promise<{ success: boolean; otp?: string; error?: string }> => {
//   try {
//     console.log('Sending SMS OTP to:', phoneNumber);
//     console.log('Using Twilio Service SID:', TWILIO_CONFIG.serviceSid);
    
//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
//     // Format phone number for Twilio (ensure it starts with +91 for India)
//     const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    
//     // In a real implementation, you would make this call from your backend:
//     /*
//     const response = await fetch('https://verify.twilio.com/v2/Services/VAe73bd2a9007d064bd53e70ae63e6acba/Verifications', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Basic ${btoa(`${TWILIO_CONFIG.accountSid}:${authToken}`)}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         'To': formattedPhone,
//         'Channel': 'sms'
//       })
//     });
//     */
    
//     // For demo purposes, we'll simulate the SMS sending
//     console.log(`SMS OTP would be sent to ${formattedPhone} via Twilio`);
//     console.log(`Demo OTP: ${otp}`);
    
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     return {
//       success: true,
//       otp: otp
//     };
    
//   } catch (error) {
//     console.error('Error sending SMS OTP:', error);
//     return {
//       success: false,
//       error: error.message || 'Failed to send SMS OTP'
//     };
//   }
// };

// export const verifySMSOTP = async (phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> => {
//   try {
//     console.log('Verifying SMS OTP for:', phoneNumber);
//     console.log('OTP:', otp);
    
//     // Format phone number
//     const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    
//     // In a real implementation, you would verify with Twilio:
//     /*
//     const response = await fetch(`https://verify.twilio.com/v2/Services/VAe73bd2a9007d064bd53e70ae63e6acba/VerificationCheck`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Basic ${btoa(`${TWILIO_CONFIG.accountSid}:${authToken}`)}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         'To': formattedPhone,
//         'Code': otp
//       })
//     });
//     */
    
//     // For demo, we'll return success (in real app, this would verify against Twilio)
//     return {
//       success: true
//     };
    
//   } catch (error) {
//     console.error('Error verifying SMS OTP:', error);
//     return {
//       success: false,
//       error: error.message || 'Failed to verify SMS OTP'
//     };
//   }
// };

// // Backend endpoint example (you would need to implement this on your server)
// export const BACKEND_ENDPOINTS = {
//   sendSMS: '/api/send-sms-otp',
//   verifySMS: '/api/verify-sms-otp'
// };

// // Example of how to call your backend endpoint
// export const sendSMSViaBackend = async (phoneNumber: string): Promise<{ success: boolean; error?: string }> => {
//   try {
//     const response = await fetch(BACKEND_ENDPOINTS.sendSMS, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         phoneNumber: phoneNumber,
//         serviceSid: TWILIO_CONFIG.serviceSid
//       })
//     });
    
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     return {
//       success: false,
//       error: error.message || 'Failed to send SMS'
//     };
//   }
// };


// Twilio SMS Service Configuration


// bolt code new

// Backend API Configuration


const API_BASE_URL ='http://localhost:3001';

export const sendSMSOTP = async (phoneNumber: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('📱 Sending SMS OTP to:', phoneNumber);

    const response = await fetch(`${API_BASE_URL}/api/send-sms-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ SMS OTP sent successfully');
      return {
        success: true
      };
    } else {
      console.error('❌ Failed to send SMS OTP:', result.error);
      return {
        success: false,
        error: result.error || 'Failed to send SMS OTP'
      };
    }
    
  } catch (error) {
    console.error('❌ Network error sending SMS OTP:', error);
    return {
      success: false,
      error: 'Network error. Please check if the backend server is running.'
    };
  }
};

export const verifySMSOTP = async (phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('🔍 Verifying SMS OTP for:', phoneNumber);

    const response = await fetch(`${API_BASE_URL}/api/verify-sms-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        otp: otp
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ SMS OTP verified successfully');
      return {
        success: true
      };
    } else {
      console.error('❌ SMS OTP verification failed:', result.error);
      return {
        success: false,
        error: result.error || 'Invalid OTP'
      };
    }
    
  } catch (error) {
    console.error('❌ Network error verifying SMS OTP:', error);
    return {
      success: false,
      error: 'Network error. Please check if the backend server is running.'
    };
  }
};
