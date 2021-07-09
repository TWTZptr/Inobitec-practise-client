import { createStore } from "redux";

import nodesReducer from "./reducers/nodes";

const store = createStore(nodesReducer);

export default store;