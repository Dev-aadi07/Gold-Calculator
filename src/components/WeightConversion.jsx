/**
 * WeightConversion.jsx
 * ---------------------
 * Shows jewellery weight units and allows editing them.
 *
 * User can enter:
 *   - Bhadi
 *   - Ana
 *   - Paisa
 *
 * When any value changes, it converts to grams
 * and updates the main weight in App.jsx.
 */

import { toNayaBhadi } from "../utils/conversions";

export default function WeightConversion({ weight, onChange }) {
  const grams = parseFloat(weight) || 0;

  const { bhadi, ana, paisa } = toNayaBhadi(grams);

  const inputClass =
    "w-full bg-transparent text-center text-xl font-black mt-1 tabular-nums " +
    "focus:outline-none";

  return (
    <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 rounded-2xl border border-amber-700/30 p-5 shadow-xl shadow-black/30">
      <h2 className="text-amber-300 font-bold text-sm tracking-widest uppercase mb-1 flex items-center gap-2">
        <span className="text-lg">📏</span> Naya Bhadi System
      </h2>

      <p className="text-amber-700/50 text-xs mb-4">
        1 Bhadi = 10g • 1 Ana = 0.625g • 1 Paisa = 0.15625g
      </p>

      <div className="grid grid-cols-3 gap-3">

        {/* Bhadi */}
        <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-3 text-center">
          <p className="text-amber-600/70 text-xs font-bold tracking-widest uppercase">
            Bhadi
          </p>

          <input
            type="number"
            value={bhadi}
            className={`${inputClass} text-amber-300`}
            onChange={(e) => onChange("bhadi", e.target.value)}
          />

          <p className="text-amber-700/50 text-xs">bh</p>
        </div>

        {/* Ana */}
        <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-3 text-center">
          <p className="text-amber-600/70 text-xs font-bold tracking-widest uppercase">
            Ana
          </p>

          <input
            type="number"
            value={ana}
            className={`${inputClass} text-yellow-300`}
            onChange={(e) => onChange("ana", e.target.value)}
          />

          <p className="text-amber-700/50 text-xs">an</p>
        </div>

        {/* Paisa */}
        <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-3 text-center">
          <p className="text-amber-600/70 text-xs font-bold tracking-widest uppercase">
            Paisa
          </p>

          <input
            type="number"
            value={paisa}
            className={`${inputClass} text-orange-300`}
            onChange={(e) => onChange("paisa", e.target.value)}
          />

          <p className="text-amber-700/50 text-xs">ps</p>
        </div>

      </div>
    </div>
  );
}