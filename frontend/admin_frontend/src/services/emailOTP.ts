import emailjs from '@emailjs/browser';

export const OTP_EMAILJS_CONFIG = {
  serviceId: 'service_0rqfy33',
  publicKey: 'Z74NxS_SpgwiZuzAs',
  templates: {
    registrationWithOtp: 'template_lqght2v',
  },
};

// Initialize EmailJS for OTP service
try {
  emailjs.init(OTP_EMAILJS_CONFIG.publicKey);
  console.log('OTP EmailJS initialized successfully');
} catch (error) {
  console.error('OTP EmailJS initialization failed:', error);
}

// ✅ Send OTP email
export const sendOTPEmail = async (
  email: string,
  otp: string,
  fullName: string
): Promise<boolean> => {
  try {
    console.log('Attempting to send OTP email with config:', {
      serviceId: OTP_EMAILJS_CONFIG.serviceId,
      templateId: OTP_EMAILJS_CONFIG.templates.registrationWithOtp,
      publicKey: OTP_EMAILJS_CONFIG.publicKey,
      toEmail: email,
      toName: fullName
    });

    const templateParams = {
      to_email: email,
      to_name: fullName,
      passcode: otp,
      from_name: 'KissanHelper Admin',
      message:` Your OTP for KissanHelper admin registration is: ${otp}. This OTP is valid for 10 minutes`,
    };

    console.log('Template params:', templateParams);

    const response = await emailjs.send(
      OTP_EMAILJS_CONFIG.serviceId,
      OTP_EMAILJS_CONFIG.templates.registrationWithOtp,
      templateParams,
      OTP_EMAILJS_CONFIG.publicKey
    );

    console.log('✅ OTP EmailJS response:', response);
    return response.status === 200;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    
    // Log more detailed error information
    if (error.text) {
      console.error('EmailJS error text:', error.text);
    }
    if (error.status) {
      console.error('EmailJS error status:', error.status);
    }
    
    return false;
  }
};