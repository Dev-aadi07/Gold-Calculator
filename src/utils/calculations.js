/**
 * calculations.js
 * ----------------
 * All gold price calculation logic lives here.
 * Keeping this separate from UI means you can test it independently,
 * reuse it in a mobile app, or swap formulas without touching components.
 */

/**
 * Calculate gold pricing breakdown.
 *
 * @param {number} rate        - Gold rate in ₹ per gram
 * @param {number} weight      - Weight in grams
 * @param {number} makingValue - Making charge value (% or ₹/g)
 * @param {string} makingType  - "percentage" | "fixed"
 * @returns {object} Breakdown of goldValue, makingCharge, totalPrice, makingPerGram, effectiveRatePerGram
 */
export function calculateGoldPrice(rate, weight, makingValue, makingType) {
  // Guard: return zeroes if inputs are invalid / empty
  if (!rate || !weight || rate <= 0 || weight <= 0) {
    return {
      goldValue: 0,
      makingCharge: 0,
      totalPrice: 0,
      makingPerGram: 0,
      effectiveRatePerGram: 0,
    };
  }

  const r = parseFloat(rate);
  const w = parseFloat(weight);
  const mv = parseFloat(makingValue) || 0;

  // Gold value is simply rate × weight — no making charge here
  const goldValue = r * w;

  let makingPerGram = 0;

  if (makingType === "percentage") {
    // e.g. 18% making charge → makingPerGram = rate × 18 / 100
    makingPerGram = (r * mv) / 100;
  } else {
    // Fixed: makingPerGram is directly the user-entered value
    makingPerGram = mv;
  }

  const makingCharge = makingPerGram * w;
  const totalPrice = goldValue + makingCharge;

  // This is the effective total cost per gram (gold + making)
  const effectiveRatePerGram = w > 0 ? totalPrice / w : 0;

  return {
    goldValue: round2(goldValue),
    makingCharge: round2(makingCharge),
    totalPrice: round2(totalPrice),
    makingPerGram: round2(makingPerGram),
    effectiveRatePerGram: round2(effectiveRatePerGram),
  };
}

/** Helper: round to 2 decimal places */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Format a number as Indian currency (₹ with commas).
 * e.g. 12088.51 → "₹12,088.51"
 */
export function formatINR(amount) {
  if (isNaN(amount)) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Generate WhatsApp-ready plain-text summary of the calculation.
 */
export function buildCopyText({ rate, weight, makingValue, makingType, result }) {
  const typeLabel = makingType === "percentage" ? `${makingValue}%` : `₹${makingValue}/g`;
  return `💛 Gold Price Calculation
─────────────────────
Gold Rate  : ₹${rate}/g
Weight     : ${weight} g
Making     : ${typeLabel}
─────────────────────
Gold Value : ${formatINR(result.goldValue)}
Making     : ${formatINR(result.makingCharge)}
Total      : ${formatINR(result.totalPrice)}
─────────────────────
Powered by Gold Calculator`;
}
