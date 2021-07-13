const initState = {
    selectedNode: {
        id: null,
        name: '',
        ip: '',
        port: 0
    },
    nodes: []
};

const nodesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SELECT_NODE':
            return {
                ...state,
                selectedNode: action.payload
            };

        case 'ADD_NODE':
            return {
                ...state,
                nodes: [...state.nodes, action.payload]
            }

        case 'REMOVE_NODE':
            return {
                ...state,
                nodes: state.nodes.filter(item => item.id !== action.payload.nodeId)
            }

        default:
            return state;
    }

    /*if (action.type === 'UPDATE_NODE') {
        const indexOfNodeToUpdate = state.nodes.findIndex(item => item.id === action.payload.id);
        console.log(state.nodes);
        console.log(action.payload);
        const newArray = state.nodes;
        newArray[indexOfNodeToUpdate] = action.payload;
        return {
            ...state,
            nodes: newArray
        }
    }*/
}

export default nodesReducer;
