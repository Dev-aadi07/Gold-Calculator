/**
 * CalculatorForm.jsx
 * -------------------
 * The input section. Four fields:
 *   1. Gold Rate (₹/g)
 *   2. Weight (g)
 *   3. Making Charge value
 *   4. Making Charge type (dropdown)
 *
 * All inputs are "controlled" — their values live in App.jsx state.
 * onChange fires immediately so calculations update in real-time.
 */

export default function CalculatorForm({ inputs, onChange }) {
  // Helper so we don't repeat className boilerplate for every input
  const inputClass =
    "w-full bg-amber-950/40 border border-amber-700/40 rounded-xl px-4 py-3 " +
    "text-amber-50 text-lg font-semibold placeholder:text-amber-700/60 " +
    "focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 " +
    "transition-all duration-200";

  const labelClass = "block text-amber-400/80 text-xs font-bold tracking-widest uppercase mb-1.5";

  return (
    <div className="bg-gradient-to-b from-amber-950/60 to-amber-900/30 rounded-2xl border border-amber-700/30 p-5 shadow-xl shadow-black/30">
      <h2 className="text-amber-300 font-bold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
        <span className="text-lg">⚖️</span> Inputs
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Gold Rate */}
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Gold Rate (₹/g)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 font-bold text-lg">₹</span>
            <input
              type="number"
              inputMode="decimal"
              placeholder="e.g. 7200"
              className={inputClass + " pl-8"}
              value={inputs.rate}
              onChange={(e) => onChange("rate", e.target.value)}
            />
          </div>
        </div>

        {/* Weight */}
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Weight (grams)</label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 text-sm font-bold">g</span>
            <input
              type="number"
              inputMode="decimal"
              placeholder="e.g. 5.5"
              className={inputClass + " pr-8"}
              value={inputs.weight}
              onChange={(e) => onChange("weight", e.target.value)}
            />
          </div>
        </div>

        {/* Making Charge Value */}
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Making Charge</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 font-bold text-lg">
              {inputs.makingType === "percentage" ? "%" : "₹"}
            </span>
            <input
              type="number"
              inputMode="decimal"
              placeholder={inputs.makingType === "percentage" ? "e.g. 18" : "e.g. 150"}
              className={inputClass + " pl-8"}
              value={inputs.makingValue}
              onChange={(e) => onChange("makingValue", e.target.value)}
            />
          </div>
        </div>

        {/* Making Type Dropdown */}
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Charge Type</label>
          <select
            className={inputClass + " cursor-pointer"}
            value={inputs.makingType}
            onChange={(e) => onChange("makingType", e.target.value)}
          >
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed per gram (₹/g)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
