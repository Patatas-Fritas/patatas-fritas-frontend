import { loginConstant } from "../constants/login.constant";

const initialState = {
    loading: false,
    user: {
        username: null,
        role: null,
        firstName: null,
        lastName:null,
        emailAddress: null,
    },
    error: '',
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginConstant.LOGIN_REQUEST:
            return {
                ...state,
                loading:true,
                error:null}
        case loginConstant.LOGIN_SUCCESS:
            return{
                ...state,
                user:action.payload.user,
                loading: false
            }
        case loginConstant.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        case loginConstant.LOG_OUT:
            return {
                ...state,
                user: null,
                error: null
            }
        default:
    }

    return state
}