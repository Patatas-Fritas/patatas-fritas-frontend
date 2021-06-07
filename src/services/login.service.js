export const loginService = {
    login
}

async function login(loginObj) {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        body: loginObj});

    return await response.json()
}