import emailjs from '@emailjs/browser';

export const EMAILJS_CONFIG = {
  serviceId: 'service_awzlkjm',
  publicKey: 'xKFGvwbZC-Qurq-ns',
  templates: {
    applicationSuccess: 'template_kul6jan'        // Application success email (using same template ID as OTP for now)
  }
};


// ✅ 2. Final Application Submission Email
export const sendApplicationSuccessEmail = async (
  email: string,
  fullName: string,
  address: string,
  phone: string,
  aadhaar: string
): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: email,
      to_name: fullName,
      user_email: email,
      user_name: fullName,
      email: email,
      name: fullName,
      address: address,
      phone: phone,
      aadhaar: aadhaar,
      from_name: 'KissanHelper Admin',
      reply_to: email,
      subject: 'KissanHelper Admin Registration - Application Submitted',
      message: `Hi ${fullName}, your application has been successfully submitted and is under review. Our team will contact you shortly.`,
      recipient_email: email,
      recipient_name: fullName,
      sender_name: 'KissanHelper Admin',
      email_subject: 'KissanHelper Admin Registration - Application Submitted',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templates.applicationSuccess,
      templateParams,
      {
        publicKey: EMAILJS_CONFIG.publicKey,
      }
    );

    console.log('✅ Final application email sent:', response);
    return response.status === 200;
  } catch (error) {
    console.error('❌ Final application email failed:', error);
    return false;
  }
};
