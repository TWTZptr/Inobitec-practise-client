const initState = {
    selectedNode: {
        id: null,
        name: '',
        ip: '',
        port: 0
    },
    menuAddMode: false // info-block mode
};

const ui = (state = initState, action) => {
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
        default: 
            return state;
    }
}

export default ui;