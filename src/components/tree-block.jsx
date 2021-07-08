import React from 'react';
import Tree from 'react-animated-tree';
import TreeNode from './tree-node.jsx';


function TreeBlock() {
    const [children, setChildren] = React.useState([]);
    const [self, setSelf] = React.useState('Loading');

    React.useEffect(() => {
        fetch('http://localhost:3001/api/v1')
            .then(res=>res.json())
            .then(json=> {
                setSelf(json);
                return fetch(`http://localhost:3001/api/v1/${json.id}`);
            })
            .then(res => res.json())
            .then(json => {
                setChildren(json);
            });

    }, []);

    return (
             <Tree content={self.name} open>
                {children.map(item => <TreeNode key={item.id} id={item.id} name={item.name} ip={item.ip}
                                                port={item.port}/>)}
            </Tree>
    );
}

export default TreeBlock;
