import { chuckNorrisApiConstant } from '../constants';

const initialState = {
    loading: false,
    joke: {text: null, img: null},
    error: null
};

export const chuckNorrisApiReducer = (state = initialState, action) => {
    switch (action.type) {
        case chuckNorrisApiConstant.GETRANDOMJOKE_REQUEST:
            return {...state, loading: true, error: null}
        case chuckNorrisApiConstant.GETRANDOMJOKE_SUCCESS:
            return {...state, joke: action.payload.joke, loading: false}
        case chuckNorrisApiConstant.GETRANDOMJOKE_FAILURE:
            return {...state, error: action.payload.error, loading: false}
        default:
    }

    return state
}