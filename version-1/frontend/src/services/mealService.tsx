const token = localStorage.getItem("token");


async function handleManualMealScan({ meal, portion }) {
    try {
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
            return null;
        }
        const responseData = await response.json();
        console.log("Meal scan submitted successfully:", responseData);
        return responseData;
    } catch (err) {
        console.error("Error submitting meal scan:", err);
        return null;
    }
}


async function fetchOptions(query) {

    try {
        const response = await fetch("http://localhost:8090/api/meals/food-options",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("token")}`
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
    } catch (err) {
        console.error(err);
        return [];
    }
}

export { handleManualMealScan, fetchOptions };