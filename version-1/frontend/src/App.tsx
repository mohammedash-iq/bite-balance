import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scan from "./pages/Scan";
import Dashboard from "./pages/Dashboard";
import Updates from "./pages/Updates";
import Profile from "./pages/Profile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/scan" element={<Scan />}></Route>
          <Route path="/updates" element={<Updates />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <NavigationBar></NavigationBar>
      </BrowserRouter>

    </>
  );
}

export default App;
