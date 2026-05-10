function StatsBar({ stat }) {
  const progress = (stat.value / stat.limit) * 100;

  return (
    <div
      key={stat.name}
      className="bg-white border border-palette-thistle/60 rounded-2xl p-5 shadow-sm hover:opacity-90 transition-all duration-150"
    >
      <p className="text-xs font-medium tracking-wide uppercase text-palette-grey/50">
        {stat.name}
      </p>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold tracking-tight text-palette-grey">
          {stat.value}
        </span>
        <span className="text-sm text-palette-grey/40">/ {stat.limit}</span>
      </div>
      <div className="mt-4 w-full bg-palette-thistle/40 rounded-full h-1.5">
        <div
          className="bg-palette-teal h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default StatsBar;