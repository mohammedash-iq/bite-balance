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
    const data = await response.json();
    if (data.type == "success") {
        return { success: true, message: data.message };
    }
    return { success: false, error: data.error };
}

async function handleImageScanMeal({ image }) {
    const response = await fetch("http://localhost:8090/api/meals/image-scan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify({ image: image }),
    });
    const data = await response.json();
    if (data.type == "success") {
        return { success: true, message: data.message };
    }
    return { success: false, error: data.error };
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