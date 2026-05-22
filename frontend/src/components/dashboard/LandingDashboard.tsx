import { useEffect, useState } from "react";
import { FiCamera, FiMenu } from "react-icons/fi";
import { fetchTodaysNutritions, fetchProfileHealthMetrics } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function LandingDashboard() {
  const navigate = useNavigate();
  const [nutritionValues, setNutritionValues] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const todaysNutrition = await fetchTodaysNutritions();
      const userHealthMetrics = await fetchProfileHealthMetrics();
      const result = addvalues({ consumption: todaysNutrition, targets: userHealthMetrics });
      console.log(result);
      setNutritionValues(result);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-8 font-[var(--font-body)] text-[var(--color-ink)]">
      <div className="mb-8 rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-6 sm:p-8">
        <h1 className="mb-6 font-[var(--font-display)] text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
          Had anything?
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/dashboard/scan")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--color-cream-border)] bg-transparent px-6 py-3.5 text-sm font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-sage-dim)] hover:bg-[var(--color-sage-muted)] transition-colors"
          >
            <FiMenu className="text-lg" /> Update Manually
          </button>
          <button
            onClick={() => navigate("/dashboard/scan")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-sage)] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-sage-light)] transition-colors"
          >
            <FiCamera className="text-lg" /> Click Meal
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">Today's Progress</h2>
        </div>

        {nutritionValues ? (
          nutritionValues.map((item, index) => (
            <StatsBar
              key={index}
              nutrition={item.nutrient}
              consumed={Number(item.consumed)}
              target={Number(item.target)}
            />
          ))
        ) : (
          <div className="py-10 text-center">
            <h2 className="text-[var(--color-muted)] text-sm">Couldn't fetch data</h2>
          </div>
        )}
      </div>
    </div>
  );
}

function addvalues({ consumption, targets }) {
  const result = consumption.map(([nutrientName, consumedValue]) => ({
    nutrient: nutrientName,
    consumed: consumedValue,
    target: targets[nutrientName] ?? 0,
  }));
  return result;
}

// Function used to show progress bar in the page
function StatsBar({ consumed, nutrition, target }) {
  const progress = ((consumed / target) * 100) < 100 ? (consumed / target) * 100 : 100;

  return (
    <div className="rounded-2xl border border-[var(--color-cream-border)] bg-[var(--color-cream)] p-5 hover:border-[var(--color-sage-dim)] transition-colors">
      <div className="flex items-start justify-between mb-1">
        <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)]">
          {nutrition}
        </p>
        {/* Status Badges */}
        {consumed === target && (
          <span className="bg-[#f3e9de] text-[var(--color-earth)] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            Limit Reached
          </span>
        )}
        {consumed > target && (
          <span className="bg-[#f3e9de] text-[var(--color-earth)] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            Over Limit
          </span>
        )}
      </div>

      <div className="mt-1 flex items-baseline justify-between">
        <div>
          <span className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
            {consumed}
          </span>
          <span className="ml-1 text-sm font-medium text-[var(--color-muted)]">
            / {target}
          </span>
        </div>
      </div>

      <div className="mt-4 w-full h-2 overflow-hidden rounded-full bg-[var(--color-cream-border)]">
        <div
          className={`h-full rounded-full ${consumed > target ? "bg-[var(--color-earth)]" : "bg-[var(--color-sage)]"
            }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default LandingDashboard;