import { FiCamera } from "react-icons/fi";

function CameraScan() {
  return (
    <div key="scan" className="apple-font w-full border-palette-grey border-2 rounded-2xl">
      <div className="px-5 py-16 bg-palette-beige rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-palette-thistle hover:bg-palette-thistle/20 transition-all duration-150 active:scale-95">
        <div className="p-4 bg-palette-raspberry text-white rounded-2xl shadow-sm">
          <FiCamera size={48} />
        </div>
        <p className="mt-4 text-sm font-medium text-palette-grey/60">Tap to scan image</p>
      </div>
    </div>
  );
}

export default CameraScan;