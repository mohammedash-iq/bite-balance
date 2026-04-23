import { useNavigate } from "react-router-dom";
function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
        <h1 className="text-xl font-semibold tracking-tight">NutriTrack</h1>
        <div className="space-x-4">
          <button
            className="text-gray-300 hover:text-white transition"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition"
          onClick={() => {
              navigate("/signin");
            }}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
          Track your nutrition.
          <br />
          Stay consistent.
        </h2>
        <p className="mt-4 text-gray-400 max-w-md">
          A simple and minimal way to log your daily meals, monitor your intake,
          and build better habits over time.
        </p>

        <div className="mt-8 flex space-x-4">
          <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
            Get Started
          </button>
          <button className="border border-gray-700 px-6 py-3 rounded-md text-gray-300 hover:text-white hover:border-gray-500 transition">
            Learn More
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-800">
        © {new Date().getFullYear()} NutriTrack. All rights reserved.
      </footer>
    </div>
  );
}

export default MainPage;
