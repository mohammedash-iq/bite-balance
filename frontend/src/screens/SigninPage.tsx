import { useNavigate } from "react-router-dom";
import { signinApiCall } from "../services/accountsService";
import { useState } from "react";
import { toast } from "react-hot-toast";

function SigninPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    height: "",
    weight: "",
    gender: "male",
    activity: "sedentary",
  });

  async function handleSigninSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", { duration: 1000 });
      return;
    }
    const response = await signinApiCall({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      gender: formData.gender,
      activity: formData.activity,
    });
    const responseBody = await response.json();
    if (response.ok) {
      localStorage.setItem("token", responseBody.accesstoken);
      navigate("/dashboard/profile");
    } else {
      toast.error(responseBody.error, { duration: 1000 });
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-ink)] flex items-center justify-center px-6 py-12 font-[var(--font-body)]">
      <div className="w-full max-w-lg rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-8 sm:p-10">
        <div className="text-center mb-10">
          <span className="inline-block font-[var(--font-body)] uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-sage)] bg-[var(--color-sage-muted)] px-4 py-1.5 rounded-full mb-4">
            Join Bite Balance
          </span>
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
            Create account
          </h1>
        </div>

        <form className="space-y-5" onSubmit={(e) => { handleSigninSubmit(e); }}>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => { setFormData({ ...formData, username: e.target.value }); }}
              placeholder="John Doe"
              className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }); }}
              placeholder="you@example.com"
              className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => { setFormData({ ...formData, password: e.target.value }); }}
                placeholder="••••••••"
                className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }); }}
                placeholder="••••••••"
                className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
              />
            </div>
          </div>

          <div className="border-t border-[var(--color-cream-border)] my-6 pt-6">
            <h3 className="text-sm font-semibold text-[var(--color-ink)] mb-4 uppercase tracking-wider">Health Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">Age</label>
                <input
                  value={formData.age}
                  onChange={(e) => { setFormData({ ...formData, age: e.target.value }); }}
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Yrs"
                  required
                  className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">Height</label>
                <input
                  value={formData.height}
                  onChange={(e) => { setFormData({ ...formData, height: e.target.value }); }}
                  type="number"
                  name="height"
                  id="height"
                  placeholder="cm"
                  required
                  className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">Weight</label>
                <input
                  value={formData.weight}
                  onChange={(e) => { setFormData({ ...formData, weight: e.target.value }); }}
                  type="number"
                  name="weight"
                  id="weight"
                  placeholder="kg"
                  required
                  className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="gender" className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">Gender</label>
                <select
                  onChange={(e) => { setFormData({ ...formData, gender: e.target.value }); }}
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] appearance-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="activity" className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">Activity Level</label>
                <select
                  onChange={(e) => { setFormData({ ...formData, activity: e.target.value }); }}
                  name="activity"
                  id="activity"
                  value={formData.activity}
                  className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] appearance-none"
                >
                  <option value="sedentary">Sedentary (Lazy)</option>
                  <option value="lightly-active">Lightly Active</option>
                  <option value="moderately-active">Moderately Active</option>
                  <option value="very-active">Very Active</option>
                  <option value="extra-active">Extra Active</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full inline-flex items-center justify-center rounded-full bg-[var(--color-sage)] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-sage-light)] transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-[var(--color-muted)] text-sm">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-[var(--color-sage)] hover:text-[var(--color-sage-light)] hover:underline"
            onClick={() => { navigate("/login"); }}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default SigninPage;