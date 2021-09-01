import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {fetchUpdateNode, fetchAddNode} from '../redux/actions/nodes';
import {setAddMode, setSelectedNode} from '../redux/actions/ui';
import '../scss/info-block.scss';
import Button from './button';

const INPUT_INVALID_TIMEOUT = 2000;

function InfoBlock() {
    const selectedNode = useSelector(({ui}) => ui.selectedNode);
    const addMode = useSelector(({ui}) => ui.menuAddMode);
    const dispatch = useDispatch();
    const [showAddedMsg, setShowAddedMsg] = React.useState(false);
    const [showEditedMsg, setShowEditedMsg] = React.useState(false);
    
    const [localState, setLocalState] = React.useState({
        ip: selectedNode.ip,
        name: selectedNode.name,
        port: selectedNode.port
    });
    
    const [ipInvalidIndicator, setIpInvalidIndicator] = React.useState(false);
    const [portInvalidIndicator, setPortInvalidIndicator] = React.useState(false);
    const [nameInvalidIndicator, setNameInvalidIndicator] = React.useState(false);

    React.useEffect(() => {
        if (addMode) {
            setLocalState({ip: '', port: '', name: ''});
        } else {
            setLocalState({
                ip: selectedNode.ip,
                name: selectedNode.name,
                port: selectedNode.port
            });
        }
    }, [addMode, selectedNode.ip, selectedNode.name, selectedNode.port]);

    React.useEffect(() => {
        setLocalState({ip: selectedNode.ip, name: selectedNode.name, port: selectedNode.port});
    }, [selectedNode.ip, selectedNode.name, selectedNode.port]);
    
    const isValid = () => {
        let result = true;
        // ip valid check
        if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(localState.ip)) {
            setIpInvalidIndicator(true);
            setTimeout(() => setIpInvalidIndicator(false), INPUT_INVALID_TIMEOUT);
            result = false;
        }
        // port valid check
        if (+localState.port < 1 || +localState.port > 65535 || !Number.isInteger(+localState.port)) {
            setPortInvalidIndicator(true);
            setTimeout(() => setPortInvalidIndicator(false), INPUT_INVALID_TIMEOUT);
            result = false;
        }

        if (localState.name === '') {
            setNameInvalidIndicator(true);
            setTimeout(() => setNameInvalidIndicator(false), INPUT_INVALID_TIMEOUT);
            result = false;
        }
        
        return result;
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
                dispatch(setSelectedNode({id: null}));
                dispatch(setAddMode(false));
                setShowAddedMsg(true);
                setTimeout(() => setShowAddedMsg(false), 3000);
            } else {
                const editedNode = {
                    ...localState,
                    id: selectedNode.id,
                    parent_id: selectedNode.parent_id
                };
                dispatch(fetchUpdateNode(editedNode));
                setShowEditedMsg(true);
                setTimeout(() => setShowEditedMsg(false), 3000);
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
                {showAddedMsg ? (<span className="node-info__msg">Добавлено</span>) : ""}
            </div>
            :
            <div className="info-block">
                <div className="node-info">
                    <span className="node-info__mode">{addMode ? "Добавление" : "Редактирование"}</span>
                    <label className="node-info__field">
                        <div> Имя:</div>
                        <input value={localState.name} onChange={handleNameChange} className={nameInvalidIndicator ? "invalid-indicator" : ""}/>
                    </label>
                    <label className="node-info__field">
                        <div>IP:</div>
                        <input value={localState.ip} onChange={handleIpChange} className={ipInvalidIndicator ? "invalid-indicator" : ""}/>
                    </label>
                    <label className="node-info__field">
                        <div>Port:</div>
                        <input value={localState.port} onChange={handlePortChange} className={portInvalidIndicator ? "invalid-indicator" : ""}/>
                    </label>
                    {showEditedMsg ? (<span className="node-info__msg">Изменения сохранены</span>) : ""}
                </div>
                <div className="info-block__buttons">
                    <Button onClick={applyButtonHandler} buttonText="Применить"/>
                    <Button onClick={cancelButtonHandler} buttonText="Отмена"/>
                </div>
            </div>
    );
}

export default InfoBlock;