export const hangmanService = {
    initializeWordsToGuess
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
    // const words = [
    //     'apple',
    //     'cici',
    //     'kutya',
    //     'ciki vagy',
    //     'mosogatogep'
    // ]
    //
    // return words
}