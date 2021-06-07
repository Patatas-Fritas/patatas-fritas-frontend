import { loginConstant } from "../constants/login.constant";
import {loginService} from "../services/login.service";

export const loginAction = {
    login
}

function login(loginObj) {
    return async dispatch =>{
        dispatch(request())

        try {
            const response = await loginService.login(loginObj)
            dispatch(success({user: response}))
        } catch(error) {
            dispatch(failure({error: error.toString()}))
        }
    }

    function request() {return {type: loginConstant.LOGIN_REQUEST}}
    function success(response) {return {type: loginConstant.LOGIN_SUCCESS, payload: response}}
    function failure(error) {return { type: loginConstant.LOGIN_FAILURE, payload: error}}
}