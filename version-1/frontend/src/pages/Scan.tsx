import { useState } from "react";
import VoiceScan from "../components/VoiceScan";
import TextScan from "../components/TextScan";
import CameraScan from "../components/CameraScan";

const Scan = () => {
  const [activeTab, setActiveTab] = useState("camera");
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <main className="w-full max-w-md mt-20 flex-grow flex items-center justify-center">
        {activeTab === "camera" && <CameraScan></CameraScan>}
        {activeTab === "voice" && <VoiceScan></VoiceScan>}
        {activeTab === "form" && <TextScan></TextScan>}
      </main>
      <nav className="mb-15  rounded-3xl px-2 py-2 flex gap-8  border border-gray-200">
        <NavButton
          active={activeTab === "camera"}
          onClick={() => setActiveTab("camera")}
          label="Camera"
        />
        <NavButton
          active={activeTab === "voice"}
          onClick={() => setActiveTab("voice")}
          label="Record"
        />
        <NavButton
          active={activeTab === "form"}
          onClick={() => setActiveTab("form")}
          label="Manual"
        />
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 group relative py-1 px-2 rounded-xl ${active ? "bg-green-200" : ""}`}
  >
    {label}
  </button>
);

export default Scan;
