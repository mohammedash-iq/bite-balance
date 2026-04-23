import { Routes, Route } from "react-router-dom";
import Profile from "./dashboard-pages/Profile";
import Scan from "./dashboard-pages/Scan";
import Updates from "./dashboard-pages/Updates";
import MainDashboard from "./dashboard-pages/MainDashboard";
import NaviagationBar from "../components/NavigationBar";



function DashboardPage() {
  return (
    <><Routes>
      <Route path="/" element={<MainDashboard></MainDashboard>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/scan" element={<Scan></Scan>}></Route>  
      <Route path="/updates" element={<Updates></Updates>}></Route>
    </Routes>
      <NaviagationBar></NaviagationBar>
    </>


  )
}

export default DashboardPage