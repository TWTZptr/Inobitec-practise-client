import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../api';

export const updateNode = createAsyncThunk('nodes/update', async (node, thunkAPI) => {
    const response = await Api.updateNode(node);

    if (!response) {
        return thunkAPI.rejectWithValue(null);
    }
    return node;
});
export const addNode = createAsyncThunk('nodes/add', async (node, thunkAPI) => {
    const response = await Api.createNode(node);

    if (!response) {
        return thunkAPI.rejectWithValue(null);
    }
    return node;
});
export const removeNode = createAsyncThunk('nodes/remove', async (nodeId, thunkAPI) => {
    const response = await Api.removeNode(nodeId);

    if (!response) {
        return thunkAPI.rejectWithValue(null);
    }
    return nodeId;
});
export const fetchChildNodes = createAsyncThunk('nodes/childs', async (parentId, thunkAPI) => {
    const nodes = await Api.getChildren(parentId);
    return nodes;
});
export const fetchRootNode = createAsyncThunk('nodes/rootNode', async (thunkAPI) => {
    const rootNode = await Api.getRootNode();
    return rootNode;
});

const nodes = createSlice({
    name: 'nodes',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateNode.fulfilled, (state, {payload}) => {
                console.log(payload);
                const indexOfNodeToUpdate = state.findIndex(item => item.id === payload.id);
                console.log(state[indexOfNodeToUpdate]);
                state[indexOfNodeToUpdate] = payload;
                console.log(state[indexOfNodeToUpdate]);
            })
            .addCase(updateNode.rejected, (state, action) => {
                console.log('update reject');
            })
            .addCase(addNode.fulfilled, (state, {payload}) => {
                state.push(payload);
            })
            .addCase(addNode.rejected, (state, {payload}) => {
                console.log('add reject');
            })
            .addCase(removeNode.fulfilled, (state, {payload}) => {
                const indexToDelete = state.findIndex(item => item.id === payload);
                state.splice(indexToDelete, 1);
            })
            .addCase(removeNode.rejected, (state, {payload}) => {
                console.log('remove reject');
            })
            .addCase(fetchChildNodes.fulfilled, (state, {payload}) => {
                state.push(...payload);
            })
            .addCase(fetchRootNode.fulfilled, (state, {payload}) => {
                state.push(payload);
            })
    }
});

const ui = createSlice({
    name: 'ui',
    initialState: {
        selectedNode: {
            id: null,
            name: '',
            ip: '',
            port: 0,
            parent_id: null
        },
        menuAddMode: false // info-block mode
    },
    reducers: {
        setSelectedNode: (state, action) => {
            state.selectedNode.id = action.payload.id;
            state.selectedNode.port = action.payload.port;
            state.selectedNode.name = action.payload.name;
            state.selectedNode.ip = action.payload.ip;
            state.selectedNode.parent_id = action.payload.parent_id;
        },
        setAddMode: (state, action) => {
            state.menuAddMode = action.payload;
        },
        resetSelect: (state, action) => {
            state.selectedNode.id = '';
            state.selectedNode.port = '';
            state.selectedNode.name = '';
            state.selectedNode.ip = '';
            state.parent_id = null;
        }
    }
});

export const {setSelectedNode, setAddMode, resetSelect} = ui.actions;
export const uiReducer = ui.reducer;
export const nodesReducer = nodes.reducer;