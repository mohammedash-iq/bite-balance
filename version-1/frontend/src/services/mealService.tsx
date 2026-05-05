async function handleManualMealScan({ meal, portion }) {
    console.log(meal, portion);
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8090/api/meals/manual-scan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify({ meal, portion }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting meal scan:", errorData);
    }
    else {
        const responseData = await response.json();
        console.log("Meal scan submitted successfully:", responseData);
    }
}


export { handleManualMealScan };