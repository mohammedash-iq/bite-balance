import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard/profile");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-ink)]">
      <Navbar />
      <main className="px-6 py-16 lg:py-24">

        {/* ── Hero ── */}
        <section className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-block font-[var(--font-body)] uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-sage)] bg-[var(--color-sage-muted)] px-4 py-1.5 rounded-full mb-6">
                Nutrition intelligence for every meal
              </span>
              <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.08] tracking-tight text-[var(--color-ink)]">
                Bite<br />Balance
              </h1>
              <h3 className="mt-4 text-xl sm:text-2xl leading-snug text-[var(--color-ink-soft)] font-[var(--font-body)] font-light max-w-lg">
                Track meals, auto-generate nutrition goals, and stay on target every day.
              </h3>
              <p className="mt-6 max-w-xl text-[var(--color-muted)] text-base leading-7 font-[var(--font-body)]">
                Enter your health metrics once, then log meals with smart manual search or AI-powered image scanning. Bite Balance turns your daily food intake into actionable nutrition data so you can build better eating habits.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => navigate("/signin")}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-sage)] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-sage-light)] transition-colors"
                >
                  Create account
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-cream-border)] bg-transparent px-8 py-3.5 text-sm font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-sage-dim)] hover:bg-[var(--color-sage-muted)] transition-colors"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Feature cards */}
            <div className="rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-7 space-y-4">
              {[
                {
                  title: "Fast setup",
                  body: "Add your profile details and health goals during sign-up, then use the app immediately with no extra configuration.",
                },
                {
                  title: "Meal capture",
                  body: "Log meals manually with search, or snap a photo and let AI estimate nutrition from your plate.",
                },
                {
                  title: "Goal progress",
                  body: "Track calories and macros in real time with progress bars, daily meal history, and target completion feedback.",
                },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-[var(--color-cream)] border border-[var(--color-cream-border)] p-5"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-sage)]" />
                    <h2 className="font-[var(--font-display)] text-base font-semibold text-[var(--color-ink)]">{title}</h2>
                  </div>
                  <p className="text-[var(--color-muted)] text-sm leading-6 font-[var(--font-body)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mx-auto mt-20 max-w-6xl border-t border-[var(--color-cream-border)]" />

        {/* ── About ── */}
        <section id="about" className="mx-auto mt-20 max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-block uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-earth)] bg-[#f3e9de] px-4 py-1.5 rounded-full mb-5">
                About Bite Balance
              </span>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-[var(--color-ink)]">
                A health-first food logging platform built to make nutrition tracking easier.
              </h2>
              <p className="mt-5 text-[var(--color-muted)] leading-7 text-base font-[var(--font-body)]">
                Bite Balance is designed for anyone who wants to understand their daily eating habits. The app combines user health inputs, food database search, and AI-powered meal scanning into a single experience so logging food becomes quick and useful.
              </p>
            </div>

            <div className="rounded-[var(--radius-card)] border border-[var(--color-cream-border)] overflow-hidden divide-y divide-[var(--color-cream-border)]">
              {[
                {
                  title: "Personalized nutrition goals",
                  body: "The app calculates calorie, protein, carbs, fat, sugar, and fiber targets from your age, height, weight, gender, and activity level.",
                },
                {
                  title: "Smart meal logging",
                  body: "Choose meals from the imported database or scan a plate photo to add food automatically and keep your diet record updated.",
                },
                {
                  title: "Real-time results",
                  body: "Review your daily totals on the dashboard and quickly see what you've eaten, what remains, and where you can improve.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-[var(--color-cream-dark)] p-6">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
                  <p className="mt-2 text-[var(--color-muted)] text-sm leading-6 font-[var(--font-body)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mx-auto mt-20 max-w-6xl border-t border-[var(--color-cream-border)]" />

        {/* ── Features Grid ── */}
        <section className="mx-auto mt-20 max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-sage)] bg-[var(--color-sage-muted)] px-4 py-1.5 rounded-full mb-4">
              Features
            </span>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
              Everything you need to track meals and nutrition
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-muted)] leading-7 text-base font-[var(--font-body)]">
              Bite Balance wraps the backend and frontend into a single app that supports secure user profiles, database search, AI image recognition, and daily nutrient tracking.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Secure auth", body: "Register and login flows are backed by JWT tokens so only authenticated users can access profile and meal data.", accent: "sage" },
              { title: "Goal generation", body: "Nutrition goals are created automatically using BMR and TDEE formulas, then distributed across macros and fiber targets.", accent: "earth" },
              { title: "Food search", body: "Search the food database for common ingredients and log meals with accurate nutrition from the stored dataset.", accent: "sage" },
              { title: "AI scan", body: "Send camera images to Google Gemini AI to detect food items and estimate nutrient values automatically.", accent: "earth" },
              { title: "Daily insights", body: "Compare today's meals against your goals in a simple dashboard with consumption bars and meal history.", accent: "sage" },
              { title: "Profile overview", body: "View your username, email, avatar, and personalized health metrics in one place.", accent: "earth" },
            ].map(({ title, body, accent }) => (
              <article
                key={title}
                className="rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-6 hover:border-[var(--color-sage-dim)] transition-colors"
              >
                <div
                  className="w-7 h-7 rounded-xl mb-4"
                  style={{ backgroundColor: accent === "sage" ? "var(--color-sage-muted)" : "#f3e9de" }}
                >
                  <div
                    className="w-3 h-3 rounded-full mx-auto mt-2"
                    style={{ backgroundColor: accent === "sage" ? "var(--color-sage)" : "var(--color-earth)" }}
                  />
                </div>
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
                <p className="mt-2 text-[var(--color-muted)] text-sm leading-6 font-[var(--font-body)]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mx-auto mt-20 max-w-6xl border-t border-[var(--color-cream-border)]" />

        {/* ── How it works / Why / Daily use ── */}
        <section className="mx-auto mt-20 max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-7">
              <span className="inline-block uppercase tracking-[0.25em] text-[10px] font-semibold text-[var(--color-sage)] mb-3">Step by step</span>
              <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)] mb-4">How it works</h3>
              <ol className="space-y-3 text-[var(--color-muted)] text-sm leading-6 font-[var(--font-body)]">
                {[
                  "Sign up with your email, password, and health metrics.",
                  "Automatically generate daily nutrition goals based on TDEE and macros.",
                  "Log meals manually or with the camera scan feature.",
                  "View today's intake and compare it with your nutrition targets.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-sage-muted)] text-[var(--color-sage)] text-[11px] font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-7">
              <span className="inline-block uppercase tracking-[0.25em] text-[10px] font-semibold text-[var(--color-earth)] mb-3">Advantages</span>
              <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)] mb-4">Why choose Bite Balance?</h3>
              <ul className="space-y-3 text-[var(--color-muted)] text-sm leading-6 font-[var(--font-body)]">
                {[
                  "Simple, focused meal logging without unnecessary complexity.",
                  "AI-powered image scanning for faster entry.",
                  "Goal-based tracking that adapts to your personal stats.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-earth)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-card)] border border-[var(--color-sage-dim)] bg-[var(--color-sage-muted)] p-7">
              <span className="inline-block uppercase tracking-[0.25em] text-[10px] font-semibold text-[var(--color-sage)] mb-3">Daily companion</span>
              <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)] mb-4">Built for daily use</h3>
              <p className="text-[var(--color-ink-soft)] text-sm leading-6 font-[var(--font-body)]">
                Designed as an everyday nutrition companion, Bite Balance helps users stay consistent with meal tracking and see meaningful progress over time.
              </p>
            </div>
          </div>
        </section>

        {/* ── Detail section ── */}
        <section id="features" className="mx-auto mt-20 max-w-6xl">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] p-8 lg:p-10">
            <div className="mb-8 text-center">
              <span className="inline-block uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-sage)] bg-[var(--color-sage-muted)] px-4 py-1.5 rounded-full mb-3">
                More detail
              </span>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
                What you can do with Bite Balance
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Track exact macro targets", body: "Monitor calories, protein, carbs, fat, sugar, and fiber with each meal. The dashboard shows how close you are to your daily goals, and highlights when you have exceeded a limit." },
                { title: "Use camera-based meal entry", body: "Capture a photo, then let the AI analyze the food content. The backend stores meal details and nutrition values without the need to type every ingredient." },
                { title: "Keep a daily meal list", body: "Every meal is saved with a timestamp and portion size. Review today's meals in the Updates page to understand your eating pattern." },
                { title: "View your personal profile", body: "Your profile area shows your account details, avatar, and health metrics so you always know the foundation behind your nutrition goals." },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-2xl border border-[var(--color-cream-border)] bg-[var(--color-cream)] p-6">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
                  <p className="mt-2 text-[var(--color-muted)] text-sm leading-6 font-[var(--font-body)]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mx-auto mt-20 max-w-6xl pb-16">
          <div className="rounded-[var(--radius-card)] bg-[var(--color-sage)] p-10 text-center">
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Ready to keep your nutrition balanced?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--color-sage-dim)] leading-7 text-base font-[var(--font-body)]">
              Sign up with Bite Balance today to simplify meal logging, monitor your intake, and build healthier habits with a modern nutrition dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
              <button
                onClick={() => navigate("/signin")}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[var(--color-sage)] hover:bg-[var(--color-cream)] transition-colors"
              >
                Start tracking
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                View login
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="border-t border-[var(--color-cream-border)] bg-[var(--color-cream-dark)] py-8 text-center text-sm text-[var(--color-muted)] font-[var(--font-body)]"
      >
        © {new Date().getFullYear()} Bite Balance. Built to help you track food, nutrition goals, and healthier habits.
        {" · "}
        <a href="mailto:mohammedaash@proton.me" className="text-[var(--color-sage)] hover:underline">
          mohammedaash@proton.me
        </a>
      </footer>
    </div>
  );
}

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 bg-[var(--color-cream)]/90 backdrop-blur-sm border-b border-[var(--color-cream-border)]">
      <div className="mx-auto max-w-6xl">
        <header className="flex justify-between items-center px-6 py-4">
          <h1
            className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-[var(--color-ink)] hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            NutriTrack
          </h1>
          <nav className="flex items-center gap-1">
            {[
              { label: "Features", href: "#features" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-4 py-2 rounded-full text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-cream-dark)] transition-colors font-[var(--font-body)]"
              >
                {label}
              </a>
            ))}
          </nav>
        </header>
      </div>
    </div>
  );
}

export default LandingPage;