import { combineReducers } from 'redux';
import {chuckNorrisApiReducer} from "./chuckNorrisApi.reducer";

import {loginReducer} from "./login.reducer";
import {hangmanReducer} from "./hangman.reducer";

const rootReducer = combineReducers({
    chuck: chuckNorrisApiReducer,
    login: loginReducer,
    hangman: hangmanReducer
});

export default rootReducer;