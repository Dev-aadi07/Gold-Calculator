/**
 * App.jsx
 * --------
 * Root component controlling all state and wiring components together.
 */

import { useState, useEffect, useCallback } from "react";
import CalculatorForm from "./components/CalculatorForm";
import ResultCard from "./components/ResultCard";
import WeightConversion from "./components/WeightConversion";
import PurnaBhadiView from "./components/PurnaBhadiView";

import {
  calculateGoldPrice,
  buildCopyText
} from "./utils/calculations";

import {
  bhadiToGrams,
  anaToGrams,
  paisaToGrams
} from "./utils/conversions";

const STORAGE_KEY = "gold_calc_inputs_v1";

const DEFAULT_INPUTS = {
  rate: "",
  weight: "",
  makingValue: "",
  makingType: "percentage",
};

export default function App() {

  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [copied, setCopied] = useState(false);

  // ───── Restore saved inputs ─────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        setInputs({ ...DEFAULT_INPUTS, ...parsed });
      }

    } catch {
      console.warn("Could not restore saved inputs");
    }
  }, []);

  // ───── Save inputs ─────
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
    } catch {
      console.warn("Could not save inputs");
    }
  }, [inputs]);

  // ───── Calculate result ─────
  const result = calculateGoldPrice(
    inputs.rate,
    inputs.weight,
    inputs.makingValue,
    inputs.makingType
  );

  // ───── Normal input change ─────
  const handleChange = useCallback((field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // ───── Conversion input change (Bhadi / Ana / Paisa) ─────
  const handleConversionChange = useCallback((unit, value) => {

    let grams = 0;

    if (unit === "bhadi") grams = bhadiToGrams(value);
    if (unit === "ana") grams = anaToGrams(value);
    if (unit === "paisa") grams = paisaToGrams(value);

    setInputs(prev => ({
      ...prev,
      weight: grams.toString()
    }));

  }, []);

  // ───── Copy calculation ─────
  const handleCopy = useCallback(() => {

    const text = buildCopyText({
      ...inputs,
      result
    });

    navigator.clipboard
      .writeText(text)
      .then(() => {

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);

      })
      .catch(() => {
        alert(text);
      });

  }, [inputs, result]);

  return (

    <div className="min-h-screen bg-[#0f0a00] text-amber-50 font-sans">

      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-lg mx-auto px-4 pb-12 pt-6 relative">

        {/* Header */}
        <header className="mb-6 text-center">

          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-3">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
              Jewellery Shop Tool
            </span>
          </div>

          <h1 className="text-3xl font-black text-amber-50 tracking-tight">
            Gold <span className="text-amber-400">Calculator</span>
          </h1>

          <p className="text-amber-700/60 text-sm mt-1">
            Rate • Weight • Making Charge
          </p>

        </header>

        {/* Sections */}
        <div className="flex flex-col gap-4">

          {/* Inputs */}
          <CalculatorForm
            inputs={inputs}
            onChange={handleChange}
          />

          {/* Results */}
          <ResultCard
            result={result}
            inputs={inputs}
            onCopy={handleCopy}
            copied={copied}
          />

          {/* Editable Naya Bhadi conversions */}
          <WeightConversion
            weight={inputs.weight}
            onChange={handleConversionChange}
          />

          {/* Purna Bhadi display */}
          <PurnaBhadiView
            weight={inputs.weight}
            effectiveRatePerGram={result.effectiveRatePerGram}
          />

        </div>

        {/* Footer */}
        <footer className="text-center mt-8">
          <p className="text-amber-900/60 text-xs">
            All calculations are approximate • For reference only
          </p>
        </footer>

      </div>
    </div>
  );
}