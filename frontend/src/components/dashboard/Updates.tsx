import { useEffect, useState } from "react";
import { fetchTodaysMeals } from "../../services/userService";

function Updates() {
  const [meals, setMeals] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const todaysMeals = await fetchTodaysMeals();
      setMeals(todaysMeals);
    };
    fetchdata();
  }, []);

  console.log(meals);

  return (
    <div className="apple-font min-h-screen px-5 py-8 max-w-[600px] mx-auto">
      <h2 className="text-2xl font-semibold tracking-tight text-palette-grey mb-6">
        Today's Meals
      </h2>

      <div className="flex gap-3 flex-col">
        <h4 className="text-xs font-medium tracking-wide uppercase text-palette-grey/50 mb-3">
          today's meals
        </h4>
        {meals && meals.map((meal, index) => {
          return (
            <div key={index} className="bg-palette-beige rounded-2xl px-5 py-4 shadow-sm">

              <div className="flex flex-col gap-2">
                <h6 className="text-base font-semibold text-palette-grey">{meal.food}</h6>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-palette-grey/70">{meal.portion}</span>
                  <span className="text-sm text-palette-grey/50">{meal.time_consumed}</span>
                  <span className="text-sm font-semibold text-palette-teal">{meal.calorie}</span>
                </div>
              </div>
            </div>
          );
        }) || (
            <div className="bg-palette-beige rounded-2xl px-5 py-10 flex flex-col items-center gap-2 shadow-sm">
              <p className="text-sm font-medium text-palette-grey/50">No meals logged today</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default Updates;