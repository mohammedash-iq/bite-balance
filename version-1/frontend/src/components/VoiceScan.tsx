function VoiceScan() {
  return (
    <div key="voice" className="w-full text-center">
      <div className="h-64 flex items-center justify-center gap-1"></div>
      <button className="border border-gray-200  px-10 py-4 rounded-2xl font-bold hover:bg-green-200">
        Start Recording
      </button>
    </div>
  );
}

export default VoiceScan;
