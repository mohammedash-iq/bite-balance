import { useState, useEffect } from "react";
import { handleManualMealScan, fetchOptions } from "../../../services/mealService";

function TextScan() {
  const [portion, setPortion] = useState("Full");
  const [mealName, setMealName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleformSubmit(e) {
    e.preventDefault();
    if (mealName === "" || portion === "") {
      alert("Please select both meal and portion size");
      return;
    }
    setIsSubmitting(true);
    await handleManualMealScan({
      meal: mealName,
      portion: portion,
    });
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }
  const portionOptions = ["Quater", "Half", "Full", "Double"]

  return (
    <div className="w-full p-8 rounded-[28px] bg-palette-beige shadow-[0_8px_32px_rgba(38,39,48,0.10)]">

      {/* Header */}
      <div className="mb-8">
        <p className="text-palette-teal text-[11px] font-semibold uppercase tracking-[0.12em] mb-1 apple-font">
          Log Meal
        </p>
        <h2 className="text-palette-grey text-[28px] font-bold tracking-[-0.5px] leading-tight apple-font">
          What did you have?
        </h2>
      </div>

      <form onSubmit={handleformSubmit} className="space-y-3">
        <MultiSelectSearch setMealName={setMealName} />
        <div className="flex gap-2 justify-center">
          {portionOptions.map((item, index) => <div key={index} className={item == portion ? "bg-green-200" : "bg-gray-100"} onClick={(e) => setPortion(e.target.innerText)}>{item}</div>)}
        </div>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-palette-thistle">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`apple-font w-full mt-2 py-[15px] rounded-full text-[15px] font-semibold text-white transition-all duration-200 active:scale-[0.97]
            ${submitted ? "bg-palette-teal" : "bg-palette-teal hover:bg-palette-raspberry"}
            ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Logging…
            </span>
          ) : submitted ? (
            <span className="flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Logged!
            </span>
          ) : (
            "Log Meal"
          )}
        </button>
      </form>
    </div>
  );
}

function MultiSelectSearch({ setMealName }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [currentSelection, setCurrentSelection] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) {
        updateOptions(query);
      } else {
        setOptions([]);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);
  async function updateOptions(query) {
    const fetchedOptions = await fetchOptions(query);
    setOptions(fetchedOptions);
  }
  return (
    <div className="relative w-full">
      <div
        className={`flex items-center gap-3 px-4 py-[15px] rounded-[14px] bg-white border transition-all duration-200
          ${isFocused ? "border-palette-teal ring-2 ring-palette-teal/20" : "border-palette-thistle"}
        `}
      >
        {/* Search icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-palette-thistle shrink-0">
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          placeholder="Search food…"
          value={currentSelection ? currentSelection : query}
          onChange={(e) => { setQuery(e.target.value); setCurrentSelection(""); }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="apple-font flex-1 bg-transparent outline-none text-[15px] text-palette-grey placeholder:text-palette-thistle"
        />

        {/* Clear button */}
        {(query || currentSelection) && (
          <button
            type="button"
            onClick={() => { setQuery(""); setCurrentSelection(""); setOptions([]); }}
            className="shrink-0 w-5 h-5 rounded-full bg-palette-thistle/60 flex items-center justify-center text-white transition-opacity hover:opacity-80"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown list */}
      {options.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-[16px] border border-palette-thistle/60 shadow-[0_8px_24px_rgba(38,39,48,0.12)] max-h-[200px] overflow-y-auto divide-y divide-palette-thistle/30">
          {options.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setMealName(item.id);
                setCurrentSelection(item.food);
                setOptions([]);
              }}
              className="apple-font px-4 py-3 cursor-pointer text-[15px] text-palette-grey flex items-center justify-between hover:bg-palette-beige transition-colors duration-150 first:rounded-t-[16px] last:rounded-b-[16px]"
            >
              <span>{item.food}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-palette-thistle">
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TextScan;