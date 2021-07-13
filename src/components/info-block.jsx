import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {updateNode} from '../redux/actions/nodes';
import '../scss/info-block.scss';
import Button from './button';

function InfoBlock() {
    let {ip, name, id, port, parent_id} = useSelector(state => state.selectedNode);
    const [localState, setLocalState] = React.useState({ip, name, port});

    React.useEffect(() => {
        setLocalState({ip, name, port});
    }, [ip, name, port]);

    const dispatch = useDispatch();
    const cancelButtonHandler = (event) => {
        setLocalState({ip, name, port});
    };

    const applyButtonHandler = (event) => {
        const editedNode = {
            ...localState,
            id,
            parent_id
        };
        dispatch(updateNode(editedNode));
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
        id === null ?
            <div className="info-block">
            </div>
            :
            <div className="info-block">
                <div className="node-info">
                    <label className="node-info__field">
                        <div> Имя: </div>
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