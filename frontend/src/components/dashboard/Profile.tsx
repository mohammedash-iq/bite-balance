import { useEffect, useState } from "react";
import { fetchProfile, fetchProfileHealthMetrics } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({});
  const [healthMetrics, setHealthMetrics] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const userData = await fetchProfile();
      const userHealthMetrics = await fetchProfileHealthMetrics();
      setUser(userData);
      setHealthMetrics(userHealthMetrics);
    };
    loadProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8 font-[var(--font-body)] text-[var(--color-ink)]">

      {/* ── Profile Header ── */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={user ? user.image_url : "https://api.dicebear.com/9.x/thumbs/svg?seed=Sophie"}
          alt="Profile"
          className="w-28 h-28 rounded-full bg-[var(--color-cream-dark)] border-4 border-[var(--color-cream-border)] shadow-sm object-cover"
        />
        <h1 className="mt-4 font-[var(--font-display)] text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
          {user ? user.username : "Username"}
        </h1>
        <h3 className="mt-1 text-sm font-medium text-[var(--color-muted)]">
          {user ? user.email : "Email"}
        </h3>
      </div>

      {/* ── Health Metrics ── */}
      <div className="mx-auto max-w-md">
        <div className="mb-4 text-center sm:text-left">
          <span className="inline-block font-[var(--font-body)] uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-sage)] bg-[var(--color-sage-muted)] px-4 py-1.5 rounded-full">
            Health Metrics
          </span>
        </div>

        <ul className="rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] overflow-hidden divide-y divide-[var(--color-cream-border)] shadow-sm">
          <li className="flex justify-between items-center px-6 py-4 bg-[var(--color-cream)]">
            <span className="text-sm font-medium text-[var(--color-ink-soft)]">Age</span>
            <span className="text-sm font-semibold text-[var(--color-ink)]">{healthMetrics.age ? healthMetrics.age : ""}</span>
          </li>
          <li className="flex justify-between items-center px-6 py-4 bg-[var(--color-cream)]">
            <span className="text-sm font-medium text-[var(--color-ink-soft)]">Weight</span>
            <span className="text-sm font-semibold text-[var(--color-ink)]">{healthMetrics.weight}</span>
          </li>
          <li className="flex justify-between items-center px-6 py-4 bg-[var(--color-cream)]">
            <span className="text-sm font-medium text-[var(--color-ink-soft)]">Height</span>
            <span className="text-sm font-semibold text-[var(--color-ink)]">{healthMetrics.height}</span>
          </li>
          <li className="flex justify-between items-center px-6 py-4 bg-[var(--color-cream)]">
            <span className="text-sm font-medium text-[var(--color-ink-soft)]">Protein Goal</span>
            <span className="text-sm font-bold text-[var(--color-sage)]">{healthMetrics.protein}</span>
          </li>
          <li className="flex justify-between items-center px-6 py-4 bg-[var(--color-cream)]">
            <span className="text-sm font-medium text-[var(--color-ink-soft)]">Calorie Goal</span>
            <span className="text-sm font-bold text-[var(--color-sage)]">{healthMetrics.calorie}</span>
          </li>
          <li className="flex justify-between items-center px-6 py-4 bg-[var(--color-cream)]">
            <span className="text-sm font-medium text-[var(--color-ink-soft)]">Sugar Goal</span>
            <span className="text-sm font-bold text-[var(--color-sage)]">{healthMetrics.sugar}</span>
          </li>
          <li className="flex justify-between items-center px-6 py-4 bg-[var(--color-cream)]">
            <span className="text-sm font-medium text-[var(--color-ink-soft)]">Fat Goal</span>
            <span className="text-sm font-bold text-[var(--color-sage)]">{healthMetrics.fat}</span>
          </li>
          <li className="flex justify-between items-center px-6 py-4 bg-[var(--color-cream)]">
            <span className="text-sm font-medium text-[var(--color-ink-soft)]">Fiber Goal</span>
            <span className="text-sm font-bold text-[var(--color-sage)]">{healthMetrics.fiber}</span>
          </li>
          <li className="flex justify-between items-center px-6 py-4 bg-[var(--color-cream)]">
            <span className="text-sm font-medium text-[var(--color-ink-soft)]">Carbs Goal</span>
            <span className="text-sm font-bold text-[var(--color-sage)]">{healthMetrics.carbohydrates}</span>
          </li>
        </ul>

        {/* ── Logout Button ── */}
        <button
          onClick={handleLogout}
          className="mt-8 w-full flex items-center justify-center rounded-full border border-[#d6c2b1] bg-[#f3e9de] px-6 py-3.5 text-sm font-semibold text-[var(--color-earth)] hover:bg-[#eaddcd] hover:border-[var(--color-earth-light)] transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;