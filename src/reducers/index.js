import { combineReducers } from 'redux';
import {chuckNorrisApiReducer} from "./chuckNorrisApi.reducer";
import {hangmanReducer} from "./hangman.reducer";

const rootReducer = combineReducers({
    chuck: chuckNorrisApiReducer,
    hangman: hangmanReducer
});

export default rootReducer;