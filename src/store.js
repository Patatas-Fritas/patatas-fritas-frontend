import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
    rootReducer, composeEnhancers(
        applyMiddleware(thunk),
        applyMiddleware(loggerMiddleware),
    ),
);
