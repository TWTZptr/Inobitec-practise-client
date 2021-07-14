export default class Api {
    static async getRootNode() {
        const res = await fetch('http://localhost:3001/api/v1/nodes');
        return await res.json();
    }

    static async getChildren(parentId) {
        const res = await fetch(`http://localhost:3001/api/v1/nodes/${parentId}/children`);
        return await res.json();
    }

    static async removeNode(nodeId) {
        console.log(nodeId);
        const res = await fetch(`http://localhost:3001/api/v1/nodes/${nodeId}`, {
            method: 'DELETE',
        });

        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    static async updateNode(node) {
        console.log(node);
        const res = await fetch(`http://localhost:3001/api/v1/nodes/${node.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(node)
        });

        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    static async createNode(node) {
        const formData = new FormData();
        formData.append(node);

        const res = await fetch('http://localhost:3001/api/v1/nodes', {
            method: 'POST',
            body: formData
        });

        if (res.status === 200) {
            return await res.json();
        } else {
            return null;
        }
    }
}