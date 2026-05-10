import StatsBar from "./landing-section/StatsBar";

function LandingDashboard() {
  const stats = [
    { name: "Protein", value: 65, limit: 100 },
    { name: "Calories", value: 1400, limit: 2000 },
    { name: "Sugar", value: 30, limit: 50 },
  ];

  return (
    <div className="min-h-screen max-w-[600px] bg-white p-6 mx-auto">

      <div className="text-green-600 font-bold text-[1.5rem] mb-3">Had anything?</div>
      <div className="flex items-center justify-between bg-green-200/40 p-4 rounded-2xl mb-8">

        <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors">
          Update
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {stats.map((stat) => (
          <StatsBar key={crypto.randomUUID()} stat={stat}></StatsBar>
        ))}
      </div>
    </div>
  );
}

export default LandingDashboard;
