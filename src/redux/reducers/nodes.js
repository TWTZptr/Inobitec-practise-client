const initState = {
    selectedNode: {
        id: null,
        name: '',
        ip: '',
        port: 0
    },
};

const nodesReducer = (state = initState, action) => {

    if (action.type === 'SELECT_NODE') {
        return {
            ...state,
            selectedNode: action.payload
        };
    }
    return state;
}

export default nodesReducer;