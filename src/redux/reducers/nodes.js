const initState = {
    selectedNode: {
        id: null,
        name: '',
        ip: '',
        port: 0
    },
    nodes: [],
    menuAddMode: false // info-block mode
};

const nodesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SELECT_NODE':
            return {
                ...state,
                selectedNode: action.payload
            };

        case 'CHANGE_MENU_MODE':
            return {
                ...state,
                menuAddMode: action.payload
            }

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

        case 'UPDATE_NODE':
            const indexOfNodeToUpdate = state.nodes.findIndex(item => item.id === action.payload.id);
            const newArray = state.nodes;
            newArray[indexOfNodeToUpdate] = action.payload;
            return {
                ...state,
                nodes: newArray
            }

        default:
            return state;
    }
}

export default nodesReducer;
