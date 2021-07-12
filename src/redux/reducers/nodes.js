const initState = {
    selectedNode: {
        id: null,
        name: '',
        ip: '',
        port: 0,
        new: false
    },
    nodes: []
};

const nodesReducer = (state = initState, action) => {

    if (action.type === 'SELECT_NODE') {
        return {
            ...state,
            selectedNode: action.payload
        };
    }

    if (action.type === 'ADD_NODE') {
        return {
            ...state,
            nodes: [...state.nodes, action.payload]
        }
    }

    if (action.type === 'REMOVE_NODE') {
        return {
            ...state,
            nodes: state.nodes.filter(item => item.id !== action.payload.id)
        }
    }

    if (action.type === 'UPDATE_NODE') {
        const indexOfNodeToUpdate = state.nodes.findIndex(item => item.id === action.payload.id);
        console.log(state.nodes);
        console.log(action.payload);
        const newArray = state.nodes;
        newArray[indexOfNodeToUpdate] = action.payload;
        return {
            ...state,
            nodes: newArray
        }
    }
    return state;
}

export default nodesReducer;
