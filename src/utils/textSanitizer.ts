
/**
 * Sanitizes text input by handling special characters and preventing injection
 */
export const sanitizeTextInput = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Replace problematic characters while preserving readability
  return input
    .replace(/["""]/g, '"') // Normalize various quote types to standard double quotes
    .replace(/[''']/g, "'") // Normalize various apostrophe types to standard single quotes
    .replace(/[``]/g, "'") // Replace backticks with single quotes
    .replace(/;+/g, ',') // Replace semicolons with commas for safety
    .replace(/\\/g, '') // Remove backslashes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim(); // Remove leading/trailing whitespace
};

/**
 * Validates that text input is safe and not empty
 */
export const validateTextInput = (input: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeTextInput(input);
  
  if (!sanitized) {
    return { isValid: false, error: 'Please provide an answer' };
  }
  
  if (sanitized.length < 5) {
    return { isValid: false, error: 'Please provide a more detailed answer (at least 5 characters)' };
  }
  
  if (sanitized.length > 2000) {
    return { isValid: false, error: 'Answer is too long (maximum 2000 characters)' };
  }
  
  return { isValid: true };
};

/**
 * Prepares text for safe database storage
 */
export const prepareForDatabase = (input: string): string => {
  const sanitized = sanitizeTextInput(input);
  // Additional escaping for database safety
  return sanitized.replace(/'/g, "''"); // Escape single quotes for SQL
};
