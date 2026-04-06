/**
 * Date Utilities
 * 
 * Common date/time operations and formatting
 */

/**
 * Parse date string to Date object
 * @param {string} dateString - Date string
 * @returns {Date} Date object
 */
export const parseDate = (dateString) => {
  return new Date(dateString);
};

/**
 * Get today's date
 * @returns {Date} Today's date
 */
export const getToday = () => {
  return new Date();
};

/**
 * Get tomorrow's date
 * @returns {Date} Tomorrow's date
 */
export const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

/**
 * Get yesterday's date
 * @returns {Date} Yesterday's date
 */
export const getYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

/**
 * Get start of day (00:00:00)
 * @param {Date} date - Date object
 * @returns {Date} Date at start of day
 */
export const startOfDay = (date = new Date()) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Get end of day (23:59:59)
 * @param {Date} date - Date object
 * @returns {Date} Date at end of day
 */
export const endOfDay = (date = new Date()) => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Add days to date
 * @param {Date} date - Base date
 * @param {number} days - Days to add (can be negative)
 * @returns {Date} New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to date
 * @param {Date} date - Base date
 * @param {number} months - Months to add (can be negative)
 * @returns {Date} New date
 */
export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Add years to date
 * @param {Date} date - Base date
 * @param {number} years - Years to add (can be negative)
 * @returns {Date} New date
 */
export const addYears = (date, years) => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * Get difference between two dates in days
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Difference in days
 */
export const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1 - date2) / oneDay));
};

/**
 * Check if date is today
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is in the past
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPast = (date) => {
  return date < new Date();
};

/**
 * Check if date is in the future
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in the future
 */
export const isFuture = (date) => {
  return date > new Date();
};

/**
 * Check if date is valid
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is valid
 */
export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

/**
 * Get days in month
 * @param {number} month - Month (0-11)
 * @param {number} year - Year
 * @returns {number} Number of days
 */
export const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get week number
 * @param {Date} date - Date
 * @returns {number} Week number
 */
export const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

/**
 * Get day name
 * @param {number} dayIndex - Day index (0-6, 0=Sunday)
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Day name
 */
export const getDayName = (dayIndex, locale = 'en-US') => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
};

/**
 * Get month name
 * @param {number} monthIndex - Month index (0-11)
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Month name
 */
export const getMonthName = (monthIndex, locale = 'en-US') => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
};

/**
 * Check if date is leap year
 * @param {number} year - Year
 * @returns {boolean} True if leap year
 */
export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

/**
 * Get age from birth date
 * @param {Date} birthDate - Birth date
 * @returns {number} Age in years
 */
export const getAge = (birthDate) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Format ISO date string
 * @param {Date} date - Date object
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
export const toISODateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format time string
 * @param {Date} date - Date object
 * @param {boolean} includeSeconds - Include seconds (default: false)
 * @returns {string} Time string (HH:mm or HH:mm:ss)
 */
export const toTimeString = (date, includeSeconds = false) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  if (includeSeconds) {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}`;
};
