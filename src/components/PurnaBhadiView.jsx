/**
 * PurnaBhadiView.jsx
 * -------------------
 * Displays the Purna Bhadi (old system) equivalent.
 *
 * KEY INSIGHT: The total price does NOT change.
 * We are just expressing the same weight in a different unit.
 *
 * 1 Purna Bhadi = 11.664 grams
 *
 * Displayed:
 *   - Weight in Purna Bhadi
 *   - Rate per Purna Bhadi (effectiveRatePerGram × 11.664)
 *   - Total Price (same as overall total)
 */

import { getPurnaBhadiView } from "../utils/conversions";
import { formatINR } from "../utils/calculations";

export default function PurnaBhadiView({ weight, effectiveRatePerGram }) {
  const grams = parseFloat(weight) || 0;
  const hasData = grams > 0 && effectiveRatePerGram > 0;

  const { purnaBhadi, ratePerPurnaBhadi, totalPrice } = getPurnaBhadiView(
    grams,
    effectiveRatePerGram
  );

  return (
    <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 rounded-2xl border border-amber-700/30 p-5 shadow-xl shadow-black/30">
      <h2 className="text-amber-300 font-bold text-sm tracking-widest uppercase mb-1 flex items-center gap-2">
        <span className="text-lg">🏺</span> Purna Bhadi System
      </h2>
      <p className="text-amber-700/50 text-xs mb-4">Traditional unit • 1 Purna Bhadi = 11.664g</p>

      {!hasData ? (
        <p className="text-amber-700/60 text-center py-4 text-sm">Enter rate and weight to see</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {/* Purna Bhadi weight */}
          <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-3 text-center">
            <p className="text-amber-600/70 text-xs font-bold tracking-widest uppercase">Weight</p>
            <p className="text-amber-300 text-xl font-black mt-1 tabular-nums">{purnaBhadi}</p>
            <p className="text-amber-700/50 text-xs">P.Bh</p>
          </div>

          {/* Rate per Purna Bhadi */}
          <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-3 text-center">
            <p className="text-amber-600/70 text-xs font-bold tracking-widest uppercase">Rate/P.Bh</p>
            <p className="text-yellow-300 text-lg font-black mt-1 tabular-nums leading-tight">
              {formatINR(ratePerPurnaBhadi)}
            </p>
          </div>

          {/* Total price (same value) */}
          <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-3 text-center">
            <p className="text-amber-600/70 text-xs font-bold tracking-widest uppercase">Total</p>
            <p className="text-orange-300 text-lg font-black mt-1 tabular-nums leading-tight">
              {formatINR(totalPrice)}
            </p>
          </div>
        </div>
      )}

      {hasData && (
        <p className="text-amber-800/50 text-xs text-center mt-3">
          ✦ Total price remains the same — only the unit changes
        </p>
      )}
    </div>
  );
}
