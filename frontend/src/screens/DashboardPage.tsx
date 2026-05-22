import { Routes, Route } from "react-router-dom";
import Profile from "../components/dashboard/Profile";
import Scan from "../components/dashboard/Scan";
import Updates from "../components/dashboard/Updates";
import LandingDashboard from "../components/dashboard/LandingDashboard";
import PageNotFound from "./PageNotFound";
import { useEffect, useState } from "react";
import { FiHome, FiUser, FiList, FiCamera } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-ink)] font-[var(--font-body)] pb-24">
      <Routes>
        <Route path="/" element={<LandingDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <NavigationBar />
    </div>
  );
}

function NavigationBar() {
  const [active, setActive] = useState(useLocation().pathname);
  const navigate = useNavigate();
  const navItems = [
    { icon: FiHome, hrefLink: "/dashboard" },
    { icon: FiCamera, hrefLink: "/dashboard/scan" },
    { icon: FiList, hrefLink: "/dashboard/updates" },
    { icon: FiUser, hrefLink: "/dashboard/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 px-4 z-50">
      <div className="bg-[var(--color-cream)]/80 backdrop-blur-md rounded-full p-2 flex gap-1 shadow-sm border border-[var(--color-cream-border)]">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === item.hrefLink || (item.hrefLink === "/dashboard" && active === "/dashboard/");
          return (
            <button
              key={index}
              onClick={() => {
                setActive(item.hrefLink);
                navigate(item.hrefLink);
              }}
              className={`relative flex flex-col items-center justify-center px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95
                ${isActive
                  ? "bg-[var(--color-sage)] text-white shadow-md"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-ink)]"
                }
              `}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardPage;