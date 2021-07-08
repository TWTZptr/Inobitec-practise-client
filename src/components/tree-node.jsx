import React from 'react';
import Tree from 'react-animated-tree';
import { useDispatch } from 'react-redux';
import setSelectedNode  from '../redux/reducers/nodes';

function TreeNode({id, name, ip, port}) {
    const [children, setChildren] = React.useState([]);

    const dispatch = useDispatch();

    React.useEffect(() => {
        fetch(`http://localhost:3001/api/v1/${id}`).then(res => res.json())
            .then(nodes => {
                setChildren(nodes);
            });
    }, [id]);

    const onSelectNode = (event) => {
        dispatch(setSelectedNode({id, name, ip, port}));
    }

    return (
        children.length ?
            <Tree content={name} onClick={onSelectNode} canHide>
                {children.map(item => <TreeNode key={item.id} id={item.id} name={item.name} ip={item.ip}
                                                port={item.port}/>)}
            </Tree>
            :
            <Tree content={name} canHide onClick={onSelectNode}/>
    );
}

export default TreeNode;