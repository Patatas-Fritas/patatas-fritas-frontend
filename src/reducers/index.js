import { combineReducers } from 'redux';
import {chuckNorrisApiReducer} from "./chuckNorrisApi.reducer";
import {loginReducer} from "./login.reducer";

const rootReducer = combineReducers({
    chuck: chuckNorrisApiReducer,
    login: loginReducer
});

export default rootReducer;