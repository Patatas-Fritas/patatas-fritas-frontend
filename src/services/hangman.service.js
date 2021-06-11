export const hangmanService = {
    initializeWordsToGuess
};

async function initializeWordsToGuess(gameId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/hangman/get_words?id=${gameId}`)

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