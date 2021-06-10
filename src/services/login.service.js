export const loginService = {
    login
}

async function login(loginObj) {
console.log(loginObj)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(loginObj)});

    return await response.json()
}
