import { createStore } from "redux";

import nodesReducer from "./actions/nodes";

const store = createStore(nodesReducer);

export default store;