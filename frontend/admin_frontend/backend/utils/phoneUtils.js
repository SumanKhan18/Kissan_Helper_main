const validator = require('validator');

/**
 * Validates if a phone number is in correct format
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Check if it's a valid Indian mobile number (10 digits starting with 6-9)
  const indianMobileRegex = /^[6-9]\d{9}$/;
  
  // Check if it's already in international format (+91 followed by 10 digits)
  const internationalIndianRegex = /^\+91[6-9]\d{9}$/;
  
  // Check if it's 13 digits starting with 91 (without +)
  const withoutPlusRegex = /^91[6-9]\d{9}$/;
  
  return (
    indianMobileRegex.test(digitsOnly) || 
    internationalIndianRegex.test(phoneNumber) ||
    withoutPlusRegex.test(digitsOnly)
  );
}

/**
 * Formats phone number to international format (+91XXXXXXXXXX)
 * @param {string} phoneNumber - Phone number to format
 * @returns {string} - Formatted phone number
 */
function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    throw new Error('Phone number is required');
  }

  // Remove all non-digit characters except +
  let cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // If it already starts with +91, return as is
  if (cleaned.startsWith('+91')) {
    return cleaned;
  }
  
  // If it starts with 91, add +
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return '+' + cleaned;
  }
  
  // If it's 10 digits starting with 6-9, add +91
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return '+91' + cleaned;
  }
  
  // If none of the above, throw error
  throw new Error('Invalid phone number format');
}

/**
 * Sanitizes phone number for display (masks middle digits)
 * @param {string} phoneNumber - Phone number to sanitize
 * @returns {string} - Sanitized phone number
 */
function sanitizePhoneForDisplay(phoneNumber) {
  const formatted = formatPhoneNumber(phoneNumber);
  // Show +91XXXX***XXX format
  if (formatted.length >= 13) {
    return formatted.substring(0, 7) + '***' + formatted.substring(10);
  }
  return formatted;
}

/**
 * Validates and formats phone number in one step
 * @param {string} phoneNumber - Phone number to validate and format
 * @returns {object} - Result object with success, formatted number, or error
 */
function validateAndFormatPhone(phoneNumber) {
  try {
    if (!validatePhoneNumber(phoneNumber)) {
      return {
        success: false,
        error: 'Invalid phone number format. Please enter a valid Indian mobile number.'
      };
    }
    
    const formatted = formatPhoneNumber(phoneNumber);
    
    return {
      success: true,
      formatted: formatted,
      display: sanitizePhoneForDisplay(phoneNumber)
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  validatePhoneNumber,
  formatPhoneNumber,
  sanitizePhoneForDisplay,
  validateAndFormatPhone
};