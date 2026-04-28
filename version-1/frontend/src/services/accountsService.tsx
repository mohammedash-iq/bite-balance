async function loginApiCall({ email, password }) {
    const response = await fetch("http://localhost:8090/authenticate/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "email": email, "password": password })
    });
    return response;
}
async function signinApiCall({ username, email, password }) {
    const response = await fetch("http://localhost:8090/authenticate/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "username": username, "email": email, "password": password })
    });
    return response;
}


export { loginApiCall, signinApiCall }