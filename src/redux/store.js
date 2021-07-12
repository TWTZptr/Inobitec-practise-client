import { createStore } from "redux";

import nodesReducer from "./reducers/nodes";

const store = createStore(nodesReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;