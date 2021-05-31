import { chuckNorrisApiConstant } from "../constants";
import { chuckNorrisApiService} from "../services";

export const chuckNorrisApiAction = {
    getRandomJoke
}

function getRandomJoke() {
    return async dispatch => {
        dispatch(request())

        try {
            const response = await chuckNorrisApiService.getRandomJoke()
            dispatch(success({joke : {text: response.value, img: response.icon_url}}))
        } catch(error) {
            dispatch(failure({error: error.toString()}))
        }
    }

    function request() {return {type: chuckNorrisApiConstant.GETRANDOMJOKE_REQUEST}}
    function success(response) {return { type: chuckNorrisApiConstant.GETRANDOMJOKE_SUCCESS, payload: response}}
    function failure(error) {return { type: chuckNorrisApiConstant.GETRANDOMJOKE_FAILURE, payload: error}}
}
