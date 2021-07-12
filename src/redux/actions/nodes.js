export const setSelectedNode = (node) => ({
    type: 'SELECT_NODE',
    payload: node
});

export const addNode = (node) => ({
   type: 'ADD_NODE',
   payload: node
});

export const removeNode = (node) => ({
   type: 'REMOVE_NODE',
   payload: node
});

export const updateNode = (node) => ({
   type: 'UPDATE_NODE',
   payload: node
});
