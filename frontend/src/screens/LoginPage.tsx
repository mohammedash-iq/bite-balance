import { useNavigate } from "react-router-dom";
import { loginApiCall } from "../services/accountsService";
import { useState } from "react";
import { toast } from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  async function handleLoginSubmit(e) {
    e.preventDefault();
    const response = await loginApiCall({ email: formData.email, password: formData.password });
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
      <div className="w-full max-w-md rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-8 sm:p-10">
        <div className="mb-10 text-center">
          <span className="inline-block font-[var(--font-body)] uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-sage)] bg-[var(--color-sage-muted)] px-4 py-1.5 rounded-full mb-4">
            Welcome Back
          </span>
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
            Login
          </h1>
        </div>

        <form className="space-y-6" onSubmit={(e) => { handleLoginSubmit(e) }}>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
              placeholder="you@example.com"
              className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-ink-soft)] mb-2">
              Password
            </label>
            <input
              value={formData.password}
              type="password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-[var(--color-cream)] border border-[var(--color-cream-border)] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-sage)] focus:ring-1 focus:ring-[var(--color-sage)] text-[var(--color-ink)] placeholder-[var(--color-muted-light)]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full inline-flex items-center justify-center rounded-full bg-[var(--color-sage)] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-sage-light)] transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="mt-8 text-center text-[var(--color-muted)] text-sm">
          Don’t have an account?{" "}
          <button
            type="button"
            className="font-semibold text-[var(--color-sage)] hover:text-[var(--color-sage-light)] hover:underline"
            onClick={() => { navigate("/signin"); }}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;