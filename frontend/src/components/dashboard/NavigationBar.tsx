import { useState } from "react";
import { FiHome, FiUser, FiList, FiCamera } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomNav() {
  const [active, setActive] = useState(useLocation().pathname);
  const navigate = useNavigate();


  const navItems = [
    { icon: FiHome, hrefLink: "/dashboard" },
    { icon: FiCamera, hrefLink: "/dashboard/scan" },
    { icon: FiList, hrefLink: "/dashboard/updates" },
    { icon: FiUser, hrefLink: "/dashboard/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center pb-2">
      <div className="apple-font bg-palette-beige/95 backdrop-blur-md rounded-[28px] p-2 flex gap-1 shadow-[0_8px_32px_rgba(38,39,48,0.15)] border border-palette-thistle/40">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === item.hrefLink;
          return (
            <button
              key={index}
              onClick={() => {
                setActive(item.hrefLink);
                navigate(item.hrefLink);
              }}
              className={`relative flex flex-col items-center justify-center px-5 py-3 rounded-[18px] transition-all duration-200 active:scale-90
                ${isActive
                  ? "bg-palette-teal text-white shadow-[0_2px_12px_rgba(119,186,153,0.35)]"
                  : "text-palette-grey hover:bg-palette-thistle/30"
                }
              `}
            >
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
            </button>
          );
        })}
      </div>
    </div>
  );
}