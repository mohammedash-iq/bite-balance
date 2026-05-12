import { useEffect, useState } from "react";
import StatsBar from "./landing-section/StatsBar";
import { fetchTodaysNutritions, fetchProfileHealthMetrics } from "../../services/userService"

function LandingDashboard() {

  const [nutritionValues, setNutritionValues] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const todaysNutrition = await fetchTodaysNutritions();
      const userHealthMetrics = await fetchProfileHealthMetrics();
      const result = addvalues({ "consumption": todaysNutrition, "targets": userHealthMetrics })
      console.log(result)
      setNutritionValues(result)
    }
    fetchData();
  }, [])

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
        {nutritionValues && nutritionValues.map((item, index) => (
          <StatsBar key={index} nutrition={item.nutrient} consumed={Number(item.consumed)} target={Number(item.target)} />
        )) || <h2>Couldn't fethc data</h2>}
      </div>
    </div>
  );
}

function addvalues({ consumption, targets }) {
  const result = consumption.map(([nutrientName, consumedValue]) => ({
    nutrient: nutrientName,
    consumed: consumedValue,
    target: targets[nutrientName] ?? 0
  }));
  return result;
}

export default LandingDashboard;