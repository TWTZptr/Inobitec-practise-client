import React from 'react';
import '../scss/remove-add-buttons-block.scss'
import Button from "./button";
import {fetchRemoveNode} from '../redux/actions/nodes';
import {useSelector, useDispatch} from 'react-redux';
import {setSelectedNode, setAddMode} from "../redux/actions/ui";

function RemoveAddButtonsBlock() {
    const selectedNode = useSelector(({ui}) => ui.selectedNode);
    const dispatch = useDispatch();

    const handleDelete = (event) => {
        if (selectedNode.parent_id !== null) {
            dispatch(fetchRemoveNode(selectedNode.id));
            dispatch(setSelectedNode({id:null}));
        }
    }

    const handleAdd = (event) => {
        if (selectedNode.id) {
            dispatch(setAddMode(true));
        }
    }

    return (
        <div className="remove-add-buttons-block">
            <Button onClick={handleAdd} buttonText="Добавить"/>
            <Button onClick={handleDelete} className={selectedNode.parent_id === null ? "inactive" : ""} buttonText="Удалить"/>
        </div>
    );
}

export default RemoveAddButtonsBlock;