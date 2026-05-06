function StatsBar({stat}) {
  return (
 <div
            key={stat.name}
            className="bg-white border border-green-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
          >
            <p className="text-gray-500 text-sm">{stat.name}</p>

            <div className="mt-2 flex items-end justify-between">
              <span className="text-2xl font-semibold text-green-600">
                {stat.value}
              </span>

              <span className="text-sm text-gray-400">/ {stat.limit}</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-2/3"></div>
            </div>
          </div>
  )
}

export default StatsBar