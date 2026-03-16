/**
 * ResultCard.jsx
 * ---------------
 * Displays three result cards: Gold Value, Making Charge, Total Price.
 * Also handles the "Copy Calculation" button.
 *
 * Props:
 *   result   - from calculateGoldPrice()
 *   inputs   - raw user inputs (for copy text)
 *   onCopy   - callback that copies text & shows toast
 *   copied   - boolean, true for 2s after copying
 */

import { formatINR } from "../utils/calculations";

export default function ResultCard({ result, inputs, onCopy, copied }) {
  const hasResult = result.totalPrice > 0;

  return (
    <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 rounded-2xl border border-amber-700/30 p-5 shadow-xl shadow-black/30">
      <h2 className="text-amber-300 font-bold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
        <span className="text-lg">💰</span> Result
      </h2>

      {!hasResult ? (
        <p className="text-amber-700/60 text-center py-6 text-sm">
          Enter rate and weight to see results
        </p>
      ) : (
        <>
          {/* Three result cards in a row on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 gap-3 mb-4">
            <ResultRow
              label="Gold Value"
              value={formatINR(result.goldValue)}
              sublabel="Rate × Weight"
              color="text-amber-300"
            />
            <ResultRow
              label="Making Charge"
              value={formatINR(result.makingCharge)}
              sublabel={`₹${result.makingPerGram}/g applied`}
              color="text-orange-300"
            />
            {/* Total gets special treatment — bigger, highlighted */}
            <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-amber-200 text-xs font-bold tracking-widest uppercase">Total Price</p>
                <p className="text-amber-50 text-3xl font-black tracking-tight mt-0.5">
                  {formatINR(result.totalPrice)}
                </p>
              </div>
              <span className="text-4xl opacity-30">✦</span>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={onCopy}
            className={
              "w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 " +
              (copied
                ? "bg-green-600/80 text-green-100 border border-green-500/50"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 active:scale-95")
            }
          >
            {copied ? (
              <><span>✓</span> Copied! Send on WhatsApp</>
            ) : (
              <><span>📋</span> Copy Calculation</>
            )}
          </button>
        </>
      )}
    </div>
  );
}

/** A single label + value row inside the results */
function ResultRow({ label, value, sublabel, color }) {
  return (
    <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-3.5 flex items-center justify-between">
      <div>
        <p className="text-amber-500/80 text-xs font-bold tracking-widest uppercase">{label}</p>
        {sublabel && <p className="text-amber-700/60 text-xs mt-0.5">{sublabel}</p>}
      </div>
      <p className={`${color} text-xl font-black tabular-nums`}>{value}</p>
    </div>
  );
}
