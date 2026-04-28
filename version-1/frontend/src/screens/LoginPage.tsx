import { useNavigate } from "react-router-dom";
import { loginApiCall } from "../services/accountsService";
import { useState } from "react";
import Navbar from "../components/main-page-component/navbar";
function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" })
  async function handleLoginSubmit(e) {
    e.preventDefault();
    const response = await loginApiCall({ email: formData.email, password: formData.password });
    const responseBody = await response.json();
    if (response.ok) {
      localStorage.setItem("token", responseBody.accesstoken)
      alert(responseBody.message)
    }
    else {
      alert(responseBody.error)
    }
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
          </div>
          <form className="space-y-5" onSubmit={(e) => { handleLoginSubmit(e) }}>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input type="email"
                value={formData.email}
                onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                placeholder="you@example.com"
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder-gray-500"
                required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                value={formData.password}
                type="password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Log In
            </button>
          </form>

          <p className=" mt-10 text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <button
              className="text-white hover:underline"
              onClick={() => { navigate("/signin"); }}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
