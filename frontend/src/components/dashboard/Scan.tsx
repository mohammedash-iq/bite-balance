import { useEffect, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { handleImageScanMeal } from "../../services/mealService";
import { toast } from "react-hot-toast";
import { handleManualMealScan, fetchOptions } from "../../services/mealService";

const Scan = () => {
  const [activeTab, setActiveTab] = useState("recent");

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-[var(--color-cream)] font-[var(--font-body)] text-[var(--color-ink)]">

      {/* ── Segmented Navigation ── */}
      <nav className="mt-4 bg-[var(--color-cream-dark)] rounded-full p-1.5 flex gap-1 border border-[var(--color-cream-border)] shadow-sm">
        {[
          { label: "Recent", value: "recent" },
          { label: "Manual", value: "manual" },
          { label: "Camera", value: "camera" },
        ].map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-colors
                ${isActive
                  ? "bg-[var(--color-sage)] text-white shadow-sm"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-cream-border)]/30"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ── Main Content Area ── */}
      <main className="w-full max-w-md mt-10 flex-grow flex flex-col items-center">
        {activeTab === "camera" ? <CameraScan /> : activeTab === "manual" ? <TextScan /> : <RecentMeals />}
      </main>

    </div>
  );
};

// Component for camera scanning
function CameraScan() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    async function startMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", height: 480, width: 720 },
          audio: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
        }
      } catch (err) {
        toast.error("Cannot access camera!", { duration: 2000 });
      }
    }
    startMedia();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [photo]);

  function clickPicture() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg", 0.5);
      setPhoto(imageData);
    }
  }

  function reclick() {
    setPhoto(null);
  }

  async function handleImageScan() {
    const response = await handleImageScanMeal({ image: photo });
    if (response.success) {
      toast.success(response.message, { duration: 2000 });
      return;
    }
    toast.error(response.error, { duration: 3000 });
  }

  return (
    <div className="w-full rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-6">
      <div className="mb-4 text-center">
        <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
          Scan your plate
        </h2>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          Let AI estimate your meal's nutrition.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full overflow-hidden rounded-2xl border border-[var(--color-cream-border)] bg-[var(--color-cream)] mb-6 shadow-sm">
          {photo ? (
            <img src={photo} className="w-full object-cover scale-x-[-1]" alt="Captured meal" />
          ) : (
            <video ref={videoRef} autoPlay playsInline muted className="w-full object-cover scale-x-[-1]"></video>
          )}
        </div>

        <canvas className="hidden" ref={canvasRef}></canvas>

        {!photo ? (
          <button
            onClick={clickPicture}
            className="w-full flex flex-col items-center justify-center gap-2 py-6 rounded-2xl border-2 border-dashed border-[var(--color-sage-dim)] bg-[var(--color-sage-muted)] text-[var(--color-sage)] hover:bg-[var(--color-sage)] hover:text-white transition-colors"
          >
            <FiCamera size={32} />
            <p className="text-sm font-semibold uppercase tracking-wider">Tap to capture</p>
          </button>
        ) : (
          <div className="flex w-full gap-3">
            <button
              onClick={reclick}
              className="flex-1 rounded-full border border-[var(--color-cream-border)] bg-transparent py-3.5 text-sm font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-sage-dim)] hover:bg-[var(--color-sage-muted)] transition-colors"
            >
              Retake
            </button>
            <button
              onClick={handleImageScan}
              className="flex-1 rounded-full bg-[var(--color-sage)] py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-sage-light)] transition-colors"
            >
              Analyze Meal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Component for manually selecting meal
function TextScan() {
  const [portion, setPortion] = useState("Full");
  const [mealName, setMealName] = useState("");

  async function handleformSubmit(e) {
    e.preventDefault();
    if (mealName === "" || portion === "") {
      toast.error("Please select both meal and portion size", { duration: 1000 });
      return;
    }
    const response = await handleManualMealScan({ meal: mealName, portion: portion });
    if (response.success) {
      toast.success(response.message, { removeDelay: 1000 });
      return;
    }
    toast.error(response.error, { removeDelay: 1000 });
  }

  const portionOptions = ["Quarter", "Half", "Full", "Double"];

  return (
    <div className="w-full p-8 rounded-[var(--radius-card)] bg-[var(--color-cream-dark)] border border-[var(--color-cream-border)] shadow-sm">
      <div className="mb-8 text-center sm:text-left">
        <span className="inline-block uppercase tracking-[0.3em] text-[10px] font-semibold text-[var(--color-sage)] bg-[var(--color-sage-muted)] px-3 py-1 rounded-full mb-3">
          Log Meal
        </span>
        <h2 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
          What did you have?
        </h2>
      </div>

      <form onSubmit={handleformSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">
            Search Database
          </label>
          <MultiSelectSearch setMealName={setMealName} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">
            Portion Size
          </label>
          <div className="flex flex-wrap gap-2">
            {portionOptions.map((item, index) => (
              <div
                key={index}
                onClick={(e) => setPortion((e.target as any).innerText)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${item === portion
                    ? "bg-[var(--color-sage)] text-white border-[var(--color-sage)]"
                    : "bg-[var(--color-cream)] text-[var(--color-muted)] border-[var(--color-cream-border)] hover:border-[var(--color-sage-dim)]"
                  }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 flex items-center justify-center rounded-full bg-[var(--color-sage)] px-8 py-4 text-sm font-semibold text-white hover:bg-[var(--color-sage-light)] transition-colors"
        >
          Save Meal
        </button>
      </form>
    </div>
  );
}

// Function for loading meals for text scan
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
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl bg-[var(--color-cream)] border transition-colors
          ${isFocused ? "border-[var(--color-sage)] ring-1 ring-[var(--color-sage)]" : "border-[var(--color-cream-border)]"}
        `}
      >
        {/* Search icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--color-muted-light)] shrink-0">
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          placeholder="e.g., Grilled Chicken Salad..."
          value={currentSelection ? currentSelection : query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentSelection("");
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          className="flex-1 bg-transparent outline-none text-sm text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
        />

        {/* Clear button */}
        {(query || currentSelection) && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCurrentSelection("");
              setOptions([]);
            }}
            className="shrink-0 w-5 h-5 rounded-full bg-[var(--color-cream-border)] flex items-center justify-center text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-muted-light)] hover:text-white"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown list */}
      {options.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-2 bg-[var(--color-cream-dark)] rounded-xl border border-[var(--color-cream-border)] shadow-md max-h-[200px] overflow-y-auto divide-y divide-[var(--color-cream-border)]">
          {options.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setMealName(item.id);
                setCurrentSelection(item.food);
                setOptions([]);
              }}
              className="px-4 py-3 cursor-pointer text-sm font-medium text-[var(--color-ink)] flex items-center justify-between hover:bg-[var(--color-cream)] transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <span>{item.food}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--color-muted-light)]">
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Function for logging meal that you had recently
function RecentMeals() {
  return (
    <div className="w-full text-center py-16 rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)]">
      <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)] mb-2">No recent meals</h3>
      <p className="text-[var(--color-muted)] text-sm font-[var(--font-body)]">
        Meals you scan or log manually will appear here for quick access.
      </p>
    </div>
  );
}

export default Scan;