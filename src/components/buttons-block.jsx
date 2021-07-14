import React from 'react';
import '../scss/remove-add-buttons-block.scss'
import Button from "./button";
import {addNode, setSelectedNode, fetchRemoveNode, setAddMode} from '../redux/actions/nodes';
import {useSelector, useDispatch} from 'react-redux';

function RemoveAddButtonsBlock() {
    const nodeToDelete = useSelector(state => state.selectedNode);
    const dispatch = useDispatch();

    const handleDelete = (event) => {
        if (nodeToDelete.parent_id !== null) {
            dispatch(fetchRemoveNode(nodeToDelete.id));
            dispatch(setSelectedNode({id:null}));
        }
    }

    const handleAdd = (event) => {
        dispatch(setAddMode(true));
    }

    return (
        <div className="remove-add-buttons-block">
            <Button onClick={handleAdd} buttonText="Добавить"/>
            <Button onClick={handleDelete} buttonText="Удалить"/>
        </div>
    );
}

export default RemoveAddButtonsBlock;