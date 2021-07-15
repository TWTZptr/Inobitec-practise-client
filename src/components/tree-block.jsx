import React from 'react';
import {fetchRootNode} from '../redux/actions/nodes';
import {useDispatch, useSelector} from 'react-redux';
import '../scss/tree-block.scss';
import RemoveAddButtonsBlock from "./buttons-block";
import TreeNode from './tree-node';

function TreeBlock() {
    const rootNode = useSelector(({nodes})=> nodes.find(item => item.parent_id === null));
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        if (!rootNode) {
            dispatch(fetchRootNode());
        }
    }, [rootNode, dispatch]);

    return (
        <div className="left-side-container">
            <div className="tree-container">
                {rootNode ? <TreeNode nodeInfo={rootNode} open/> : 'Loading...'}
            </div>
            <RemoveAddButtonsBlock/>
        </div>
    );
}

export default TreeBlock;
