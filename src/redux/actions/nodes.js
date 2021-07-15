import Api from '../../api';

export const fetchRootNode = () => (dispatch) => {
    Api.getRootNode()
        .then(res => {
            dispatch(addNode(res));
        });
};

export const fetchChildNodes = (parentId) => (dispatch) => {
    Api.getChildren(parentId)
        .then(res => {
            res.forEach(item => dispatch(addNode(item)));
        });
}

export const fetchRemoveNode = (nodeId) => (dispatch) => {
    Api.removeNode(nodeId)
        .then(res => {
            if (res) {
                dispatch(removeNode(nodeId))
            }
        });
};

export const fetchUpdateNode = (node) => (dispatch) => {
    Api.updateNode(node)
        .then(res => {
            if (res) {
                dispatch(updateNode(node))
            }
        });
}

export const fetchAddNode = (node) => (dispatch) => {
    Api.createNode(node)
        .then(res => {
            if (res) {
                dispatch(addNode(res));
            }
        });
}

export const updateNode = (node) => ({
    type: 'UPDATE_NODE',
    payload: node
});

export const addNode = (node) => ({
    type: 'ADD_NODE',
    payload: node
});

export const removeNode = (nodeId) => ({
    type: 'REMOVE_NODE',
    payload: {nodeId}
});