import { useNavigate } from "react-router-dom";


function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center px-6 text-center font-[var(--font-body)]">
            <div className="max-w-md w-full">
                <span className="inline-block font-[var(--font-body)] uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-earth)] bg-[#f3e9de] px-4 py-1.5 rounded-full mb-5">
                    Error 404
                </span>

                <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl font-semibold tracking-tight text-[var(--color-ink)] mb-4">
                    Page Not Found
                </h1>

                <p className="text-[var(--color-muted)] leading-7 text-base font-[var(--font-body)]">
                    The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-8 inline-flex items-center justify-center rounded-full border border-[var(--color-cream-border)] bg-transparent px-8 py-3.5 text-sm font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-sage-dim)] hover:bg-[var(--color-sage-muted)] transition-colors"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}

export default PageNotFound;