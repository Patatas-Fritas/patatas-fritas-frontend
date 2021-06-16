import { combineReducers } from 'redux';
import {chuckNorrisApiReducer} from "./chuckNorrisApi.reducer";

import {loginReducer} from "./login.reducer";
import {hangmanReducer} from "./hangman.reducer";
import {exerciseReducer} from "./exercise.reducer";

const rootReducer = combineReducers({
    chuck: chuckNorrisApiReducer,
    login: loginReducer,
    hangman: hangmanReducer,
    exercise: exerciseReducer
});

export default rootReducer;
