import React from 'react';
import '../scss/tree-block.scss';
import RemoveAddButtonsBlock from "./buttons-block";
import TreeNode from './tree-node';

function TreeBlock() {
    const [rootNode, setRootNode] = React.useState(null);

    React.useEffect(() => {
        fetch('http://localhost:3001/api/v1')
            .then(res => res.json())
            .then(json => {
                setRootNode(json);
            })
    }, []);

    return (
        <div className="tree-container">
            {rootNode ? <TreeNode nodeInfo={rootNode}/> : 'Loading...'}
            <RemoveAddButtonsBlock/>
        </div>
    );
}

export default TreeBlock;
