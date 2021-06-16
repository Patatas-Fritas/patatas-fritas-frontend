import { hangmanService } from "../services";
import { hangmanAdminConstant } from "../constants/hangman.admin.constant";

export const hangmanAction = {
    saveHangman
}

function saveHangman(hangmanObj) {
    return async dispatch => {
        dispatch(request())

        try {
            const response = await hangmanService.saveHangman(hangmanObj)
            dispatch(success())
        } catch (error) {
            dispatch(failure({ error: error.toString() }))
        }
    }

    function request() { return { type: hangmanAdminConstant.SAVE_HANGMAN_REQUEST } }
    function success() { return { type: hangmanAdminConstant.SAVE_HANGMAN_SUCCESS } }
    function failure(error) { return { type: hangmanAdminConstant.SAVE_HANGMAN_FAILURE, payload: error } }
}