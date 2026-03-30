import React from 'react';
import { FiActivity, FiDelete, FiHeart, FiSettings ,FiStar} from 'react-icons/fi';

const Profile = () => {
  const user = {
    name: "Alex River",
    streak: 12,
    health: [
      { label: "Weight", value: "68 kg", icon: <FiDelete className="w-5 h-5" /> },
      { label: "Daily Steps", value: "8,432", icon: <FiActivity className="w-5 h-5" /> },
    ]
  };

  return (
    <div className="min-h-screen p-6 max-w-[600px] mx-auto font-sans text-slate-800">
      <div className="flex justify-between items-center mb-8">
        <button className="p-2 hover:bg-green-200 rounded-full transition-colors">
          <FiSettings className="w-6 h-6 text-green-700" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-10">

          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            alt="Profile"
            className="w-32 h-32 rounded-[3rem] bg-green-200 border-4 border-white shadow-sm object-cover"
          />
        <h1 className="mt-6 text-3xl font-semibold text-green-900">{user.name}</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        <h2 className="text-sm font-bold text-green-800 uppercase tracking-widest ml-2 mb-1">
          Health Metrics
        </h2>
        
        {user.health.map((stat, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-5 bg-green-100 rounded-[2rem] border border-green-200"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-300 rounded-2xl text-green-700">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-green-700 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-green-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;