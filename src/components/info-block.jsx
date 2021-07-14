import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {fetchUpdateNode, fetchAddNode} from '../redux/actions/nodes';
import '../scss/info-block.scss';
import Button from './button';

function InfoBlock() {
    const selectedNode = useSelector(state => state.selectedNode);
    const addMode = useSelector(state => state.menuAddMode);
    const dispatch = useDispatch();

    const [localState, setLocalState] = React.useState({
        ip: selectedNode.ip,
        name: selectedNode.name,
        port: selectedNode.port
    });

    React.useEffect(() => {
        if (addMode) {
            setLocalState({ip: '', port: '', name: ''});
        }
    }, [addMode]);

    React.useEffect(() => {
        setLocalState({ip: selectedNode.ip, name: selectedNode.name, port: selectedNode.port});
    }, [selectedNode.ip, selectedNode.name, selectedNode.port]);

    const isValid = () => {
        if (+localState.port < 1 || +localState.port > 65535 || !Number.isInteger(+localState.port)) {
            return false;
        }

        if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(localState.ip)) {
            return false;
        }

        return true;
    }

    const cancelButtonHandler = (event) => {
        setLocalState({ip: selectedNode.ip, name: selectedNode.name, port: selectedNode.port});
    };

    const applyButtonHandler = (event) => {
        if (isValid()) {
            if (addMode) {
                const newNode = {
                    parent_id: selectedNode.id,
                    ...localState
                };
                dispatch(fetchAddNode(newNode));
            } else {
                const editedNode = {
                    ...localState,
                    id: selectedNode.id,
                    parent_id: selectedNode.parent_id
                };
                dispatch(fetchUpdateNode(editedNode));
            }
        }
    };

    const handleNameChange = (event) => {
        setLocalState((prevState) => {
            return {...prevState, name: event.target.value};
        });
    };

    const handleIpChange = (event) => {
        setLocalState((prevState) => {
            return {...prevState, ip: event.target.value};
        });
    }

    const handlePortChange = (event) => {
        setLocalState((prevState) => {
            return {...prevState, port: event.target.value};
        });
    }

    return (
        selectedNode.id === null ?
            <div className="info-block">
            </div>
            :
            <div className="info-block">
                <div className="node-info">
                    <label className="node-info__field">
                        <div> Имя:</div>
                        <input value={localState.name} onChange={handleNameChange}/>
                    </label>
                    <label className="node-info__field">
                        <div>IP:</div>
                        <input value={localState.ip} onChange={handleIpChange}/>
                    </label>
                    <label className="node-info__field">
                        <div>Port:</div>
                        <input value={localState.port} onChange={handlePortChange}/>
                    </label>
                </div>
                <div className="info-block__buttons">
                    <Button onClick={applyButtonHandler} buttonText="Применить"/>
                    <Button onClick={cancelButtonHandler} buttonText="Отмена"/>
                </div>
            </div>
    );
}

export default InfoBlock;