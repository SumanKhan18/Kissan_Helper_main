import { RAZORPAY_CONFIG } from '../config/razorpay';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const processPayment = (
  email: string,
  phone: string,
  name: string
): Promise<RazorpayResponse> => {
  return new Promise((resolve, reject) => {
    const options = {
      ...RAZORPAY_CONFIG,
      prefill: {
        email,
        contact: phone,
        name
      },
      handler: (response: any) => {
        resolve(response);
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled'));
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};