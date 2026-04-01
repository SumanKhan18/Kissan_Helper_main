// src/utils/loadRazorpay.js
export function loadRazorpay(src = "https://checkout.razorpay.com/v1/checkout.js") {
  return new Promise((resolve) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
