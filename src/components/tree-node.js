import React from 'react';
import '../scss/tree-node.scss';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedNode, addNode} from "../redux/actions/nodes";

function TreeNode ({nodeInfo}) {
    const [opened, setOpened] = React.useState(false);
    const dispatch = useDispatch();

    const selectedId = useSelector(state => state.selectedNode.id);
    const children = useSelector(state=>state.nodes.filter(item => item.parent_id === nodeInfo.id));

    React.useEffect(() => {
        if (children.length === 0) {
            fetch(`http://localhost:3001/api/v1/${nodeInfo.id}`)
                .then(res => res.json())
                .then(json => {
                    json.forEach(item => dispatch(addNode(item)));
                });
        }
    }, []);

    const handleOpenClick = (e) => {
        setOpened(prev => !prev);
    }

    const handleSelectClick = (e) => {
        dispatch(setSelectedNode(nodeInfo));
    }

    return (
        <ul className="tree-node">
            <li>{children.length ? <span onClick={handleOpenClick}>{opened ? "▼" : "▶"}</span> : <span>X</span>}  <span className={selectedId === nodeInfo.id ? "selected" : ""} onClick={handleSelectClick}>{nodeInfo.name}</span></li>
            {opened ? children.map(item => <TreeNode key={item.id} nodeInfo={item}/>) : ''}
        </ul>
    );
}

export default TreeNode;