const initState = [];

const nodes = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_NODE':
            return [...state, action.payload];

        case 'REMOVE_NODE':
            return state.filter(item => item.id !== action.payload.nodeId);

        case 'UPDATE_NODE':
            const indexOfNodeToUpdate = state.findIndex(item => item.id === action.payload.id);
            const newArray = state;
            newArray[indexOfNodeToUpdate] = action.payload;
            return newArray;

        default:
            return state;
    }
}

export default nodes;
