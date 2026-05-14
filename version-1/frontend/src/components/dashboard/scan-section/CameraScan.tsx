import { useEffect, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { handleImageScanMeal } from "../../../services/mealService";


function CameraScan() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const canvasRef = useRef(null)
  const [photo, setPhoto] = useState(null)
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
    , [photo])

  function clickPicture() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg', 0.5);
      setPhoto(imageData)
    }
  }
  function reclick() {
    setPhoto(null);
  }
  async function handleImageScan() {
    console.log(photo)
    const response = handleImageScanMeal({ image: photo });
    console.log(response)
  }

  return (
    <div className="apple-font w-full border-palette-grey border-2 rounded-2xl">
      <div className="px-5 py-16 bg-palette-beige rounded-2xl flex flex-col items-center justify-center border-1 ">
        <div>
          {photo ? <img src={photo} className=" rounded-2xl border mb-2 scale-x-[-1]" /> : <video ref={videoRef} autoPlay playsInline muted className=" rounded-2xl border mb-2 scale-x-[-1]" > </video>}
        </div>
        <canvas className="hidden" ref={canvasRef}></canvas>
        {photo ? "" : <div onClick={clickPicture} className="p-4 bg-palette-raspberry text-white rounded-2xl shadow-sm"><FiCamera size={48} /></div>}
        <div>
          {photo ? <div className="flex gap-1">
            <div onClick={reclick} className="p-4 bg-palette-raspberry text-white rounded-2xl shadow-sm">rescan</div>
            <div onClick={handleImageScan} className="p-4 bg-palette-raspberry text-white rounded-2xl shadow-sm">scan</div>
          </div> : ""}
        </div>
        <p className="mt-4 text-sm font-medium text-palette-grey/60">Tap to scan image</p>
      </div>
    </div>
  );
}

export default CameraScan;