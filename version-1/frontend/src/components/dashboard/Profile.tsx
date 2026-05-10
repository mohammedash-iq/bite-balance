import { useEffect, useState } from "react";
import { fetchProfile, fetchProfileHealthMetrics } from "../../services/userService";

function Profile() {
  const [user, setUser] = useState({});
  const [healthMetrics, setHealthMetrics] = useState({});
  useEffect(() => {

    const loadProfile = async () => {
      const userData = await fetchProfile();
      const userHealthMetrics = await fetchProfileHealthMetrics();
      console.log("Fetched user profile:", userData);
      console.log("Fetched user health metrics:", userHealthMetrics);
      setUser(userData.content);
      setHealthMetrics(userHealthMetrics.content);
    };
    loadProfile();
  }, []);

  return (

    <div className="min-h-screen p-6 mb-10 max-w-[600px] mx-auto font-sans text-slate-800">

      <div className="flex flex-col items-center ">

        <img
          src={user ? user.image_url : "https://api.dicebear.com/9.x/thumbs/svg?seed=Sophie"}
          alt="Profile"
          className="w-32 h-32 rounded-[3rem] bg-green-200 border-4 border-white shadow-sm object-cover"
        />
        <h1 className="mt-6 text-3xl font-semibold text-green-900">{user ? user.username : "Username"}</h1>
        <h3 className="text-lg text-slate-600">{user ? user.email : "Email"}</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        <h2 className="text-sm font-bold text-green-800 uppercase tracking-widest ml-2 mb-1">
          Health Metrics
        </h2>
        <ul>
          <li className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-green-700">Age</span>
            <span className="text-sm font-semibold text-green-900">{healthMetrics.age}</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-green-700">Weight</span>
            <span className="text-sm font-semibold text-green-900">{healthMetrics.weight}</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-green-700">Height</span>
            <span className="text-sm font-semibold text-green-900">{healthMetrics.height}</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-green-700">Daily Protein Goal</span>
            <span className="text-sm font-semibold text-green-900">{healthMetrics.dailyProteinGoal}</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-green-700">Daily Calorie Goal</span>
            <span className="text-sm font-semibold text-green-900">{healthMetrics.calorie_goal}</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-green-700">Daily Sugar Goal</span>
            <span className="text-sm font-semibold text-green-900">{healthMetrics.sugar_goal}</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-green-700">Daily Fat Goal</span>
            <span className="text-sm font-semibold text-green-900">{healthMetrics.fat_goal}</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-green-700">Daily Fiber Goal</span>
            <span className="text-sm font-semibold text-green-900">{healthMetrics.fiber_goal}</span>
          </li>
          <li className="flex justify-between items-center bg-green-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-green-700">Daily Water Goal</span>
            <span className="text-sm font-semibold text-green-900">{healthMetrics.water_goal}</span>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default Profile;