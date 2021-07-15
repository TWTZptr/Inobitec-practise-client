export const setSelectedNode = (node) => ({
    type: 'SELECT_NODE',
    payload: node
});

export const setAddMode = (mode) => {
    return {
        type: 'CHANGE_MENU_MODE',
        payload: mode
    }
}