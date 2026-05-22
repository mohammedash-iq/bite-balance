function StatsBar({ consumed, nutrition, target }) {
  const progress = ((consumed / target) * 100) < 100 ? (consumed / target) * 100 : 100;

  return (
    <div
      className="bg-white border border-palette-thistle/60 rounded-2xl p-5 shadow-sm hover:opacity-90 transition-all duration-150"
    >
      <p className="text-xs font-medium tracking-wide uppercase text-palette-grey/50">
        {nutrition}
      </p>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold tracking-tight text-palette-grey">
          {consumed}
        </span>
        {consumed == target ? <p className="text-red-400">Reached your limit </p> : ""}
        {consumed > target ? <p className="text-red-400">Your passed your limit</p> : ""}
        <span className="text-sm text-palette-grey/40">/ {target}</span>
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