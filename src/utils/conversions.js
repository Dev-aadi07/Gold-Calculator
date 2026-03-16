/**
 * conversions.js
 * ---------------
 * Jewellery-specific weight unit conversions.
 *
 * NAYA BHADI SYSTEM (modern standard)
 *   1 Bhadi  = 10 grams
 *   1 ana   = 1/16 Bhadi = 10/16 g  = 0.625 g
 *   1 Paisa  = 1/4 ana   = 0.625/4  = 0.15625 g
 *
 * PURNA BHADI SYSTEM (old / traditional)
 *   1 Purna Bhadi = 11.664 grams
 */

const NAYA_BHADI_G = 10;
const ana_G = NAYA_BHADI_G / 16;       // 0.625
const PAISA_G = ana_G / 4;             // 0.15625
const PURNA_BHADI_G = 11.664;

/**
 * Convert grams → Naya Bhadi system breakdown.
 * Returns { bhadi, ana, paisa } as decimal numbers.
 */

export function bhadiToGrams(bhadi) {
  const b = parseFloat(bhadi) || 0
  return b * 10
}

export function anaToGrams(ana) {
  const a = parseFloat(ana) || 0
  return a * 0.625
}

export function paisaToGrams(paisa) {
  const p = parseFloat(paisa) || 0
  return p * 0.15625
}

export function toNayaBhadi(grams) {
  const g = parseFloat(grams) || 0;
  return {
    bhadi: round4(g / NAYA_BHADI_G),
    ana: round4(g / ana_G),
    paisa: round4(g / PAISA_G),
  };
}

/**
 * Convert grams → Purna Bhadi value.
 */
export function toPurnaBhadi(grams) {
  const g = parseFloat(grams) || 0;
  return round4(g / PURNA_BHADI_G);
}

/**
 * Calculate Purna Bhadi specific display values.
 *
 * @param {number} grams               - Input weight in grams
 * @param {number} effectiveRatePerGram - Final rate per gram (gold + making)
 * @returns {{ purnaBhadi, ratePerPurnaBhadi, totalPrice }}
 *
 * Note: totalPrice stays the same — we're just changing the unit.
 * ratePerPurnaBhadi = effectiveRatePerGram × 11.664
 */
export function getPurnaBhadiView(grams, effectiveRatePerGram) {
  const g = parseFloat(grams) || 0;
  const rate = parseFloat(effectiveRatePerGram) || 0;

  const purnaBhadi = round4(g / PURNA_BHADI_G);
  const ratePerPurnaBhadi = round2(rate * PURNA_BHADI_G);
  const totalPrice = round2(rate * g); // same as totalPrice from calculations

  return { purnaBhadi, ratePerPurnaBhadi, totalPrice };
}

export const PURNA_BHADI_GRAMS = PURNA_BHADI_G;

function round2(n) { return Math.round(n * 100) / 100; }
function round4(n) { return Math.round(n * 10000) / 10000; }
