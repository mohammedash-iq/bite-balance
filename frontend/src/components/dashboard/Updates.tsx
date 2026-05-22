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

  return (
    <div className="mx-auto max-w-2xl px-6 py-8 font-[var(--font-body)] text-[var(--color-ink)]">
      <h2 className="mb-8 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
        Today's Meals
      </h2>

      <div className="flex flex-col gap-4">
        {meals && meals.length > 0 ? (
          meals.map((meal, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-5 transition-transform"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h6 className="text-base font-semibold text-[var(--color-ink)] mb-1">
                    {meal.food}
                  </h6>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-2 py-1 bg-[var(--color-cream)] rounded-md text-[var(--color-muted)]">
                      {meal.portion}
                    </span>
                    <span className="text-xs font-medium text-[var(--color-muted)]">
                      {meal.time_consumed}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-[var(--color-sage)]">
                    {meal.calorie} kcal
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[var(--color-cream-border)] bg-[var(--color-cream)] p-10 text-center">
            <p className="text-sm text-[var(--color-muted)]">
              No meals logged for today yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Updates;