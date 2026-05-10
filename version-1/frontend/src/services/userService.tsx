

async function fetchProfileHealthMetrics() {
    const response = await fetch("http://localhost:8090/api/users/get-health-metrics", {
        headers: {
            "Authorization": `${localStorage.getItem("token")}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data;
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
        return data;
    }
};

export { fetchProfile, fetchProfileHealthMetrics };