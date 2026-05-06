import { Routes, Route } from "react-router-dom";
import Profile from "../components/dashboard/Profile";
import Scan from "../components/dashboard/Scan";
import Updates from "../components/dashboard/Updates";
import NaviagationBar from "../components/dashboard/NavigationBar";
import LandingDashboard from "../components/dashboard/LandingDashboard";
import PageNotFound from "./PageNotFound";



function DashboardPage() {
  return (
    <><Routes>
      <Route path="/" element={<LandingDashboard></LandingDashboard>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/scan" element={<Scan></Scan>}></Route>
      <Route path="/updates" element={<Updates></Updates>}></Route>
      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
      <NaviagationBar></NaviagationBar>
    </>


  )
}

export default DashboardPage