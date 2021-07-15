import {combineReducers} from 'redux';

import nodes from './nodes';
import ui from './ui';

const rootReducer = combineReducers({
    nodes,
    ui
});

export default rootReducer;