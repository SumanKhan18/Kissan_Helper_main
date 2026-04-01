// import emailjs from '@emailjs/browser';

// const sendRegistrationEmai = async (formData) => {
//   try {
//     const templateParams = {
//       name: formData.full_name,
//       email: formData.email_id,
//       phone: formData.phone_number,
//       userAddress: formData.address,
//       aadhaarNumber: formData.aadhaar_number,
//       aadhaarImage: formData.aadhaar_image_url,
//       personalImage: formData.photo_url
//     };

//     await emailjs.send(
//       'service_awzlkjm',        // service ID
//       'template_kul6jan',       // template ID
//       templateParams,
//       'xKFGvwbZC-Qurq-ns'       // public key
//     );

//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Failed to send email:', error);
//   }
// };


// services/email.ts
import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_awzlkjm';
const TEMPLATE_ID = 'template_kul6jan';
const PUBLIC_KEY = 'xKFGvwbZC-Qurq-ns'; // aka user ID

export const sendRegistrationEmail = async (
  email: string,
  fullName: string,
  registrationId: string
): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: email,
      to_name: fullName,
      registration_id: registrationId,
    };

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log('Email sent:', result.status, result.text);
    return true;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
};
