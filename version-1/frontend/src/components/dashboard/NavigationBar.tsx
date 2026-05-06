import { useState } from "react";
import { FiHome, FiUser, FiList, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const navItems = [
    { icon: <FiHome size={22} />, hrefLink: "/dashboard" },
    { icon: <FiCamera size={22} />, hrefLink: "/dashboard/scan" },
    { icon: <FiList size={22} />, hrefLink: "/dashboard/updates" },
    { icon: <FiUser size={22} />, hrefLink: "/dashboard/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4 ">
      <div className="bg-white/90 rounded-3xl p-2 flex gap-4 border border-gray-200 bg-red-200">
        {navItems.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setActive(index);
                navigate(item.hrefLink);
              }}
              className={`relative flex flex-col items-center justify-center px-4 py-2 rounded-2xl ${active == index ? "bg-green-200" : ""}`}
            >
              {" "}
              {item.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
