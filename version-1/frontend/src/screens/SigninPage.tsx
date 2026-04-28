import { useNavigate } from "react-router-dom";
import { signinApiCall } from "../services/accountsService";
import { useState } from "react";
import Navbar from "../components/main-page-component/navbar";

function SigninPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })
  async function handleSigninSubmit(e) {
    e.preventDefault();
    const response = await signinApiCall({ username: formData.username, email: formData.email, password: formData.password });
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
    <> <Navbar ></Navbar>
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create a new account
            </h1>
          </div>
          <form className="space-y-5" onSubmit={(e) => { handleSigninSubmit(e) }}>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }}
                placeholder="John Doe"
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                placeholder="you@example.com"
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                placeholder="••••••••"
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Sign Up
            </button>
          </form>

          <p className=" mt-10 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <button className="text-white hover:underline"
              onClick={() => {
                navigate("/login");
              }}>Log in</button>
          </p>
        </div>
      </div>
    </>
  );
}

export default SigninPage;
