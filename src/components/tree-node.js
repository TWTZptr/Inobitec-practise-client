import React from 'react';
import '../scss/tree-node.scss';
import {fetchChildNodes} from '../redux/actions/nodes';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedNode, setAddMode} from "../redux/actions/ui";

function TreeNode ({nodeInfo, open}) {
    const [opened, setOpened] = React.useState(open);
    const dispatch = useDispatch();

    const isSelected = useSelector(({ui}) => ui.selectedNode.id) === nodeInfo.id;
    const children = useSelector(({nodes}) => {
        return nodes.filter(item => item.parent_id === nodeInfo.id);
    });
    
    React.useEffect(() => {
        if (children.length === 0) {
            dispatch(fetchChildNodes(nodeInfo.id));
        }
    }, [children.length, dispatch, nodeInfo.id]);

    const handleOpenClick = (e) => {
        setOpened(prev => !prev);
    }

    const handleSelectClick = (e) => {
        dispatch(setAddMode(false));
        dispatch(setSelectedNode(nodeInfo));
    }

    return (
        <ul className="tree-node">
            <li>{children.length ? <span onClick={handleOpenClick}>{opened ? "▼" : "▶"}</span> : <span>X</span>}  <span className={isSelected ? "selected" : ""} onClick={handleSelectClick}>{nodeInfo.name}</span></li>
            {opened ? children.map(item => <TreeNode key={item.id} nodeInfo={item}/>) : ''}
        </ul>
    );
}

export default TreeNode;