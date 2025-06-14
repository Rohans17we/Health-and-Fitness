/**
 * Utility functions for unit conversions in the health and fitness application
 */

/**
 * Convert milliliters to liters
 * @param {number} ml - Amount in milliliters
 * @returns {number} - Amount in liters
 */
export const mlToLiters = (ml) => {
  return ml / 1000;
};

/**
 * Convert liters to milliliters
 * @param {number} liters - Amount in liters
 * @returns {number} - Amount in milliliters
 */
export const litersToMl = (liters) => {
  return liters * 1000;
};

/**
 * Convert calories to kilocalories
 * @param {number} calories - Amount in calories
 * @returns {number} - Amount in kilocalories
 */
export const calToKcal = (calories) => {
  return calories / 1000;
};

/**
 * Convert kilocalories to calories
 * @param {number} kcal - Amount in kilocalories
 * @returns {number} - Amount in calories
 */
export const kcalToCal = (kcal) => {
  return kcal * 1000;
};

/**
 * Ensure calories are in kilocalories (kcal) format
 * Backend stores calories in Cal, but UI displays in kcal
 * This function detects the likely unit and converts to kcal if needed
 * 
 * @param {number} calories - Calorie value (could be in Cal or kcal)
 * @param {boolean} forceConversion - If true, always convert assuming input is in Cal
 * @returns {number} - Value in kcal
 */
export const ensureKcal = (calories, forceConversion = false) => {
  // If calories is likely in Cal (very large number), convert to kCal
  // Typically, daily calorie intakes are in the hundreds to thousands range when expressed in kcal
  if (forceConversion || calories > 10000) {
    return calToKcal(calories);
  }
  return calories;
};

/**
 * Format number with locale settings and specified number of decimal places
 * @param {number} value - The number to format
 * @param {number} minFractionDigits - Minimum fraction digits
 * @param {number} maxFractionDigits - Maximum fraction digits
 * @returns {string} - Formatted number as string
 */
export const formatNumber = (value, minFractionDigits = 0, maxFractionDigits = 0) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits
  });
};
