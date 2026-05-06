import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import SigninPage from "./screens/SigninPage";
import LandingPage from "./screens/LandingPage";
import DashboardPage from "./screens/DashboardPage";
import PageNotFound from "./screens/PageNotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/dashboard/*" element={<DashboardPage></DashboardPage>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
