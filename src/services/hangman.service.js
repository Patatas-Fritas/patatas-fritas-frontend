export const hangmanService = {
    initializeWordsToGuess,
    saveHangman
};

async function initializeWordsToGuess(gameId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/hangman/get_words?id=${gameId}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'patatas-fritas-token': token
        }
    })
    return await response.json()
}


async function saveHangman(hangmanObj) {
    const token = localStorage.getItem('token');
    console.log(hangmanObj)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/hangman/save_word`, {
        method: 'POST',
        body: JSON.stringify(hangmanObj),
        headers: {
            'Content-Type': 'application/json',
            'patatas-fritas-token': token
        }
    });

    return await response.json()
}