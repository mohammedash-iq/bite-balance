import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <header className="flex bg-black text-white justify-between items-center px-8 py-6 border-b border-gray-800">
            <h1 className="text-xl font-semibold tracking-tight hover:cursor-pointer" onClick={() => { navigate("/") }}>NutriTrack</h1>
            <div className="space-x-4">
                <button
                    className="text-gray-300 hover:text-white transition  hover:cursor-pointer"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Login
                </button>
                <button className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition  hover:cursor-pointer"
                    onClick={() => {
                        navigate("/signin");
                    }}>
                    Sign Up
                </button>
            </div>
        </header>
    )
}

export default Navbar