import React from 'react';
import '../scss/tree-node.scss';
import {useDispatch, useSelector} from 'react-redux';
import setSelectedNode from "../redux/actions/nodeSelect";

function TreeNode ({nodeInfo}) {
    const [opened, setOpened] = React.useState(false);
    const [children, setChildren] = React.useState([]);
    const [selected, setSelected] = React.useState(false);
    const dispatch = useDispatch();

    const selectedId = useSelector(state => state.selectedNode.id);

    React.useEffect(() => {
        fetch(`http://localhost:3001/api/v1/${nodeInfo.id}`)
            .then(res => res.json())
            .then(json => {
                setChildren(json);
            });
    }, []);

    const handleOpenClick = (e) => {
        setOpened(prev => !prev);
    }

    const handleSelectClick = (e) => {
        dispatch(setSelectedNode(nodeInfo));
    }

    return (
        <ul className="tree-node">
            <li>{children.length ? <span onClick={handleOpenClick}>▼</span> : <span>X</span>}  <span className={selectedId === nodeInfo.id ? "selected" : ""} onClick={handleSelectClick}>{nodeInfo.name}</span></li>
            {opened ? children.map(item => <TreeNode nodeInfo={item}/>) : ''}
        </ul>
    );
}

export default TreeNode;