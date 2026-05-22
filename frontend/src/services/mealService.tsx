const token = localStorage.getItem("token");

async function handleManualMealScan({ meal, portion }) {
    const response = await fetch("http://localhost:8090/api/meals/manual-scan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify({ meal, portion }),
    });
    if (!response.ok) {
        console.error("Failed to submit meal scan:", response.status, response.statusText);
        return { success: false, message: "Failed to submit meal scan" };
    }
    return { success: true, message: "Meal scan submitted successfully" };
}

async function handleImageScanMeal({ image }) {
    console.log("this is in hanle ", image)
    const response = await fetch("http://localhost:8090/api/meals/image-scan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify({ image: image }),
    });
    if (!response.ok) {
        console.error("Failed to submit meal scan:", response.status, response.statusText);
        return { success: false, message: "Failed to submit meal scan" };
    }
    const data = response.json;
    return data;
}

async function fetchOptions(query) {
    const response = await fetch("http://localhost:8090/api/meals/food-options",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify({ query }),
        }
    )
    if (!response.ok) {
        console.error("Failed to fetch options:", response.status, response.statusText);
        return [];
    }
    const data = await response.json();
    return data.foodOptions || [];
}

export { handleManualMealScan, fetchOptions, handleImageScanMeal };