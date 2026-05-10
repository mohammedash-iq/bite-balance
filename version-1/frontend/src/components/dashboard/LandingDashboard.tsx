import StatsBar from "./landing-section/StatsBar";

function LandingDashboard() {
  const stats = [
    { name: "Protein", value: 65, limit: 100 },
    { name: "Calories", value: 1400, limit: 2000 },
    { name: "Sugar", value: 30, limit: 50 },
  ];

  return (
    <div className="apple-font min-h-screen max-w-[600px] bg-palette-beige px-5 py-8 mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight text-palette-grey mb-6">
        Had anything?
      </h1>

      <div className="flex items-center justify-between bg-white border border-palette-thistle/60 px-5 py-4 rounded-2xl mb-8 shadow-sm">
        <button className="bg-palette-raspberry text-white font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-all duration-150 hover:opacity-90">
          Update
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {stats.map((stat) => (
          <StatsBar key={crypto.randomUUID()} stat={stat} />
        ))}
      </div>
    </div>
  );
}

export default LandingDashboard;