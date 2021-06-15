import { hangmanConstant} from "../constants";
import {hangmanService} from "../services/hangman.service";

export const hangmanAction = {
    guessCharacter,
    initializeWordToGuess,
    nextWord
}

function initializeWordToGuess(gameId) {
    return async dispatch => {
        dispatch(request())

        try {
            const response = await hangmanService.initializeWordsToGuess(gameId)
            dispatch(success({words: response.texts}))
        } catch(error) {
            dispatch(failure({error: error.toString()}))
        }
    }

    function request(){return {type: hangmanConstant.HANGMAN_INITIALIZE_REQUEST}}
    function success(response) {return { type: hangmanConstant.HANGMAN_INITIALIZE_SUCCESS, payload: response}}
    function failure(error) {return { type: hangmanConstant.HANGMAN_INITIALIZE_FAILURE, payload: error}}
}

function guessCharacter(character) {
    return dispatch => {
        dispatch({type: hangmanConstant.GUESS_CHARACTER, payload: {character}})
    }
}

function nextWord() {
    return dispatch => {
        dispatch({type: hangmanConstant.HANGMAN_NEXT_WORD})
    }
}