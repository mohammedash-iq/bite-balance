import { FiCamera } from "react-icons/fi";
function CameraScan() {
  return (
    <div key="scan" className="w-full">
      <div className="p-[4rem] bg-green-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed  hover:bg-green-200 ">
        <div className="p-4 bg-green-500 text-white rounded-2xl">
          <FiCamera size={48} />
        </div>
        <p className="mt-4 font-medium">Tap to scan image</p>
      </div>
    </div>
  );
}

export default CameraScan;
