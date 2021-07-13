import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import nodesReducer from "./reducers/nodes";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    nodesReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;