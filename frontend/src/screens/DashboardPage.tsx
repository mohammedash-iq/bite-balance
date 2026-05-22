import { Routes, Route } from "react-router-dom";
import Profile from "../components/dashboard/Profile";
import Scan from "../components/dashboard/Scan";
import Updates from "../components/dashboard/Updates";
import NaviagationBar from "../components/dashboard/NavigationBar";
import LandingDashboard from "../components/dashboard/LandingDashboard";
import PageNotFound from "./PageNotFound";

function DashboardPage() {
  return (
    <div className="apple-font min-h-screen bg-palette-beige text-palette-grey">
      <Routes>
        <Route path="/" element={<LandingDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <NaviagationBar />
    </div>
  );
}

export default DashboardPage;