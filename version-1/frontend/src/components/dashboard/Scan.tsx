import { useState } from "react";
import TextScan from "./scan-section/ManualScan";
import CameraScan from "./scan-section/CameraScan";

const Scan = () => {
  const [activeTab, setActiveTab] = useState("camera");
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <main className="w-full max-w-md mt-20 flex-grow flex items-center justify-center">
        {activeTab === "camera" ? <CameraScan></CameraScan> : <TextScan></TextScan>}
      </main>
      <nav className="mb-15  rounded-3xl px-2 py-2 flex gap-4  border border-gray-200">

        <button
          onClick={() => setActiveTab("camera")}
          className={activeTab === "camera" ? "flex flex-col items-center gap-1 group relative py-1 px-2 rounded-xl bg-green-200" : ""}>
          Camera
        </button>
        <button
          onClick={() => setActiveTab("form")}
          className={activeTab === "form" ? "flex flex-col items-center gap-1 group relative py-1 px-2 rounded-xl bg-green-200" : ""}>
          Manual
        </button>
      </nav>
    </div>
  );
};

export default Scan;
