import {configureStore} from '@reduxjs/toolkit';
import {uiReducer, nodesReducer} from './toolkitSlice';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        nodes: nodesReducer
    }
});

export default store;