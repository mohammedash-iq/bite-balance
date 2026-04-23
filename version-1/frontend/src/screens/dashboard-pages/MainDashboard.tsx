import StatsBar from "../../components/StatsBar";

function MainDashboard() {
  const stats = [
    { name: "Protein", value: "65g", limit: "100g" },
    { name: "Calories", value: "1400", limit: "2000 kcal" },
    { name: "Sugar", value: "30g", limit: "50g" },
  ];

  return (
    <div className="min-h-screen max-w-[600px] bg-white p-6 mx-auto">
      <div className="flex items-center justify-between mb-8">
         <div className="flex gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            alt="Profile"
            className="w-12 h-12 rounded-full bg-green-200 border-4 border-white shadow-md object-cover"
          />
<h1 className="text-2xl mt-2 font-semibold text-green-900">Hello User!</h1>

         </div>
          
        <div className="bg-green-200 text-green-900 font-semibold px-4 py-2 border-4 border-white shadow-md rounded-xl ">
          Day-7 🔥
        </div>
      </div>
      <div className="text-green-600 font-bold text-[1.5rem] mb-3">Had anything?</div>
      <div className="flex items-center justify-between bg-green-200/40 p-4 rounded-2xl mb-8">
      
        <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors">
          Update
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {stats.map((stat) => (
         <StatsBar stat={stat}></StatsBar>
        ))}
      </div>
    </div>
  );
}

export default MainDashboard;
