import { useEffect, useReducer, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";


function CameraScan() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  useEffect(() => {
    async function startMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", height: 480, width: 720 }, audio: true })
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
        }
      }
      catch (err) {
        console.log("Cannot access camera", err);
      }
    }
    startMedia()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  }
    , [])


  return (
    <div className="apple-font w-full border-palette-grey border-2 rounded-2xl">
      <div className="px-5 py-16 bg-palette-beige rounded-2xl flex flex-col items-center justify-center border-1 ">
        <div>
          <video ref={videoRef} autoPlay playsInline muted className=" rounded-2xl border mb-2 scale-x-[-1]" > video will be availble here</video>
        </div>

        <div className="p-4 bg-palette-raspberry text-white rounded-2xl shadow-sm">
          <FiCamera size={48} />
        </div>
        <p className="mt-4 text-sm font-medium text-palette-grey/60">Tap to scan image</p>
      </div>
    </div>
  );
}

export default CameraScan;