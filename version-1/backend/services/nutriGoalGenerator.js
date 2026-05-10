

function generateNutriGoals({ age, height, weight, gender, activity }) {
    const goals = { bmr: 0, tdee: 0, protein: 0, fat: 0, carbs: 0, sugar: 0, fiber: 0 }

    const activityLevel = { "sedentary": 1.2, "lighty-active": 1.375, "moderately-active": 1.55, "very-active": 1.725, "extra-active": 1.9 };

    if (activity === "sedentary" || activity === "lightly-active") {
        goals.protein = 0.8 * weight;
    } else if (activity === "moderately-active" || activity === "very-active") {
        goals.protein = 1.6 * weight;
    } else {
        goals.protein = 1.9 * weight;
    }

    if (gender === "male") {
        goals.bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        goals.bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    goals.tdee = goals.bmr * activityLevel[activity];
    goals.fat = (goals.tdee * 0.275) / 9;
    goals.carbs = (goals.tdee - (goals.protein * 4) - (goals.fat * 9)) / 4;
    goals.sugar = (goals.tdee * 0.10) / 4;
    goals.fiber = (goals.tdee / 1000) * 14;
    return goals;
}

export default generateNutriGoals;