

// //bolt


// import emailjs from '@emailjs/browser';

// export const EMAILJS_CONFIG = {
//   serviceId: 'service_0rqfy33',
//   publicKey: 'Z74NxS_SpgwiZuzAs',
//   templates: {
//     registrationWithOtp: 'template_lqght2v',
//   },
// };

// // Initialize EmailJS with public key
// try {
//   emailjs.init(EMAILJS_CONFIG.publicKey);
//   console.log('EmailJS initialized successfully');
// } catch (error) {
//   console.error('EmailJS initialization failed:', error);
// }

// export const sendOTPEmail = async (email: string, otp: string, fullName: string): Promise<boolean> => {
//   try {
//     console.log('Attempting to send OTP email to:', email);
//     console.log('Using template:', EMAILJS_CONFIG.templates.registrationWithOtp);
    
//     const templateParams = {
//       // Most common EmailJS template parameters
//       to_email: email,
//       to_name: fullName,
//       user_email: email,
//       user_name: fullName,
//       email: email,
//       name: fullName,
//       passcode: otp,
//       from_name: 'KissanHelper Admin',
//       reply_to: email,
//       message: `Your OTP for KissanHelper admin registration is: ${otp}. This OTP is valid for 10 minutes.`,
//       subject: 'KissanHelper Admin Registration - OTP Verification',
//       // Additional common parameters
//       recipient_email: email,
//       recipient_name: fullName,
//       sender_name: 'KissanHelper Admin',
//       email_subject: 'KissanHelper Admin Registration - OTP Verification',
//     };
    

//     console.log('Template params:', templateParams);

//     const response = await emailjs.send(
//       EMAILJS_CONFIG.serviceId,
//       EMAILJS_CONFIG.templates.registrationWithOtp,
//       templateParams,
//       {
//         publicKey: EMAILJS_CONFIG.publicKey,
//       }
//     );

//     console.log('EmailJS response:', response);
//     return response.status === 200;
//   } catch (error) {
//     console.error('Error sending OTP email:', error);
//     console.error('Error details:', {
//       message: error.message,
//       status: error.status,
//       text: error.text
//     });
    
//     // More specific error handling
//     if (error.status === 422) {
//       console.error('Template parameter mismatch. Check your EmailJS template variables.');
//     } else if (error.status === 400) {
//       console.error('Bad request. Check service ID, template ID, and public key.');
//     } else if (error.status === 403) {
//       console.error('Forbidden. Check your EmailJS account permissions.');
//     }
    
//     return false;
//   }
// };










import emailjs from '@emailjs/browser';

/**
 * Centralized configuration for multiple EmailJS services and templates.
 */
export const EMAILJS_CONFIG = {
  otp: {
    serviceId: 'service_0rqfy33',
    publicKey: 'Z74NxS_SpgwiZuzAs',
    templateId: 'template_lqght2v',
  },
  applicationSuccess: {
    serviceId: 'service_awzlkjm',
    publicKey: 'xKFGvwbZC-Qurq-ns',
    templateId: 'template_kul6jan',
  },
};

// Optional: Initialize EmailJS with one default public key
try {
  emailjs.init(EMAILJS_CONFIG.otp.publicKey);
  console.log('✅ EmailJS initialized successfully');
} catch (error) {
  console.error('❌ EmailJS initialization failed:', error);
}

/**
 * Sends an OTP email to the user.
 */
export const sendOTPEmail = async (email, otp, fullName) => {
  const config = EMAILJS_CONFIG.otp;

  const templateParams = {
    to_email: email,
    to_name: fullName,
    user_email: email,
    user_name: fullName,
    email: email,
    name: fullName,
    passcode: otp,
    from_name: 'KissanHelper Admin',
    reply_to: email,
    message: `Your OTP for KissanHelper admin registration is: ${otp}. This OTP is valid for 10 minutes.`,
    subject: 'KissanHelper Admin Registration - OTP Verification',
    recipient_email: email,
    recipient_name: fullName,
    sender_name: 'KissanHelper Admin',
    email_subject: 'KissanHelper Admin Registration - OTP Verification',
  };

  try {
    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      { publicKey: config.publicKey }
    );

    console.log('✅ OTP email sent:', response);
    return response.status === 200;
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    return false;
  }
};

/**
 * Sends an application submission success email.
 */
export const sendApplicationSuccessEmail = async (
  email: string,
  fullName: string,
  address: string,
  phone: string,
  aadhaar: string,
  aadhaarImageUrl: string,
  personalImageUrl: string
) => {
  if (!email || !email.trim()) {
    console.error('❌ sendApplicationSuccessEmail failed: email is empty or invalid');
    return false;
  }

  const config = EMAILJS_CONFIG.applicationSuccess;

   const templateParams = {
    to_name: fullName,
    to_email: email,
    to_userAddress: address,
    to_phone: phone,
    to_aadhaarNumber: aadhaar,
    aadhaarImage_url: aadhaarImageUrl,
    personalImage_url: personalImageUrl,
  };

  try {
    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      { publicKey: config.publicKey }
    );

    console.log('✅ Application success email sent:', response);
    return response.status === 200;
  } catch (error) {
    console.error('❌ Error sending application success email:', error);
    return false;
  }
};
