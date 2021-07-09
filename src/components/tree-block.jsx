import React from 'react';
import Tree from '@naisutech/react-tree';
import { useDispatch } from 'react-redux';
import setSelectedNode from "../redux/actions/nodes";
import '../scss/tree-block.scss';


function TreeBlock() {
    const [treeData, setTreeData] = React.useState([]);
    const dispatch = useDispatch();

    const getChildData = async (parentId) => {
        let childNodes = await fetch(`http://localhost:3001/api/v1/${parentId}`);
        childNodes = await childNodes.json();
        childNodes = childNodes.map(item => {
            return {
                'parentId': parentId,
                'label': item.name,
                'id': item.id,
                'port': item.port,
                'ip': item.ip
            };
        });
        return childNodes;
    };

    const onSelect = (node) => {
        dispatch(setSelectedNode(node));
    }

    React.useEffect(() => {
        fetch('http://localhost:3001/api/v1')
            .then(res => res.json())
            .then(json => {
                const value = [{
                    'id': json.id,
                    'parentId': json.parent_id,
                    'ip': json.ip,
                    'port': json.port,
                    'label': json.name,
                    items: null
                }];
                setTreeData(value);
                return getChildData(json.id);
            }) // Потомки верхнего узла
            .then(items => {
                setTreeData(prevState => {
                    return [{
                        ...prevState[0],
                        items
                    }]
                });
            });
    }, []);

    return (
        <div className="tree-container">
            <Tree nodes={treeData} onSelect={onSelect} grow/>
        </div>
    );
}

export default TreeBlock;
