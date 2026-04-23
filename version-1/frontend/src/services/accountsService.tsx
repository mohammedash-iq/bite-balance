async function loginApiCall({ email, password }) {
    const response = await fetch("http://localhost:5000/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "email": email, "password": password })
    });
    return response;
}
async function signupApiCall({ username, email, password }) {
    const response = await fetch("http://localhost:5000/authentication/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "username": username, "email": email, "password": password })
    });
    return response;
}


export { loginApiCall, signupApiCall }