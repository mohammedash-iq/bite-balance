import { useEffect, useState } from "react";
import { fetchProfile, fetchProfileHealthMetrics } from "../../services/userService";

function Profile() {
  const [user, setUser] = useState({});
  const [healthMetrics, setHealthMetrics] = useState({});

  useEffect(() => {
    const loadProfile = async () => {
      const userData = await fetchProfile();
      const userHealthMetrics = await fetchProfileHealthMetrics();
      setUser(userData);
      setHealthMetrics(userHealthMetrics);
    };
    loadProfile();
  }, []);

  return (
    <div className="apple-font min-h-screen px-5 py-8 mb-10 max-w-[600px] mx-auto text-palette-grey">
      <div className="flex flex-col items-center gap-2 mb-8">
        <img
          src={user ? user.image_url : "https://api.dicebear.com/9.x/thumbs/svg?seed=Sophie"}
          alt="Profile"
          className="w-28 h-28 rounded-full bg-palette-thistle border-4 border-white shadow-sm object-cover"
        />
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-palette-grey">
          {user ? user.username : "Username"}
        </h1>
        <h3 className="text-sm font-normal text-palette-grey/60">
          {user ? user.email : "Email"}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
        <h2 className="text-xs font-medium tracking-wide uppercase text-palette-grey/50 ml-1 mb-1">
          Health Metrics
        </h2>
        <ul className="bg-palette-beige rounded-2xl overflow-hidden shadow-sm">
          <li className="flex justify-between items-center px-5 py-3.5 border-b border-palette-thistle/60">
            <span className="text-sm font-normal text-palette-grey/80">Age</span>
            <span className="text-sm font-semibold text-palette-grey">{healthMetrics.age ? healthMetrics.age : ""}</span>
          </li>
          <li className="flex justify-between items-center px-5 py-3.5 border-b border-palette-thistle/60">
            <span className="text-sm font-normal text-palette-grey/80">Weight</span>
            <span className="text-sm font-semibold text-palette-grey">{healthMetrics.weight}</span>
          </li>
          <li className="flex justify-between items-center px-5 py-3.5 border-b border-palette-thistle/60">
            <span className="text-sm font-normal text-palette-grey/80">Height</span>
            <span className="text-sm font-semibold text-palette-grey">{healthMetrics.height}</span>
          </li>
          <li className="flex justify-between items-center px-5 py-3.5 border-b border-palette-thistle/60">
            <span className="text-sm font-normal text-palette-grey/80">Protein Goal</span>
            <span className="text-sm font-semibold text-palette-teal">{healthMetrics.protein}</span>
          </li>
          <li className="flex justify-between items-center px-5 py-3.5 border-b border-palette-thistle/60">
            <span className="text-sm font-normal text-palette-grey/80">Calorie Goal</span>
            <span className="text-sm font-semibold text-palette-teal">{healthMetrics.calorie}</span>
          </li>
          <li className="flex justify-between items-center px-5 py-3.5 border-b border-palette-thistle/60">
            <span className="text-sm font-normal text-palette-grey/80">Sugar Goal</span>
            <span className="text-sm font-semibold text-palette-teal">{healthMetrics.sugar}</span>
          </li>
          <li className="flex justify-between items-center px-5 py-3.5 border-b border-palette-thistle/60">
            <span className="text-sm font-normal text-palette-grey/80">Fat Goal</span>
            <span className="text-sm font-semibold text-palette-teal">{healthMetrics.fat}</span>
          </li>
          <li className="flex justify-between items-center px-5 py-3.5 border-b border-palette-thistle/60">
            <span className="text-sm font-normal text-palette-grey/80">Fiber Goal</span>
            <span className="text-sm font-semibold text-palette-teal">{healthMetrics.fiber}</span>
          </li>
          <li className="flex justify-between items-center px-5 py-3.5">
            <span className="text-sm font-normal text-palette-grey/80">Carbs Goal</span>
            <span className="text-sm font-semibold text-palette-teal">{healthMetrics.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;