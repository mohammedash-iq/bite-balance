

async function fetchProfileHealthMetrics() {
    const response = await fetch("http://localhost:8090/api/users/get-health-metrics", {
        headers: {
            "Authorization": `${localStorage.getItem("token")}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data.content;
    }
};

async function fetchProfile() {
    const response = await fetch("http://localhost:8090/api/users/get-profile", {
        headers: {
            "Authorization": `${localStorage.getItem("token")}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data.content;
    }
};

async function fetchTodaysMeals() {

    const response = await fetch("http://localhost:8090/api/users/get-todays-meals", {
        headers: {
            "Authorization": `${localStorage.getItem("token")}`
        },
    })
    if (response.ok) {
        const data = await response.json()
        return data.content;
    }
}

async function fetchTodaysNutritions() {
    const response = await fetch("http://localhost:8090/api/users/get-todays-nutritions", {
        headers: {
            "Authorization": `${localStorage.getItem("token")}`
        },
    })
    if (response.ok) {
        const data = await response.json()
        return data.content;
    }
}

export { fetchProfile, fetchProfileHealthMetrics, fetchTodaysMeals, fetchTodaysNutritions };