import { useNavigate } from "react-router-dom";
import { loginApiCall } from "../services/accountsService";
function LoginPage() {
  const navigate = useNavigate();
  function handleLoginSubmit(e) {
    console.log(e);
    e.preventDefault();
  }
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
        </div>
        <form className="space-y-5" onSubmit={(e) => { handleLoginSubmit(e) }}>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input type="email"
              placeholder="you@example.com"
              className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder-gray-500"
              required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
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
  );
}

export default LoginPage;
