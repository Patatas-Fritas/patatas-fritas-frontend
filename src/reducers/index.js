import { combineReducers } from 'redux';
import {chuckNorrisApiReducer} from "./chuckNorrisApi.reducer";

const rootReducer = combineReducers({
    chuck: chuckNorrisApiReducer
});

export default rootReducer;