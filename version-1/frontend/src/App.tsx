import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import SigninPage from "./screens/SigninPage";
import MainPage from "./screens/MainPage";
import DashboardPage from "./screens/DashboardPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/dashboard/*" element={<DashboardPage></DashboardPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
