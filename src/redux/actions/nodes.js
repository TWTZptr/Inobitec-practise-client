const initState = {
    id: null,
    name: '',
    ip: '',
    port: 0
};

const nodesReducer = (state = initState, action) => {
    if (action.type === 'SELECT_ID') {
        return action.payload;
    } else {
        return state;
    }
}

export default nodesReducer;