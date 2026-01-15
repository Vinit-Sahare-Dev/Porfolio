/**
 * Form validation utility functions
 * @module utils/validation
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether phone is valid
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if string is empty or whitespace only
 * @param {string} str - String to check
 * @returns {boolean} Whether string is empty
 */
export function isEmpty(str) {
  return !str || str.trim().length === 0;
}

/**
 * Validate minimum length
 * @param {string} str - String to validate
 * @param {number} minLength - Minimum required length
 * @returns {boolean} Whether string meets minimum length
 */
export function hasMinLength(str, minLength) {
  return str && str.trim().length >= minLength;
}

/**
 * Validate maximum length
 * @param {string} str - String to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} Whether string is within maximum length
 */
export function hasMaxLength(str, maxLength) {
  return !str || str.length <= maxLength;
}

/**
 * Validate contact form data
 * @param {Object} data - Form data object
 * @returns {Object} Validation result with errors
 */
export function validateContactForm(data) {
  const errors = {};

  if (isEmpty(data.name)) {
    errors.name = 'Name is required';
  } else if (!hasMinLength(data.name, 2)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (isEmpty(data.message)) {
    errors.message = 'Message is required';
  } else if (!hasMinLength(data.message, 10)) {
    errors.message = 'Message must be at least 10 characters';
  } else if (!hasMaxLength(data.message, 1000)) {
    errors.message = 'Message must be less than 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Sanitize input string
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeInput(str) {
  if (!str) return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Validate GitHub username format
 * @param {string} username - GitHub username
 * @returns {boolean} Whether username is valid
 */
export function isValidGitHubUsername(username) {
  const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return usernameRegex.test(username);
}

/**
 * Validate LinkedIn URL
 * @param {string} url - LinkedIn URL
 * @returns {boolean} Whether URL is valid LinkedIn profile
 */
export function isValidLinkedInUrl(url) {
  const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
  return linkedInRegex.test(url);
}

/**
 * Password strength checker
 * @param {string} password - Password to check
 * @returns {Object} Strength result
 */
export function checkPasswordStrength(password) {
  const result = {
    score: 0,
    feedback: []
  };

  if (password.length >= 8) result.score++;
  else result.feedback.push('At least 8 characters');

  if (/[a-z]/.test(password)) result.score++;
  else result.feedback.push('Include lowercase letter');

  if (/[A-Z]/.test(password)) result.score++;
  else result.feedback.push('Include uppercase letter');

  if (/[0-9]/.test(password)) result.score++;
  else result.feedback.push('Include number');

  if (/[^a-zA-Z0-9]/.test(password)) result.score++;
  else result.feedback.push('Include special character');

  result.strength = 
    result.score <= 2 ? 'weak' :
    result.score <= 3 ? 'medium' :
    result.score <= 4 ? 'strong' : 'very strong';

  return result;
}
