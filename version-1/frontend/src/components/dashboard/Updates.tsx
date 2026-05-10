import { useEffect, useState } from "react";
import { fetchTodaysMeals } from "../../services/userService"
function Updates() {

  const [meals, setMeals] = useState(null)
  useEffect(() => {
    const fetchdata = async () => {
      const todaysMeals = await fetchTodaysMeals();
      setMeals(todaysMeals)
    }
    fetchdata()
  }, [])
  console.log(meals)
  return (

    <div className="flex gap-2 flex-col">
      {meals && meals.map((meal, index) => {
        return (
          <div>
            <h6 >{meal.food}</h6>
            <p>{meal.portion}</p>
            <p>{meal.time_consumed}</p>
            <p>{meal.calorie}</p>
          </div>
        )
      }) || <p>no food found</p>}
    </div>
  )
}

export default Updates