import { useState } from "react";
import TextScan from "./scan-section/ManualScan";
import CameraScan from "./scan-section/CameraScan";
import RecentMeals from "./scan-section/RecentMeals"

const Scan = () => {
  const [activeTab, setActiveTab] = useState("recent");

  return (
    <div className="apple-font min-h-screen flex flex-col items-center p-6 bg-palette-beige">

      <main className="w-full max-w-md mt-20 flex-grow flex items-center justify-center">
        {activeTab === "camera" ? <CameraScan /> : activeTab === "manual" ? <TextScan /> : <RecentMeals />}
      </main>
      <nav className="mb-18 bg-palette-thistle/30 rounded-[18px] p-1 flex gap-1 border border-palette-thistle/40 shadow-[0_4px_16px_rgba(38,39,48,0.08)]">
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
              className={`px-7 py-2 rounded-[14px] text-[15px] font-medium transition-all duration-200 active:scale-95
                ${isActive
                  ? "bg-palette-teal text-white shadow-[0_2px_10px_rgba(119,186,153,0.30)]"
                  : "text-palette-grey hover:text-palette-grey/70"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

    </div>
  );
};

export default Scan;