import { hangmanConstant } from "../constants";

const initialState = {
    progress: null,
    words: [],
    wrongGuessCounter: 0,
    gameState: null
}

export const hangmanReducer = (state = initialState, action) => {
    switch (action.type) {
        case hangmanConstant.HANGMAN_INITIALIZE_SUCCESS:
            return {...state,
                words: action.payload.words,
                progress: action.payload.words[0].split('').map(_ => '_').join('')
            }
        case hangmanConstant.GUESS_CHARACTER:
            return checkCharacter(state, action.payload.character)
        case hangmanConstant.HANGMAN_NEXT_WORD:
            return nextWord(state)
        // {
                // progress: action.payload.words[0].split('').map(_ => '_').join(''),
                // words: state.words.shift(),
                // wrongGuessCounter: 0,
                // gameState: null
            // }
    }

    return state

}

const checkCharacter = (state, character) => {
    if (state.gameState) {
        return state
    }
    const newState = {...state}
    const word = state.words[0]
    console.log(word)
    let isSuccessfulGuess = false
    newState.progress = state.progress.split('').map((c, index) =>{
        if (word.charAt(index) === character){
            isSuccessfulGuess = true
            return character
        }

        return c
    }).join('')

    if (!isSuccessfulGuess) {
        newState.wrongGuessCounter++
    }


    if (newState.wrongGuessCounter === 5){
        newState.gameState = 'lose'
    }

    if (newState.progress.indexOf('_') === -1) {
        newState.gameState = 'win'
    }

    return newState
}

const nextWord = (state) => {
    console.log(state.words)
    const newState = {...state}
    state.words.shift()
    newState.words = state.words
    newState.progress = state.words[0].split('').map(_ => '_').join('')
    newState.wrongGuessCounter = 0
    newState.gameState = null
console.log(newState.words)
    return newState
}